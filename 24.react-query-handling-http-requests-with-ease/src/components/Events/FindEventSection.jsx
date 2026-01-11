import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import {fetchEvents} from '../../util/http';

import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';

import EventItem from './EventItem';

export default function FindEventSection() {
  // A `useRef` é usada para referenciar um elemento DOM no React sem causá-lo a ser renderizado novamente.
// Neste caso, `searchElement` será a referência ao campo de input onde o usuário digita o termo de pesquisa.
const searchElement = useRef();

// Aqui, o `useState` cria um estado chamado `searchTerm`, que armazena o termo de pesquisa digitado pelo usuário.
// O valor inicial de `searchTerm` é indefinido (não foi atribuído nenhum valor ainda).
const [searchTerm, setSearchTerm] = useState();

// `useQuery` é um hook do React Query utilizado para fazer requisições assíncronas.
// Ele recebe um objeto como argumento, onde:
// - `queryKey` é um identificador único para essa consulta. Aqui, estamos incluindo o termo de pesquisa (searchTerm)
//   para garantir que a consulta seja reexecutada sempre que o termo de pesquisa mudar.
// - `queryFn` é a função responsável por buscar os dados. No caso, estamos utilizando a função `fetchEvents`, 
//   que é chamada com o parâmetro `signal` (para permitir o cancelamento da requisição) e o `searchTerm` (termo de pesquisa).
const { data, isPending, isLoading, isError, error } = useQuery({
  queryKey: ['events', { search: searchTerm }], // `queryKey` com o termo de pesquisa.
  queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }), // Função que busca os eventos com o termo de pesquisa e o signal para cancelamento.

  // O parâmetro `enabled` controla se a requisição será realizada.
  // Se `enabled` for `false`, a requisição NÃO será feita.
  // Se `enabled` for `true`, a requisição SERÁ feita.
  //
  // Ao acessar a página pela primeira vez, o campo de pesquisa está vazio e `searchTerm` é `undefined`.
  // Isso fazia com que todos os dados fossem carregados de imediato, o que não é desejado.
  // Quando o campo de pesquisa está vazio, significa que queremos buscar "tudo" (sem filtro).
  // Porém, a requisição só deve ser disparada quando o usuário digitar algo no campo de pesquisa.
  // Portanto, se o `searchTerm` for `undefined`, a requisição não é habilitada. Quando o `searchTerm` muda
  // (ou seja, o usuário digita algo), a requisição é habilitada (enabled = true).
  enabled: searchTerm !== undefined
});

// Função chamada quando o formulário de busca é enviado (ao pressionar o "Enter" ou ao submeter o formulário).
// O evento `event.preventDefault()` impede o comportamento padrão do formulário (que seria recarregar a página).
// Dentro dessa função, estamos atualizando o estado `searchTerm` com o valor atual do campo de input,
// acessado através da referência `searchElement.current`.
function handleSubmit(event) {
  event.preventDefault(); // Impede o envio padrão do formulário.
  // Corrigido: devemos usar `searchElement.current.value` para acessar o valor digitado no campo de input.
  setSearchTerm(searchElement.current.value); // Atualiza o estado com o valor digitado no campo de busca.
}

// Variável `content` que inicialmente exibe uma mensagem pedindo para o usuário inserir um termo de pesquisa.
// Isso será mostrado até que os dados sejam carregados ou um erro ocorra.
let content = <p>Please enter a search term and to find events.</p>;

// Verificação do estado `isLoading`. Quando a requisição está em andamento (pendente),
// o componente exibe um indicador de carregamento, no caso o componente `LoadingIndicator`.
// Importante: o `content` precisa ser atualizado com o indicador de carregamento.
if (isLoading) {
  content = <LoadingIndicator />; // Exibe o indicador de carregamento enquanto a requisição está sendo feita.
}

// Verificação do estado `isError`. Se ocorrer algum erro na requisição,
// a variável `isError` será `true`. Nesse caso, é exibida uma mensagem de erro ao usuário,
// com a mensagem de erro contida em `error.info?.message`, se disponível, ou uma mensagem padrão.
if (isError) {
  content = <ErrorBlock title="An error occurred!" message={error.info?.message || 'Failed to fetch events.'} />;
}

// Se a requisição for bem-sucedida e os dados forem retornados (armazenados em `data`),
// exibimos uma lista de eventos. A variável `data` é um array de eventos, e para cada evento,
// criamos um item de lista (`<li>`) dentro de um `<ul>`.
if (data) {
  content = <ul className='events-list'>
    {data.map(event => <li key={event.id}><EventItem event={event} /></li>)} {/* Cada evento é representado por um componente `EventItem`. */}
  </ul>;
}

// O conteúdo final, que pode ser a mensagem de pesquisa, o indicador de carregamento, o erro ou a lista de eventos,
// será exibido na UI conforme o estado da requisição.



  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
