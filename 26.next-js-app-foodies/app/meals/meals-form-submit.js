"use client";

import { useFormStatus } from "react-dom";

export default function MealsFormSubmit() {
  // O hook 'useFormStatus' é usado para acessar o status atual do formulário,
  // retornando informações sobre se o formulário está aguardando uma operação assíncrona.

  // A propriedade 'pending' indica se o formulário está em um estado de espera, 
  // normalmente quando há uma operação em andamento, como um envio assíncrono de dados.
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>{pending ? 'Submitting...' : 'Share Meal'}</button>
  )
}