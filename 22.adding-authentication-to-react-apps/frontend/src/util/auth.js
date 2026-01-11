import { redirect } from "react-router-dom";

export function getTokenDuration() {
// Obtém a data de expiração armazenada no localStorage
// (O valor é recuperado como uma string)
const storedExpirationDate = localStorage.getItem('expiration');

// Converte a string recuperada em um objeto Date
// (Isso permite realizar operações com datas, como cálculos de tempo restante)
const expirationDate = new Date(storedExpirationDate);

// Cria um novo objeto Date representando o momento atual
const now = new Date();

// Calcula a diferença em milissegundos entre a data de expiração e a data atual
// (getTime() retorna o timestamp em milissegundos desde 1 de janeiro de 1970)
const duration = expirationDate.getTime() - now.getTime();


  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  // Chama a função para saber se meu token ainda tem duração
  const tokenDuration = getTokenDuration();

  // Se não tiver token, retorna null, não retornar undefined
  if(!token) {
    return null;
  }

  // Se não tiver duração, retorno EXPIRED
  // Ver o restante da lógica no arquivo pages/Root.js
  if(tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}


// Essa função é para usuários não entrarem em determinadas rotas do meu site
// O login funciona com token, se o usuário não tiver um token ele é redirecionado para uma outra página
export function checkAuthLoader() {
  const token = getAuthToken();

  if(!token) {
    return redirect('/auth');
  }
}