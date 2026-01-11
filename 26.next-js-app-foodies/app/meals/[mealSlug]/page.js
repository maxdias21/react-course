import Image from 'next/image';

import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

// Params já vem no nextJs
// Ele vai me passar uma chave (que no caso é a mealSlug) e o valor é o param da url
export default function MealDetailsPage({params}) {
  const meal = getMeal(params.mealSlug);

  // Verifica se a refeição (meal) não foi encontrada.
  // Se o método getMeal não retornar uma refeição válida (ou seja, for undefined ou null),
  // a função `notFound()` é chamada. 
  // Essa função do Next.js redireciona o usuário automaticamente para a página de erro
  // "not-found.js"
  if (!meal) {
    notFound();
  }

  if(!meal) {
    notFound();
  }

  // Expressão regular, todas as quebras de linhas serão substituídas pela tag br
  meal.instructions = meal.instructions.replace(/\n/g, '<br>')

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a></p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{
          __html: meal.instructions
        }}></p>
      </main>
    </>
  )
}