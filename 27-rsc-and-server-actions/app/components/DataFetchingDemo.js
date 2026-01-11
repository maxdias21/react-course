// Traz a API do Node que permite ler arquivos de forma assíncrona.
import fs from 'node:fs/promises';

export default async function DataFetchingDemo() {
    /*
     fs.readFile(...) lê o arquivo dummy-db.json'utf-8'
     'utf-8' significa que ele vai ser lido como texto
     data vira uma string com o conteúdo do arquivo
    */
    const data = await fs.readFile('dummy-db.json', 'utf-8');
    const users = JSON.parse(data);

    return (
        <div className="rsc">
            <h2>RSC with Data Fetching</h2>
            <p>
                Uses <strong>async / await</strong> for data fetching.
            </p>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.title})
                    </li>
                ))}
            </ul>
        </div>
    );
}