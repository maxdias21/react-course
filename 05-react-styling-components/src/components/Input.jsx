import Label from './Label';
import {styled} from 'styled-components';

const InputComponent = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${(props) => props.$invalid ? '#fed2d2' : '#d1d5db'};
  color: ${(props) => props.$invalid ? '#ef4444' : '#374151'};
  border: 1px solid ${(props) => props.$invalid ? '#f73f3f' : 'transparent' };
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export default function Input({handle, hasClass, type, label}) {
  return (
    <p>
        <Label>{label}</Label>
        <InputComponent
          type={type}
          // Condicional válida
          $invalid={hasClass}
          // Condicional inválida
          // Não pode passar valores booleanos (true/false), apenas como string ("false"/"true")
          // className={emailNotValid && 'invalid'}

          onChange={handle}
        />
      </p>
  )
}