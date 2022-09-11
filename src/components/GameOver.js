import './GameOver.css';

function GameOver({retry, score}) {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>Pontuação Conquistada:
        <span>{score}</span>
      </h2>
      <button onClick={retry}>Recomeçar o jogo</button>
    </div>
  )
}

export default GameOver;