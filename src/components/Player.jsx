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

// Что делает этот компонент?
// ✔ Отображает имя игрока (<input>), чтобы его можно было изменить.
// ✔ Меняет имя игрока в реальном времени (onChangeName).
// ✔ Подсвечивает активного игрока (isActive).
