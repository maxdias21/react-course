import {useState} from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}) {
  // Nome inicial
  // Trocar nome
  const [playerName, setPlayerName] = useState(initialName);

  // O usuário está editando o nome
  const [isEditing, setIsEditing] = useState(false);
  
  // Edita o nome na função principal // em App.jsx
  function handleClickEdit() {
    setIsEditing(editing => !editing);

    if(isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // Alterar o valor do nome do jogador pegando o valor do campo input
  function handleChange(e) {
    setPlayerName(e.target.value)
  }

  // HTML *nome do jogador
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  // HTML *texto editar/salvar
  let btnCaption = "Edit";

  // Clicar em "edit", altera pra um input para poder trocar o nome
  if(isEditing) {
    editablePlayerName = <input type="text" required defaultValue={playerName} onChange={handleChange} />;
    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className='player'>
       {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClickEdit}>{btnCaption}</button>
    </li>
  )
}