import logo from '../assets/logo.png';

// Sempre que um arquivo CSS tiver no nome .module, pra usar id/classes
import styled from './HeaderStyle.module.css';

export default function Header() {
  return (
    <header>
      {/* Exemplo do arquivo CSS quando tiver .module no nome */}
      {/* <p className={styled.paragraph}>Header</p> */}

      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </header>
  );
}
