import style from "./SearchBar.module.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Usamos un useRef para mantener una referencia al contenedor de resultados
  const resultsRef = useRef(null);

  useEffect(() => {
    // Agregamos un event listener para detectar clics fuera del componente
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    // Agregamos el event listener al montar el componente
    document.addEventListener("click", handleClickOutside);

    // Limpiamos el event listener al desmontar el componente
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onSearch = async (name) => {
    try {
      const response = await axios.get("http://https://server-yqou.onrender.com/countries/name", {
        params: {
          name: name,
        },
      });

      const countries = response.data;

      setSearchResults(countries);
    } catch (error) {
      console.error(error);
      alert("An error occurred while searching for the country.");
    }
  };

  const handleChangeSearch = (event) => {
    const value = event.target.value;
    setName(value);
    onSearch(value);
    setShowResults(true); // Mostrar la lista de resultados cuando se ingresa algo en la búsqueda
  };

  const handleItemClick = (id) => {
    navigate(`/detail/${id}`);
    setName("")
    setShowResults(false); // Ocultar la lista de resultados cuando se hace clic en un país
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setShowResults(false); // Ocultar la lista de resultados al presionar "Escape"
    }
  };

  return (
    <div className={style.searchBar}>
      <input
        className={style.inputSearchBar}
        placeholder="Search countries"
        type="search"
        onChange={handleChangeSearch}
        value={name}
        onKeyDown={handleKeyDown} // Escuchar el evento "onKeyDown" para la tecla "Escape"
      />

      {showResults && searchResults.length > 0 && (
        <div className={style.resultsContainer} ref={resultsRef}>
          <ul className={style.resultsList}>
            {searchResults.map((country) => (
              <li
                key={country.id}
                className={style.resultItem}
                onClick={() => handleItemClick(country.id)}
              >
                <img
                  src={country.image} // Supongamos que la propiedad para la imagen es "flag"
                  className={style.flagImage}
                />
                <span className={style.countryName}>{country.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;