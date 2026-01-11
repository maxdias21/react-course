import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
  // Eu retornei uma promise (olhar App.js), porém esse hook resolve qualquer promise para mim
  const data = useLoaderData();

  // Aqui estou usando o que retornei de response na função loader (abaixo dessa)
  // Só vai entrar caso aconteça algum erro
  if(data.isError) {
    return <p>{data.message}</p>
  }

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading</p>}>
      {/* Aqui estamos aguardando a requisição dos dados, enquanto ele carrega, ele vai usar na tela o <Suspense /> */}
      <Await resolve={data.events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  )
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events')

  // A DIFERENÇA DOS DOIS ABAIXO É QUE UM (O THROW) VAI CARREGAR UM NOVO COMPONENTE (DE ERRO)
  // O OUTRO, POSSO USAR EM FUNÇÕES E TER MAIS ACESSO A PERSONALIZAR, NO CASO, ESSE RETURN PASSA PARA A FUNÇÃO ACIMA (EventsPage)
  // LÁ EU RECEBO OS OBJETOS QUE ESTOU RETORNANDO (UM RESPONSE() NO CASO.

  // Tenho que retornar um Response, pode ser um objeto com o Response()
  if (!response.ok) {
    /* return {
      isError: true, message: 'Não pode encontrar os eventos!'
    } */

    
    // Usando com throw, ele vai buscar o elemento de erro mais próximo
    // No caso, esse daqui está definido no arquivo App.js, na rota vai ter algo como errorElement
    // eslint-disable-next-line no-throw-literal
    // throw {message:'Não pode encontrar os eventos'}

    // Posso usar um throw usando um response pois existe um hook que pega (useRouteError) que permite eu obter as informações de um
    // throw em um componente React
    // Esse hook usei em Error.js
    /*
    throw new Response(JSON.stringify({message: 'Não pode encontrar os eventos, erro na rota ou servidor indisponível'}), 
    {status: 500} */

    // Ao invés de usar do modo acima *throw new Response*, posso usar json (de react router dom)
    return json({message: 'Não pode encontrar os eventos, erro na rota ou servidor indisponível'}, {status: 500});
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

// Aqui eu crio uma função para o loader executar, posso colocar isso dentro do loader (em App.js) criando uma função anônima, 
// mas assim, fica mais fácil de ler
export function loader() {

  // Isso serve para mostrar algo na tela enquanto busca dados ou faz alguma solicitação que demora
  // Por exemplo, faço uma solicitação para uma url e está buscando dados, ao invés de mostrar uma tela branca enquanto busca os dados
  // eu posso colocar algo como "carregando"

  // Isso basicamente serve para mostrar alguns dados enquanto carregamos outros dados
  // Por exemplo, posso mostrar o cabeçalho/footer enquanto faço a requisição no bd para carregar "posts"

  // Aqui eu passo um objeto com uma chave e uma função que faz uma solicitação http para buscar alguns dados
  // daqui vamos para a função acima EventsPage
  return defer({
    events: loadEvents()
  })
}