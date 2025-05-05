export default function GameBoard({ onSelectSquare, turns }) {
   const gameBoard = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));

   for (const turn of turns) {
      const { row, col } = turn.square;
      gameBoard[row][col] = turn.player;
   }

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
