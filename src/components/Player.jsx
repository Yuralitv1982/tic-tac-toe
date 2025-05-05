export default function Player({ initialName, symbol, isActive }) {
   return (
      <div className={`player ${isActive ? 'active' : ''}`}>
         {initialName} ({symbol})
      </div>
   );
}
