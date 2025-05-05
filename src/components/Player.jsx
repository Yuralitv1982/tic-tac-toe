export default function Player({ name, symbol, isActive, onChangeName }) {
   return (
      <div className={`player ${isActive ? 'active' : ''}`}>
         <input
            type='text'
            value={name}
            onChange={(e) => onChangeName(symbol, e.target.value)}
            className='player-name'
         />
         ({symbol})
      </div>
   );
}
