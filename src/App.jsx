import { useState, useEffect, useCallback } from 'react'; // Импортируем React хуки
import GameBoard from './components/GameBoard'; // Компонент игрового поля
import Player from './components/Player'; // Компонент игроков
import Log from './components/Log'; // Компонент журнала ходов

function App() {
   // **Хранение состояния игры**
   const [gameTurns, setGameTurns] = useState([]); // История ходов игроков
   const [activePlayer, setActivePlayer] = useState('X'); // Текущий игрок (X или O)
   const [winner, setWinner] = useState(null); // Победитель игры (X, O или ничья)
   const [playerNames, setPlayerNames] = useState({
      X: 'Игрок 1',
      O: 'Игрок 2',
   }); // Имена игроков

   // **Функция для изменения имени игрока**
   function handleChangeName(player, newName) {
      setPlayerNames((prevNames) => ({ ...prevNames, [player]: newName }));
   }

   // **Функция обработки клика по игровому полю**
   function handleSelectSquare(rowIndex, colIndex) {
      if (winner) return; // Если игра уже завершена, запрещаем ходы

      setGameTurns((prevTurns) => [
         { square: { row: rowIndex, col: colIndex }, player: activePlayer }, // Записываем ход
         ...prevTurns,
      ]);

      setActivePlayer((prev) => (prev === 'X' ? 'O' : 'X')); // Меняем активного игрока
   }

   // **Оптимизированная проверка победителя**
   const checkWinner = useCallback(() => {
      // Создаём игровое поле на основе истории ходов
      const board = Array(3)
         .fill(null)
         .map(() => Array(3).fill(null));

      for (const turn of gameTurns) {
         const { row, col } = turn.square;
         board[row][col] = turn.player;
      }

      // **Генерация победных комбинаций динамически**
      const getWinningCombinations = (board) => {
         const rows = board.map((row) => row); // Горизонтальные линии
         const columns = board.map((_, i) => board.map((row) => row[i])); // Вертикальные линии
         const diagonals = [
            [board[0][0], board[1][1], board[2][2]], // Главная диагональ
            [board[0][2], board[1][1], board[2][0]], // Обратная диагональ
         ];
         return [...rows, ...columns, ...diagonals];
      };

      // Получаем победные комбинации
      const winningCombinations = getWinningCombinations(board);

      // **Проверка победителя**
      for (const combination of winningCombinations) {
         if (combination.every((cell) => cell === 'X')) {
            setWinner('X'); // Победил X
            return;
         }
         if (combination.every((cell) => cell === 'O')) {
            setWinner('O'); // Победил O
            return;
         }
      }

      // **Проверка на ничью**
      if (gameTurns.length === 9 && !winner) {
         setWinner('Ничья'); // Все клетки заняты, но победителя нет
      }
   }, [gameTurns]); // `useCallback` предотвращает лишние ререндеры

   // **Запуск проверки победителя при изменении `gameTurns`**
   useEffect(() => {
      checkWinner();
   }, [gameTurns, checkWinner]);

   // **Функция сброса игры**
   function resetGame() {
      setGameTurns([]); // Очищаем историю ходов
      setActivePlayer('X'); // Устанавливаем X как первого игрока
      setWinner(null); // Сбрасываем победителя
   }

   return (
      <div className='app'>
         {/* **Заголовок игры** */}
         <header className='header'>
            <h1>Tic-Tac-Toe</h1>
         </header>

         <main>
            <div id='game-container'>
               {/* **Блок игроков** */}
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

               {/* **Игровое поле** */}
               <GameBoard
                  onSelectSquare={handleSelectSquare}
                  turns={gameTurns}
               />

               {/* **Журнал ходов** */}
               <Log turns={gameTurns} />
            </div>

            {/* **Экран окончания игры** */}
            {winner && (
               <div className='game-over'>
                  <h2>
                     {winner === 'Ничья'
                        ? 'Игра окончена: Ничья!'
                        : `Победитель: ${winner}`}
                  </h2>
               </div>
            )}

            {/* **Кнопка сброса игры** */}
            <button className='reset-btn' onClick={resetGame}>
               Начать заново
            </button>
         </main>
      </div>
   );
}

export default App;
