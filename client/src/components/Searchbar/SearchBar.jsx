import style from './SearchBar.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const onSearch = async (name) => {
    try {
      const response = await axios.get(
        'http://localhost:3001/countries/name',
        {
          params: {
            name: name,
          },
        }
      );

      const country = response.data[0]; // La respuesta es un array, tomamos el primer país encontrado

      if (country) {
        const id = country.id;
        navigate(`/detail/${id}`);
      } else {
        alert('There are no countries with that name!');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while searching for the country.');
    }
  };

  const handleChangeSearch = (event) => {
    setName(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(name);
    setName('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(name);
      setName('');
    }
  };

  return (
    <div className={`${style['search-container']} ${style['search-bar']}`}>
      <input
        className={style['search-input']}
        placeholder='Search countries'
        type='search'
        onChange={handleChangeSearch}
        onKeyPress={handleKeyPress}
        value={name}
      />
      <button onClick={handleSearchClick}>🔍</button>
    </div>
  );
};

export default SearchBar;