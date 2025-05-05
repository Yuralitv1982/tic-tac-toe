import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

function App() {
   const [gameTurns, setGameTurns] = useState([]);
   const [activePlayer, setActivePlayer] = useState('X');
   const [winner, setWinner] = useState(null);
   const [playerNames, setPlayerNames] = useState({
      X: 'Игрок 1',
      O: 'Игрок 2',
   });

   function handleChangeName(player, newName) {
      setPlayerNames((prevNames) => ({ ...prevNames, [player]: newName }));
   }

   return (
      <div className='app'>
         <header className='header'>
            <h1>Tic-Tac-Toe</h1>
         </header>

         <main>
            <div id='game-container'>
               <div className='players-container'>
                  <Player
                     name={playerNames.X}
                     symbol='X'
                     isActive={activePlayer === 'X'}
                     onChangeName={handleChangeName}
                  />
                  <Player
                     name={playerNames.O}
                     symbol='O'
                     isActive={activePlayer === 'O'}
                     onChangeName={handleChangeName}
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
