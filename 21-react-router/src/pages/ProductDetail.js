import { useParams, Link } from "react-router-dom";

function ProductDetail() {
  /* Pegar o param extra que vem da url, ex: dominio.com/produtos/1
  No caso, o 1 seria uma url dinâmica, posso usar o useParams para pegar isso */
  const params = useParams();

  return (
    <>
      <h1>Detalhes do produto</h1>

      {/* Aqui é apenas o nome que vem nos : da url, posso ver isso em App.js */}
      {params.productId}

      {/* to = serve para voltar diretórios, explicação um pouco grande

       {path:'/products/:productId', element: <ProductDetail />}
       nesse exemplo, se eu colocar .. ele volta um diretório (url no caso), porém o path nesse exemplo tem /products/:productId
       suponha que a url seja essa www.google.com.br/brinquedos/2, usando .. ele apaga brinquedos/2 pois ele volta um diretório acima,
       no caso, tudo que tem no path

       se eu colocar relative=path, ele agora apaga apenas o primeiro / ou seja, apenas o 2, ficando www.google.com.br/brinquedos
      */}
      <p><Link to=".." relative="path">Voltar</Link></p>
    </>
  )
}

export default ProductDetail;