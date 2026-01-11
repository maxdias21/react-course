import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';

import { createNewEvent } from '../../util/http.js';

import ErrorBlock from '../UI/ErrorBlock.jsx';

import { queryClient } from '../../util/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  // O `useMutation` é um hook do React Query usado para realizar operações de modificação de dados no servidor.
  // Ele é geralmente utilizado para ações como criar, atualizar ou excluir recursos (diferente do `useQuery`, que é usado para buscar dados).
  // O `mutationFn` é a função que será chamada para executar a mutação (no caso, `createNewEvent`).
  // Essa função normalmente faz uma requisição HTTP assíncrona (por exemplo, uma requisição POST para criar um novo evento).
  // O React Query lida com o estado dessa operação (carregamento, erro, sucesso) e fornece funções e variáveis para gerenciar isso.

  // A função `mutate` é a função que você chama para **disparar a mutação**.
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,  // `createNewEvent` é a função que irá criar o novo evento no servidor

    // Se a requisição for bem sucedida, ele entra aqui
    // No caso, se for bem sucedida, eu vou redirecionar o usuário para um local x do meu site
    // É importante colocar aqui, pois se eu coloco esse código em outro lugar e a requisição falhar, eu não veria erro pois
    // ele redirecionaria o usuário para o lugar x do meu site (no caso, não quero esse comportamento)
    onSuccess: () => {
      navigate('/events');

      // Abaixo, estamos invalidando todas as queries relacionadas aos "events" para garantir que
      // o cache de eventos seja atualizado, mesmo que você esteja em outra página que também
      // utilize a mesma query. O refetch será acionado automaticamente para todos os componentes
      // que utilizam a query 'events', mantendo os dados atualizados.

      queryClient.invalidateQueries({
        queryKey: ['events'], // Chave da query que queremos invalidar. 'events' será a chave base.
        exact: false           // 'false' significa que qualquer query que tenha 'events' em seu nome
                              // (incluindo variações como ['events', { search: searchTerm }]) será invalidada.
                              // Se fosse 'true', ele invalidaria apenas a query exata ['events'] e não outras como ['events', { search: ... }].
      });
      // A ideia é que, ao adicionar um novo evento (ou qualquer outro dado), o cache de todas as queries
      // que dependem de 'events' seja apagado, forçando o React Query a fazer uma nova requisição (refetch)
      // para garantir que os dados mais recentes sejam exibidos nas páginas que fazem uso desses dados.
          }
        });

  function handleSubmit(formData) {
    mutate({event: formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
        )}
      </EventForm>
      {isError && <ErrorBlock title="Failed to create event" message={error.info?.message || 'Failed to create event, please check your inputs and try again later.'} />}
    </Modal>
  );
}
