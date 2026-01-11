import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

import { lazy, Suspense } from 'react';

// Aqui é o lazy loading, eu só uso essa importação quando eu precisar
// Eu uso o lazy pois estou informando que vou usar isso mais tarde, não agora
// Se eu não usar o lazy, eu vou tentar usar <BlogPage /> como um elemento jsx, vai dar erro
// Eu vou usar um elemento <Suspense> para funcionar (explicação lá em baixo)
const BlogPage = lazy(() => import('./pages/Blog'));

const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          { index: true, 
            // Aqui estou usando o lazy, vou precisar do <Suspense /> para renderizar o componente normalmente
            // Suspense pode ser usado para esperar algo carregar na tela antes de mostrar (na aula de 21-react-router-advanced)
            // fallback é o que vou mostrar enquanto o conteúdo principal está sendo carregado
            element: <Suspense fallback={"Loading..."}><BlogPage /></Suspense>,

            // Aqui é o lazy loading, eu só uso essa importação quando eu precisar
            // Comentei a importação da linha 3, pois daquela forma ela é carregada inicialmente mesmo se eu não for usar no momento
            loader: () => import('./pages/Blog').then(module => module.loader()) },
          { path: ':id', element: <Suspense><PostPage /></Suspense>, 
            // Criei diferente usando meta pois meu loader recebe um params
            // Ao invés de meta poderia ser {params} e no loader colocar {params}
            loader:  (meta) => import('./pages/Post').then(module => module.loader(meta))},
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
