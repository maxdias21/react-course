import {json, useRouteLoaderData, redirect, defer, Await} from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventList from '../components/EventsList';
import { Suspense } from 'react';

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events')
  if (!response.ok) {
    return json({message: 'Não pode encontrar os eventos, erro na rota ou servidor indisponível'}, {status: 500});
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);
  if(!response.ok) {
    throw json({message: 'Não foi possível processar a sua solicitação, tente novamente mais tarde!'}, {status: 500});
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

function EventDetailPage() {
  const {event, events} = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Carregando...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent}/>}
        </Await>
      </Suspense>
     
      <Suspense fallback={<p style={{textAlign: 'center'}}>Carregando...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventList events={loadedEvents}/>}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetailPage;

export async function loader({request, params}) {
  // Estou pegando o param que recebo da URL (posso ver em App.js)
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents()
  })
}

export async function action({params, request}) {
  const eventId = params.eventId;

  // Em method, eu posso colocar DELETE ou reques.method, esse último o react router extrai o método de forma automática
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method
  });

  if(!response.ok) {
    throw json({message: 'Não foi possível processar a sua solicitação, tente novamente mais tarde!'}, {status: 500});
  } 

  return redirect('/events');
}