// Importação da biblioteca 'better-sqlite3' para trabalhar com banco de dados SQLite.
import sql from 'better-sqlite3';
// Importação da biblioteca 'slugify' para criar slugs a partir de strings (normalmente, títulos).
import slugify from 'slugify';
// Importação da biblioteca 'xss' para sanitizar e prevenir ataques XSS em strings de texto.
import xss from 'xss';

// Importação da biblioteca 'fs' (File System) para manipular arquivos no sistema de arquivos.
import fs from 'node:fs';

// Criação de uma instância do banco de dados SQLite 'meals.db' usando a biblioteca 'better-sqlite3'.
const db = sql('meals.db');

// Função assíncrona para obter as refeições do banco de dados, demonstrando o uso de async/await no Next.js.
export async function getMeals() {
  // Simula um atraso de 2 segundos para testar a funcionalidade.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Comentado para simular um erro e testar a página de erro em app/meals/error.js.
  // throw new Error('Loading meals failed...')
  
  // Retorna todas as refeições da tabela 'MEALS' usando o método .prepare() para preparar a consulta SQL.
  return db.prepare('SELECT * FROM MEALS').all();
}

// Função para buscar uma refeição específica pelo 'slug' (identificador único derivado do título).
export function getMeal(slug) {
  // Retorna a refeição com base no 'slug' fornecido, usando um comando SQL preparado.
  return db.prepare('SELECT * FROM meals WHERE slug=?').get(slug);
}

// Função assíncrona para salvar uma nova refeição no banco de dados, incluindo o upload da imagem associada.
export async function saveMeal(meal) {
  // Cria o 'slug' a partir do título da refeição, convertendo para minúsculas e removendo caracteres especiais.
  meal.slug = slugify(meal.title, {lower: true});
  
  // Sanitiza o conteúdo das instruções da refeição para evitar vulnerabilidades de XSS.
  meal.instructions = xss(meal.instructions);

  // Obtém a extensão do arquivo da imagem a partir do nome do arquivo.
  const extension = meal.image.name.split('.').pop(); 

  // Cria o nome do arquivo da imagem a partir do 'slug' da refeição e a extensão do arquivo.
  const fileName = `${meal.slug}.${extension}`;

  // Cria um stream de escrita para salvar a imagem no diretório 'public/images'.
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  
  // Converte a imagem (buffer) recebida do front-end em um formato que pode ser gravado no arquivo.
  const bufferedImage = await meal.image.arrayBuffer();

  // Escreve a imagem no arquivo e trata erros durante o processo de escrita.
  stream.write(Buffer.from(bufferedImage), (error) => {
    if(error) {
      // Lança um erro caso a escrita da imagem falhe.
      throw new Error('Save image failed!');
    }
  });

  // Atualiza o caminho da imagem no objeto 'meal' para refletir onde foi armazenada.
  meal.image = `/images/${fileName}`;

  // Insere a refeição no banco de dados com os dados fornecidos no objeto 'meal'.
  db.prepare(`
    INSERT INTO meals 
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES(
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
    )
  `).run(meal);
}
