export default function Log({ turns }) {
   return (
      <div id='log'>
         <h3>История ходов</h3>
         <ol>
            {turns.map((turn, index) => (
               <li key={index}>
                  <strong>{turn.player}</strong> → ряд: {turn.square.row},
                  колонка: {turn.square.col}
               </li>
            ))}
         </ol>
      </div>
   );
}

// Что делает этот компонент?
// ✔ Показывает все сделанные ходы (turns).
// ✔ Упорядочивает их в списке (<ol>).
// ✔ Подписывает, кто ходил (X или O) и где.
