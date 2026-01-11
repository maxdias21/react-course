import { useRef, useState } from "react";

// Uma vantagem é que não precisamos usar tantas funções e muitas informações nos inputs como no useState
// Desvantagem é que temos que criar várias referências, dependendo do formulário, podem ser muitas

// Nesse exemplo, eu só mostro o erro quando o usuário clicar no botão de submit/enviar
// Não faço de forma dinâmica

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailIsValid = enteredEmail.includes('@');

    if(!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    // Uma desvantagem é que para redefinir eu teria que manipular o dom, fazendo assim
    // email.current.value = ''
    // React sempre deve manipular o DOM

    // Resetar os valores (clicando no valor reset)
    // email.current.value = '' Não recomendado pois estou manipulando o dom
    // event.target.reset() é a mesma coisa de definir um button type="reset"
  }

 

  return (
    // Vou receber um submit de forma dinâmica
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          {/* Ao invés de for tem que ser htmlFor, pois como é um arquivo js, for o comando de repetição */}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid email.</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        {/* O padrão é type="submit", isso faz com que ele envie uma solicitação e recarregue a página, porém eu perco
          os dados, mesmo salvando no useState, posso fazer com que type="button" o que faz com que a página não recarregue
          mas vou usar outro modelo.
          Quando eu clicar no botão, ele vai chamar o método onSubmit, lá eu faço algumas alterações (tem que ser type="submit")
        */}
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
