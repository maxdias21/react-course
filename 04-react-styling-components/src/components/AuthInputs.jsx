import { useState } from 'react';
import {styled} from 'styled-components';
import Button from './Button';
import CustomInput from './Input';
import Input from './Input';


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
    <div id="auth-inputs" className="w-full mx-auto max-w-sm p-8 rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800">
      <div className="flex flex-col gap-2 mb-6" style{{'width: 700px'}}>
          <Input 
          invalid={emailNotValid ? "invalid" : undefined}
          label="Email"
          type="email"
          // style={{backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db"}}

          // Não recomendado
          // className={emailNotValid && "red"}

          // className={emailNotValid ? 'invalid' : undefined}
          onChange={(event) => handleInputChange('email', event.target.value)}
          // className={`label ${passwordNotValid ? 'invalid' : undefined}`}
          />
          <Input
          label="Password"
          invalid={passwordNotValid ? "invalid" : undefined}
            type="password"
            // className={`label ${passwordNotValid ? 'invalid' : undefined}`}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" className="text-amber-400 hover:text-amber-500">
          Create a new account
        </button>
        <Button className='button' onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
