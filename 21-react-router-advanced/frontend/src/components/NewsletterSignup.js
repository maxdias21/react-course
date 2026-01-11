import classes from './NewsletterSignup.module.css';

import {useFetcher, Form} from 'react-router-dom';

function NewsletterSignup() {
  // Vai buscar dados de um form e não vai criar uma rota nova (não vai mudar a url)
  const fetcher = useFetcher();

  // Pegar os dados
  // Posso pegar o state para saber se a página está em transição, ou não
  const {data} = fetcher;

  return (
    <fetcher.Form form method="post" className={classes.newsletter} action='/newsletter'>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;