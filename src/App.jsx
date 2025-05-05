import { useState } from 'react'; // Импортируем `useState`, чтобы управлять состоянием

import GameBoard from './components/GameBoard'; // Игровое поле
import Player from './components/Player'; // Компонент игрока
import Log from './components/Log'; // Журнал ходов

function App() {
   // Создаём состояние для хранения истории ходов
   const [gameTurns, setGameTurns] = useState([]);
   // Создаём состояние для отслеживания текущего игрока (`X` или `O`)
   const [activePlayer, setActivePlayer] = useState('X');

   // Функция обработки клика по клетке игрового поля
   function handleSelectSquare(rowIndex, colIndex) {
      // Добавляем новый ход в массив `gameTurns`
      setGameTurns((prevTurns) => [
         { square: { row: rowIndex, col: colIndex }, player: activePlayer },
         ...prevTurns,
      ]);

      // Меняем активного игрока на противоположного (`X` → `O`, `O` → `X`)
      setActivePlayer((prev) => (prev === 'X' ? 'O' : 'X'));
   }

   return (
      <main>
         <div id='game-container'>
            {/* Отображение игроков */}
            <ol id='players'>
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
            </ol>

            {/* Игровое поле с переданной функцией обработки кликов */}
            <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
         </div>

         {/* Журнал ходов */}
         <Log turns={gameTurns} />
      </main>
   );
}

export default App; // Экспортируем компонент `App` для использования в `index.js`
