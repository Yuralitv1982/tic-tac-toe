import { useState } from 'react';

// Изначальное состояние игрового поля (3x3, все клетки пустые)
const initialGameBoard = [
   [null, null, null],
   [null, null, null],
   [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
   // Создаём локальное состояние для игрового поля
   const [gameBoard, setGameBoard] = useState(initialGameBoard);

   // Функция для обновления игрового поля на основе сделанных ходов
   function updateGameBoard() {
      // Создаём копию начального игрового поля
      const updatedBoard = initialGameBoard.map((row) => [...row]);

      // Заполняем игровое поле ходами игроков
      for (const turn of turns) {
         const { row, col } = turn.square;
         updatedBoard[row][col] = turn.player;
      }

      // Обновляем состояние игрового поля
      setGameBoard(updatedBoard);
   }

   // Обновляем поле каждый раз, когда меняются ходы
   useState(() => {
      updateGameBoard();
   }, [turns]);

   return (
      <ol id='game-board'>
         {gameBoard.map((row, rowIndex) => (
            <li key={rowIndex}>
               <ol>
                  {row.map((playerSymbol, colIndex) => (
                     <li key={colIndex}>
                        {/* При нажатии на кнопку вызываем `onSelectSquare` */}
                        <button
                           onClick={() => onSelectSquare(rowIndex, colIndex)}
                        >
                           {playerSymbol}
                        </button>
                     </li>
                  ))}
               </ol>
            </li>
         ))}
      </ol>
   );
}
