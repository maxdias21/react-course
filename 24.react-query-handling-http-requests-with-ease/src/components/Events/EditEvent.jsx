import { Link, useNavigate, useParams, redirect, useSubmit, useNavigation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';


export default function EditEvent() {
  // Hook para navegação entre páginas
  const navigate = useNavigate();

  const submit = useSubmit();

  const {state} = useNavigation();

  // Hook para pegar o ID do evento da URL
  const params = useParams();

  // Busca os dados do evento com base no ID da URL
  const {data, isError, error} = useQuery({
    queryKey: ['events', params.id], // Identificador único da consulta
    queryFn: ({signal}) => fetchEvent({signal, id: params.id}), // Função que busca os dados do evento
    staleTime: 10000
  });

  // Função chamada ao enviar o formulário de edição
  function handleSubmit(formData) {
    submit(formData, {method: 'PUT'});
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
      {state==='submitting' ? <p>Sending data...</p> : (
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link> {/* Botão para cancelar */}
          <button type="submit" className="button">
            Update
          </button> {/* Botão para atualizar */}
        </>
      )}
      
    </EventForm>
  }

  // Retorna o modal com o conteúdo apropriado (carregando, erro ou formulário)
  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}


export function loader({params}) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => fetchEvent({signal, id: params.id})
  });
}

export async function action({request, params}) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  updateEvent({id: params.id, event: updatedEventData});

  await queryClient.invalidateQueries(['events']);

  return redirect('../');
}