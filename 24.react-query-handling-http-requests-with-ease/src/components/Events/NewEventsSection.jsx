import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  
  // data contém os dados que recebemos da API após uma solicitação bem-sucedida.
  // isPending indica se a solicitação está em andamento (retorna true enquanto a requisição não foi concluída).
  // isError retorna true se ocorreu um erro durante a solicitação (é ativado quando há um erro, como um throw Error).
  // error contém os detalhes do erro lançado (como a mensagem ou o tipo do erro).
  const {data, isPending, isError, error} = useQuery({
    // queryFn é a função responsável por buscar os dados da API.
    // queryKey é um identificador único para a query. É usado para gerenciar o cache e evitar chamadas desnecessárias à API.
    // Os dados são armazenados em cache e associados ao valor da queryKey (no seu caso, a queryKey é ['events'] neste momento).
    queryKey: ['events', {max:3}],

    // React query pode passar algumas informações para a minha função
    // Posso ver isso usando console.log na função abaixo (que está em util/http.js)
    // Uma delas é a signal, que posso usar para abortar uma solicitação
    queryFn:({signal, queryKey}) => fetchEvents({signal,...queryKey[1]}),

    // Funciona assim: se eu for pra home -> login -> home, imagina que home é um site de notícias e tem 10 notícias.
    // Eu indo pra home -> login -> home com o stale 0, significa que sempre que eu sair da home e voltar, ele faz uma requisição para buscar
    // alteração nos dados, se o stale for 10 minutos, e eu ir de home -> login -> home em 2 minutos, ele não faz uma nova requisição.
    staleTime: 5000,

    // O padrão é 5 minutos
    // Funciona assim: é o tempo em que os dados ficam disponíveis em cache, ou seja, a cada 5 minutos ele remove os dados do cache
    // Pode ficar incompatível com o staleTime, imagina que o stale faz uma nova requisição a cada 5 minutos e o gcTime limpa o cache a cada
    // 3 minutos, quando o gcTime apaga o cache, o stale faz uma nova requisição pois sem cache ele não reaproveita nada.
    // gcTime: 30000
  })


  let content;

  // Enquanto a solicitação não for concluída, eu mostro esse componente de Loading
  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (error) {
    content = (
      // O ? serve para buscar uma propriedade chamada message em info
      // Eu uso isso pois caso a propriedade message não existe ele retorna undefined (se eu usar o ?)
      // Com undefined, eu posso pegar o que vem depois do ||
      // Se eu não uso o ?, ele me lança um erro e quebra meu código
      <ErrorBlock title="An error occurred" message={error.info?.message || "Failed to fetch events"} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
