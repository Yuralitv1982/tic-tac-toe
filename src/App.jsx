import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

function App() {
   const [gameTurns, setGameTurns] = useState([]);
   const [activePlayer, setActivePlayer] = useState('X');
   const [winner, setWinner] = useState(null);

   function handleSelectSquare(rowIndex, colIndex) {
      if (winner) return;

      setGameTurns((prevTurns) => [
         { square: { row: rowIndex, col: colIndex }, player: activePlayer },
         ...prevTurns,
      ]);

      setActivePlayer((prev) => (prev === 'X' ? 'O' : 'X'));
   }

   function resetGame() {
      setGameTurns([]);
      setActivePlayer('X');
      setWinner(null);
   }

   return (
      <div className='app'>
         <header className='header'>
            <img src='/logo.png' alt='Логотип' className='logo' />
            <h1>Tic-Tac-Toe</h1>
         </header>

         <main>
            <div id='game-container'>
               <div className='players-container'>
                  <Player
                     initialName='Игрок 1'
                     symbol='X'
                     isActive={activePlayer === 'X'}
                  />
                  <Player
                     initialName='Игрок 2'
                     symbol='O'
                     isActive={activePlayer === 'O'}
                  />
               </div>

               <GameBoard
                  onSelectSquare={handleSelectSquare}
                  turns={gameTurns}
               />
               <Log turns={gameTurns} />
            </div>

            {winner && <h2 className='winner'>Победитель: {winner}</h2>}

            <button className='reset-btn' onClick={resetGame}>
               Начать заново
            </button>
         </main>
      </div>
   );
}

export default App;
