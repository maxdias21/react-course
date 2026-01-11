import {useState, useRef} from 'react';

export default function Player() {
  // Use ref serve para referenciar algo, não causa re renderização como o useState
  // Posso referenciar qualquer coisa html praticamente mas também outras coisas
  // ------------------------------------------------------------------------------
  // Estou usando isso no input, eu poderia usar o useState também, porém esse
  // último a cada tecla pressionada ele ia re renderizar o app, causando mais
  // lentidão
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  // Quando eu clico para alterar o nome executo essa função
  // Vai re renderizar pois estou usando o setEnteredPlayerName
  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
