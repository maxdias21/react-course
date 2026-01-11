import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
// É um hook que retorna os dados da ação. Ou seja, quando um formulário é 
// submetido e o servidor retorna alguma resposta ou erro, esses dados podem 
// ser acessados com esse hook.
const data = useActionData();

// Útil para saber o estado atual da página, se está carregando, se já foi carregada...
const navigation = useNavigation();

// Hook do React Router usado para trabalhar com os parâmetros da URL.
// Ele retorna um objeto que permite acessar os query params da URL.
const [searchParams] = useSearchParams();

// Acessa o valor do parâmetro de consulta chamado 'mode' na URL.
// Exemplo de URL: https://www.exemplo.com?mode=login
// Se a URL tiver 'mode=login', searchParams.get('mode') retornará 'login'.
const isLogin = searchParams.get('mode') === 'login';

// verifica se o estado da navegação é "submitting", ou seja, se a navegação está 
// em andamento devido ao envio de um formulário
const isSubmitting = navigation.state === 'submitting';

return (
  <>
    <Form method="post" className={classes.form}>
      {data && data.errors && <ul>
          {Object.values(data.errors).map(err => <li key={err}>
            {err}
          </li>)}
        </ul>}
        {data && <p>{data.message}</p>}
      <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="image">Password</label>
        <input id="password" type="password" name="password" required />
      </p>
      <div className={classes.actions}>
        <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
          {isLogin ? 'Create new user' : 'Login'}
        </Link>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>
      </div>
    </Form>
  </>
  );
}

export default AuthForm;
