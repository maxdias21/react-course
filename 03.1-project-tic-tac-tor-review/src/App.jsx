import {useState} from 'react';

// Componentes
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';
import Log from './components/Log';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

// Trocar a vez do jogador
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if(gameTurns.length && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

// Tabuleiro inicial
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  // DeepCopy do "initialGameBoard"
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  // Percorre o array e atualiza ele a cada novo estado atualizado do React
  for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

// Verificar se houve um vencedor
function deriveWinner(gameBoard, players) {
  let winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  // Nome inicial 
  // Armazenar troca dos nomes
  const [players, setPlayers] = useState(PLAYERS);

  // Armazenar os ind/col do tabuleiro + vez do jogador
  const [gameTurns, setGameTurns] = useState([]);

  // Trocar nome do jogador
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      } 
    })
  }

  // Apenas para passar para o componente "Player" quem vai fazer a próxima jogada
  const activePlayer = deriveActivePlayer(gameTurns);

  // Chamar função para criar tabuleiro
  const gameBoard = deriveGameBoard(gameTurns);

  // Função no botão do "GameBoard.jsx"
  // Clicou em um botão atualiza o array
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];

      return updatedTurns;
    });
  }

  // Chama função pra verificar se tem um vencedor
  const winner = deriveWinner(gameBoard, players)

  // Verificar se tem empate
  let hasDraw = gameTurns.length === 9 && !winner;

  // Reiniciar o jogo
  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={players.X} onChangeName={handlePlayerNameChange} isActive={activePlayer === "X"} symbol="X"></Player>
          <Player initialName={players.O} onChangeName={handlePlayerNameChange} isActive={activePlayer === "O"} symbol="O"></Player>
        </ol>
        {(winner || hasDraw) && <GameOver  onRestart={handleRestart} winner={winner} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
