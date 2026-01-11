import { Link, useNavigate, useParams, redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent, queryClient, updateEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/* Esse código é uma alternativa do outro, o outro usa react router dom 
Para voltar a funcionar, copie/cole esse código no EditEvent.jsx e em App remove loader em App.jsx
*/

export default function EditEvent() {
  // Hook para navegação entre páginas
  const navigate = useNavigate();
  // Hook para pegar o ID do evento da URL
  const params = useParams();

  // Busca os dados do evento com base no ID da URL
  const {data, isError, error} = useQuery({
    queryKey: ['events', params.id], // Identificador único da consulta
    queryFn: ({signal}) => fetchEvent({signal, id: params.id}), // Função que busca os dados do evento
  });

  // Hook para atualizar os dados do evento
  const {mutate} = useMutation({
    mutationFn: updateEvent, // Função para atualizar o evento no backend

    // Antes de enviar a solicitação, atualiza o cache local
    onMutate: async (data) => {
      const newEvent = data.event; // Novo evento que será enviado

      // Cancela qualquer requisição em andamento para evitar conflitos
      await queryClient.cancelQueries(['events', params.id]);

      // Salva o evento atual no cache para ser usado caso algo dê errado
      const previusEvent = queryClient.getQueryData(['events', params.id]);

      // Atualiza o cache local com os novos dados
      queryClient.setQueryData(['events', params.id], newEvent);

      // Retorna os dados anteriores para serem usados no onError
      return {previusEvent};
    },

    // Caso ocorra um erro, restaura os dados anteriores no cache
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', params.id], context.previusEvent);
    },

    // Após a solicitação ser concluída (com sucesso ou erro), invalida a consulta para garantir que o cache seja atualizado
    onSettled: () => {
      queryClient.invalidateQueries(['events', params.id]);
    }
  });

  // Função chamada ao enviar o formulário de edição
  function handleSubmit(formData) {
    // Chama a mutação para atualizar o evento
    mutate({id: params.id, event: formData});
    
    // Volta para a página anterior
    navigate('../');
  }

  // Função chamada ao fechar o modal
  function handleClose() {
    navigate('../');
  }

  let content; // Variável que armazena o conteúdo da página/modal

  // Mostra um erro se algo der errado na busca dos dados
  if (isError) {
    content = <>
      <ErrorBlock 
        title="Failed to load event" 
        message={error.info?.message || "Failed to load event, please check your inputs and try again later."} 
      />
      <div className='form-actions'>
        <Link to="../" className='button'>Okay</Link> {/* Link para voltar */}
      </div>
    </>
  }

  // Mostra o formulário de edição se os dados forem carregados com sucesso
  if (data) {
    content = <EventForm inputData={data} onSubmit={handleSubmit}>
      <Link to="../" className="button-text">
        Cancel
      </Link> {/* Botão para cancelar */}
      <button type="submit" className="button">
        Update
      </button> {/* Botão para atualizar */}
    </EventForm>
  }

  // Retorna o modal com o conteúdo apropriado (carregando, erro ou formulário)
  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
