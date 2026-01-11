import MainNavigation from '../components/MainNavigation';

import { Outlet, useNavigation } from 'react-router-dom';

function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />

      <main>
        {/* Ler no app.js o funcionamento do useNavigation
          Tem 3 opções o state, sendo elas:
          idle = estado padrão, quando não há nenhuma nova navegação sendo realizada
          loading = Indica que há uma navegação em andamento
          submitting = quando um formulário está sendo enviado
          Uso: No estado "submitting", você pode desabilitar o botão de envio do formulário, 
          mostrar uma mensagem de progresso ou impedir outras interações até que a submissão seja concluída.
        */}
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout;