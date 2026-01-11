import classes from './EventItem.module.css';
import { Link, useSubmit } from 'react-router-dom';

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Você tem certeza?');

    if(proceed) {
      // O primeiro argumento é os dados que vem do formulário, no caso, não quero dado nenhum, pois não estou usando um Form nesse caso
      // Posso definir uma action depois de method, igual no django, uma action para fazer uma verificação nas "views"

      // Esse hook, chama a action em App.js
      submit(null, {method: 'delete'});
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
