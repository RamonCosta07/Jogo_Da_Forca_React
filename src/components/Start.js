import './Start.css';

function Start({startGame}) {

  return (
      <div className='starts'>
          <h1>Jogo da Forca</h1>
          <p>Clique abaixo para iniciar</p>
          <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default Start;