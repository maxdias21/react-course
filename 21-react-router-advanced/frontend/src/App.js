// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import HomePage from './pages/HomePage';
import EventsPage, {loader as eventsLoader} from './pages/EventsPage';
import EventDetailPage, {loader as eventsDetailLoader, action as deleteEventAction} from './pages/EventDetailPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import ErrorPage from './pages/Error';
import {action as manipulateEventAction} from './components/EventForm';
import NewsletterPage, {action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
    {
      path: '/', 
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: 
    [
      {index: true, element: <HomePage />,},
      {path: 'events', element: <EventsRootLayout />, children: [

        // loader - serve para buscar dados (geralmente de uma api ou bd) antes do componente ser renderizado
        // Para pegar os dados do return, vou na pages/EventsPage.js e uso o useLoaderData

        // Qualquer filho pode acessar o returno de loader, menos o nível superior, ou seja, "pais" não tem acesso ao retorno 
        // de loader

        // Uma desvantagem é que o react só vai pro componente quando ele sair do loader, mas imagine que uma consulta do bd demora
        // 5 seg, ele ia renderizar depois de 5s, coloque nas rotas um setTimeout e você vai ver como fica estranho (isso nas rotas do
        // node), ainda não fiz curso disso :(
        // Mas eu fiz, em backend/router/events.js tem um setTimeout para simular uma lentidão no bd

        // Resolvi isso usando useNavigation, em pages/Root.js, esse hook me informa se estou em transição de dados, ou seja, se estou
        // indo de uma rota para outra (url para outra)
        {index: true, element: <EventsPage />, loader: eventsLoader},
        {path: ':eventId',
        /* O id eu usei para usar um loader do filho
          Um loader, funciona em uma rota específica, no caso a rota /edit, eu só consigo usar o loader dele, não consigo usar o loader 
          do :eventId por exemplo.
          Porém, usando um id, eu consigo fazer isso, no caso, ao invés de usar o hook useLoaderData (que funciona para mim usar o loader),
          eu uso o useRouterLoaderData, esse recebe um parâmetro id e eu consigo no edit usar o loader do :eventId */
          id: 'event-detail',
          loader: eventsDetailLoader,
          children: [
            {index: true, element: <EventDetailPage />, action: deleteEventAction},
            {path: 'edit', element: <EditEventPage />, action: manipulateEventAction}
          ]
          },
        {path: 'new', element: <NewEventPage />, action: manipulateEventAction},
      ]},
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
  ]
}]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
