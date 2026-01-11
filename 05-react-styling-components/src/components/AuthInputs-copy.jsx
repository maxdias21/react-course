import { useState } from 'react';
import {styled} from 'styled-components';

const Div = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background: linear-gradient(180deg, #474232 0%, #28271c 100%);
  color: white;
`

// Componentes
import Input from './Input'
import Button from './Button';

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <Div>
      {/* Aplicando estilos individuais */}
      {/* <p style={{"fontSize":"100px", "backgroundColor":"green"}}>Olá</p> */}

      <div className="controls">
        <Input handle={(event) => handleInputChange('email', event.target.value)} hasClass={emailNotValid ? 'invalid' : undefined} type="email" label="Email" />
        <Input handle={() => handleInputChange('password', event.target.value)} hasClass={passwordNotValid ? 'invalid' : undefined} type="password" label='Password' />
      </div>
      <div className="actions">
        <Button type="button" className="text-button">
          Create a new account
        </Button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </Div>
  );
}
