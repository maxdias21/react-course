import ImgCoreConcepts from '../../assets/react-core-concepts.png';
import './Header.css';

// Apenas um array com 3 elementos
// Ele serve para mudar de forma dinâmica uma palavra na página inicial
const reactDescriptions = ['Fundamental','Core','Crucial'];

// Aqui é apenas uma função para pegar um dos elementos do array acima
function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export function Header() {
  const description = reactDescriptions[getRandomInt(reactDescriptions.length - 1)]

  return (
    <header>
      <img src={ImgCoreConcepts} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}