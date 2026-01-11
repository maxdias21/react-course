import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  // Cria um objeto URL a partir da URL da requisição e obtém os parâmetros de consulta
  const searchParams = new URL(request.url).searchParams;
  
  // Obtém o valor do parâmetro 'mode' da URL, se não existir, define como 'login'
  const mode = searchParams.get('mode') || 'login';

  // Verifica se o valor de 'mode' não é 'login' nem 'signup'
  // Se não for, lança um erro com status 422 (Unprocessable Entity)
  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  // Obtém os dados do formulário enviado na requisição
  const data = await request.formData();
  
  // Prepara os dados de autenticação a serem enviados para o backend
  const authData = {
    email: data.get('email'),   // Obtém o valor do campo 'email' do formulário
    password: data.get('password'), // Obtém o valor do campo 'password' do formulário
  };

  // Envia os dados de autenticação para o backend usando uma requisição POST
  // A URL será 'http://localhost:8080/login' ou 'http://localhost:8080/signup' dependendo do 'mode'
  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Define o cabeçalho como JSON
    },
    body: JSON.stringify(authData), // Converte os dados de autenticação para o formato JSON
  });

  console.log(response)

  // Verifica se o status da resposta é 422 ou 401, que indicam erro de autenticação
  // Nesse caso, retorna a resposta do backend diretamente
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  // Envia a requisição e aguarda a resposta assíncrona
  // Converte a resposta da requisição (response) para JSON usando o método .json()
  // O método .json() retorna uma Promise que resolve com os dados da resposta em formato JSON
  // A variável resData agora contém os dados retornados pelo servidor, já convertidos em um objeto JavaScript
  const resData = await response.json();
  

  // Extrai o valor da chave "token" do objeto resData
  // Agora a variável 'token' contém o valor do token que foi retornado pelo servidor
  // O token geralmente é usado para autenticação e deve ser armazenado ou enviado em requisições subsequentes
  const token = resData.token;

  // Cria um array com chave token e o token da autenticação
  localStorage.setItem('token', token)

  // Lógica para apagar o token depois de X horas
  const expiration = new Date();

  // Crio uma data no futuro, a data atual + um inteiro que significa 1 hora inteira
  // No caso, se for 10, vai ser a data de agora + 10 horas no futuro
  // O restante da lógica está em auth.js
  expiration.setHours(expiration.getHours() + 1);

  // Converto a hora em uma string no formato YYYY-MM-DDTHH:mm:ss.sssZ
  localStorage.setItem('expiration', expiration.toISOString())

  // Se a autenticação for bem-sucedida, redireciona o usuário para a página inicial
  return redirect('/');
}
 