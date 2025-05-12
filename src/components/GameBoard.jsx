import { useState, useEffect } from 'react';

export default function GameBoard({ onSelectSquare, turns }) {
   const [gameBoard, setGameBoard] = useState(
      Array(3)
         .fill(null)
         .map(() => Array(3).fill(null))
   );

   // Обновляем игровое поле при изменении ходов
   useEffect(() => {
      const updatedBoard = Array(3)
         .fill(null)
         .map(() => Array(3).fill(null));

      for (const turn of turns) {
         const { row, col } = turn.square;
         updatedBoard[row][col] = turn.player;
      }

      setGameBoard(updatedBoard);
   }, [turns]);

   return (
      <div id='game-board'>
         {gameBoard.map((row, rowIndex) =>
            row.map((playerSymbol, colIndex) => (
               <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
               >
                  {playerSymbol || ''}
               </button>
            ))
         )}
      </div>
   );
}

// Что делает этот компонент?
//  ✔ Генерирует игровое поле (3x3).
//  ✔ Обновляет состояние поля при каждом ходе игрока (useEffect).
//  ✔ Отображает символ X или O вместо пустых клеток.
//  ✔ Вызывает onSelectSquare(rowIndex, colIndex), когда нажимают кнопку.
