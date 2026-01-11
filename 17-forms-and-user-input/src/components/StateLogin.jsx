import { useState } from "react";

// Uma vantagem é que temos bastante controle sobre os inputs, não precisamos manipular o dom caso façamos alguma modificação (como redefinir o valor)
// Uma desvantagem é que o código fica maior usando state do que refs, outra desvantagem é o input, que fica com bastante propriedades

export default function Login() {
  /*
  // Não é uma boa idéia criar um estado para criar funções individuais e nem estados individuais, pois quando menos
  // estados mais otimizado o seu código vai ficar
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEntetedPassword] = useState('');

   function handleEmailChange(event) {
    setEnteredEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setEntetedPassword(event.target.value)
  }
  */

  const [enteredValues, setEnteredValues] = useState({email: '',password: ''});
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });

  // Vai disparar sempre que o usuário pressionar uma tecla
  function handleInputChange(identifier, event) {
    // O identifier está entre parênteses pois é assim que atualiza um objeto de forma dinâmica em js
    setEnteredValues((prevValues) => ({
      ...prevValues, 
      [identifier]: event
    }));

    // Quando o usuário voltar a digitar no campo, remover o erro (se tiver)
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: false
    }))

  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  // Verificar se meu campo email tem um @, se tiver o @ não mostra erro
  // Só vai mostrar o erro quando o usuário perder o foco no input
  // O problema é que se o usuário voltar a digitar, quero que o erro suma até perder o input novamente, o que fiz na função handleInputChange
 const emailIsInvalid =   didEdit.email && !enteredValues.email.includes('@');

 // Vai pressionar quando o input perder o foco
 function handleInputBlur(identifier) {
  setDidEdit(prevEdit => ({
    ...prevEdit, 
    [identifier]: true
  }))
 }

  return (
    // Vou receber um submit de forma dinâmica
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          {/* Ao invés de for tem que ser htmlFor, pois como é um arquivo js, for o comando de repetição */}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" 
          name="email" 
          onChange={(event) => handleInputChange('email', event.target.value)}
          onBlur={() => handleInputBlur('email')}
          value={enteredValues.email} />
        <div className="control-error">{emailIsInvalid && <p>Please enter a valid email-address</p>}</div>
        </div>
        

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={(event) => handleInputChange('password', event.target.value)} value={enteredValues.password} />
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
