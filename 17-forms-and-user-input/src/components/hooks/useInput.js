import { useState } from "react";

export default function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

   // Vai pressionar quando o input perder o foco
 function handleInputBlur() {
  setDidEdit(true);
 }

 // Vai disparar sempre que o usuário pressionar uma tecla
 function handleInputChange(event) {
    // O identifier está entre parênteses pois é assim que atualiza um objeto de forma dinâmica em js
    setEnteredValue(event.target.value);

    // Quando o usuário voltar a digitar no campo, remover o erro (se tiver)
    setDidEdit(false);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid
  }
}