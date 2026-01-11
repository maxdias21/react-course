'use client';

export default function Error({error}) {
   // Verifique se há uma mensagem de erro ou um erro genérico
  const errorMessage = error?.message || 'An unknown error occurred.';

  return (
    <main className="error">
      <h1>An error ocurred!</h1>
      <p>{errorMessage}</p>
    </main>
  )
}