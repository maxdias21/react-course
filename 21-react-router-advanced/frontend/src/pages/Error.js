import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  let title = 'Ocorreu um erro';
  let message = 'Algo deu errado ao buscar os eventos, tente novamente mais tarde!';

  if(error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if(error.status === 404) {
    title = 'Não encontrado';
    message = 'A página solicitada não existe'
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
}

export default ErrorPage;