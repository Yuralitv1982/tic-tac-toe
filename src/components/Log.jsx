export default function Log({ turns }) {
   return (
      <div id='log'>
         <ol>
            {turns.map((turn, index) => (
               <li key={index}>
                  <strong>{turn.player}</strong> → {turn.square.row},{' '}
                  {turn.square.col}
               </li>
            ))}
         </ol>
      </div>
   );
}
