import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@tanstack/react-query';

import Header from '../Header.jsx';
import { fetchEvent, deleteEvent, queryClient} from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  // Usado para pegar um parâmetro da URL
  // path: 'events/:id' o id que vier do navegador é usado aqui no useParams
  const params = useParams();

  // Hook para buscar os dados do evento com base no id
  // queryFn: Função que faz a busca dos dados; recebe 'signal' para controle de cancelamento.
  // queryKey: Identificador único para armazenar/cachear os dados no React Query.
  const {data, isPending, isError, error } = useQuery({
    queryFn: ({signal}) => fetchEvent({signal, id: params.id}),
    queryKey: ['events', params.id ]
  });

  const navigate = useNavigate();

  // Hook para deletar o evento usando o React Query
  const {mutate, isPending: isPendingDelete, isError: isErrorDeleting, error: deleteError} = useMutation({
    mutationFn: deleteEvent, // Função que deleta o evento
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'], // Invalida a lista geral de eventos para garantir que ela seja atualizada

        // Quando eu apago um evento, ele tenta buscar os dados de 'events', e depois navega para a home
        // Porém ele vai tentar pegar os detalhes do evento que eu apaguei que não existe mais, gerando um erro 404
        // none = A consulta vai virar obsoleta, e só vai ser buscada quando for acessada manualmente ou de forma automática
        refetchType: 'none' 
      });
      navigate('/'); // Redireciona para a página inicial após deletar o evento
    }
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  // Função chamada quando o botão de deletar é clicado
  function handleDelete() {
    mutate({id: params.id}); // Passa o id do evento para a função de deleção
  }

  let content;

  // Enquanto os dados estão sendo buscados, exibe um estado de carregamento
  if(isPending) {
    content = <div id='events-details-content' className="center">
      <p>Fetching event data...</p>
    </div>
  }

  // Se ocorrer um erro na busca dos dados, exibe uma mensagem de erro personalizada
  if(isError) {
    content = <div id='events-details-content' className="center">
    <ErrorBlock title="Failed to load event" message={error.info?.message || 'Failed to fetch event data, please try again later'} />
  </div>
  }

  // Se os dados do evento foram carregados com sucesso, exibe os detalhes do evento
  if(data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    content = 
    <>
      <header>
        <h1>{data.title}</h1>
        <nav>
          {/* Botão para deletar o evento */}
          <button onClick={handleStartDelete}>Delete</button>
          {/* Link para editar o evento */}
          <Link to="edit">Edit</Link>
        </nav>
      </header>
      <div id="event-details-content">
        {/* Exibe a imagem do evento */}
        <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
        <div id="event-details-info">
          <div>
            {/* Localização e data do evento */}
            <p id="event-details-location">{data.location}</p>
            <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate}</time>
          </div>
          {/* Descrição do evento */}
          <p id="event-details-description">{data.description}</p>
        </div>
      </div>
    </>
  }

  return (
    <>
    {isDeleting && <Modal onClose={handleStopDelete}>
      <h2>Are you sure?</h2>
      <p>Do you really want to delete this event? This action cannon be undone.</p>
      <div className="form-actions">
        {isPending && <p>Deleting, please wait...</p>}
        {!isPending && (
          <>
            <button onClick={handleStopDelete} className='button-text'>Cancel</button>
            <button onClick={handleDelete} className='button'>Delete</button>
          </>
        )}

        {isErrorDeleting && <ErrorBlock title="Failed to delete event" message={deleteError.info?.message || 'Failed to delete event, please try again later.'}/>}
      </div>
    </Modal>}
      {/* Outlet para renderizar componentes aninhados (rota filha) */}
      <Outlet />
      <Header>
        {/* Link para visualizar todos os eventos */}
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {/* Renderiza o conteúdo baseado no estado atual (carregando, erro ou sucesso) */}
        {content}
      </article>
    </>
  );
}
