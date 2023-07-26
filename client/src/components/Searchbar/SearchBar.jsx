import { useState } from 'react';
import style from './SearchBar.module.css'

const SearchBar = ({ onSearch }) => {
   const [name, setName] = useState('');

   const handleChangeSearch = (event) => {
      setName(event.target.value);
   }

   return (
      <div>
         <div action="" className={style.searchBar}>
            <input placeholder='enter the name of a country' type='search' onChange={handleChangeSearch} value={name}/>
            <button onClick={() => {onSearch(name); setName('')}}>BUSCAR</button>
         </div>
      </div>
   );
};

export default SearchBar;