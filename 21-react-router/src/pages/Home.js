import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  /* useNavigate - vá para a url de forma programada, no meu caso, vá apenas quando eu clicar no botão
    pode ser útil caso algum timer expire ou qualquer coisa do tipo...
  */
  const navigate = useNavigate();

  function navigateHandler() {
    navigate('/products');
  }

  return (
    <>
    {/* A diferença de a para Link é que a faz uma nova solicitação http (recarrega a página), Link não faz isso, ele carrega conteúdos essenciais (como elementos) para 
    conseguir carregar eles sem precisar recarregar a página
    */}
      <h1>Página inicial</h1>
      <p>Vá para a <Link to="/products">lista de produtos</Link></p>

      <button onClick={navigateHandler}>Vá para a url de produtos</button>
    </>
  )
}

export default HomePage;