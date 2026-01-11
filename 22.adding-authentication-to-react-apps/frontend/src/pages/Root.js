import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();

  // Usando o loader do path: '/',
  const token = useLoaderData();

  // Posso chamar um formulário do meu site
  // Nesse caso, eu estou chamando a rota logout (lá em baixo eu chamo ela, no submit())
  const submit = useSubmit();

  useEffect(() => {

    if(!token) {
      return;
    }

    if(token === 'EXPIRED') {
      submit(null, {action: '/logout'});
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);


    setTimeout(() => {
      submit(null, {action: '/logout'});
    }, tokenDuration);

  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
