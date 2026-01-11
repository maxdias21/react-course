import { Link } from "react-router-dom";

const PRODUCTS = [
  {id: '1', title: 'Produto 1'},
  {id: '2', title: 'Produto 2'},
  {id: '3', title: 'Produto 3'},
]

function Products() {
  return (
    <>
      <h1>Lista de produtos</h1>
      <ul>
        {PRODUCTS.map(prod => <li key={prod.id}><Link to={`/products/${prod.id}`}>{prod.title}</Link></li>)}
      </ul>
    </>
  )
}

export default Products;