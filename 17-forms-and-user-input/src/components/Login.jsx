import { useRef } from "react";

// Uma vantagem é que temos bastante controle sobre os inputs, não precisamos manipular o dom caso façamos alguma modificação (como redefinir o valor)
// Uma desvantagem é que o código fica maior usando state do que refs, outra desvantagem é o input, que fica com bastante propriedades

export default function Login() {
  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Vou receber um submit de forma dinâmica */} 
      
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          {/* Ao invés de for tem que ser htmlFor, pois como é um arquivo js, for o comando de repetição */}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" 
          name="email" 
          ref={email} />
        </div>
      </div>
        
      <div>
        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" 
          type="password" 
          name="password"
          ref={password}
          />
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

