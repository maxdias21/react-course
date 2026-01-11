import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom';
import HomePage from './pages/Home';
import Products from './pages/Products';
import MainNavigation from './components/MainNavigation';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetail from './pages/ProductDetail';


// Forma mais antiga de definir rotas
/*
const routerDefinitions = createRoutesFromElements(
  <Route>
    <Route path='/' element={<HomePage />} />
    <Route path='/' element={<HomePage />} />
  </Route>
)
const router = createBrowserRouter(routerDefinitions);
*/


// Forma mais atualizada de definir rotas
// Aqui criamos a rota e definimos o elemento a ser utilizado
// Igual python, criamos a rota + a função ou classView
const router = createBrowserRouter([
  {
    path:'/',
    element: <RootLayout />,
    /* Eu poderia criar um path individual para cada elemento, mas criei um pai e seus filhos (array de children)
      porém aqui tem algo especial, eu crio uma rota pai (no caso '/') e tudo que está dentro dela são filhos, como aqui o elemento é RootLayout, ele sempre vai passar
      nesse elemento antes dos outros, no caso /products, ele renderiza o Rootlayout, em seguida o Products.
      Imagina que você quer ter uma navbar em tudo no seu site, posso usar o RootLayout para fazer isso, lá tem algo chamado Outlet, dá uma olhadinha :)
    */

    /* Se a URL não existir, estou criando um elemento de Erro personalizado */
    /* Os children não consegue receber um errorElement, pelo menos não assim */
    errorElement: <ErrorPage />,
    children:[
      {path: '', element: <HomePage />}, 
      {/*
      Minha rota pai é /, se eu não colocar nada, essa rota vai ser carregada
      {path: '', element: <HomePage />},

      Aqui é parecido, porém index true significa que quando entrar na rota pai (no caso /), essa rota vai ser carregada,
      basicamente aqui eu defino um index de forma mais automática
      {index: true, element: <HomePage />},
      */},
      {path:'/products', element: <Products />},

      /* Aqui estou definindo que depois de /products vem algo dinâmico, pode ser qualquer coisa */
      /* Para pegar o produtoId, eu posso dar uma olhada em ProductDetail */
      {path:'/products/:productId', element: <ProductDetail />}
    ]
  },
]);

/* Ali em cima, se o pai for /root (por exemplo), as rotas filhas não podem começar com /
pq n? simples, imagina que estou em www.dominio.com.br/root, se o filho de root for produto, ficaria
www.dominio.com.br/root/produto, se eu colocar /produto no filho, ficaria assim www.dominio.com.br/produto, 
ele apaga o root e tudo que vier antes dele, ou seja, rota pai começa com /root (ou qualquer coisa), o filho
não pode ter a /, apenas o nome "produto"
*/

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
