import style from "./SearchBar.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const onSearch = async (name) => {
    try {
      const response = await axios.get("http://localhost:3001/countries/name", {
        params: {
          name: name,
        },
      });

      const country = response.data[0]; // La respuesta es un array, tomamos el primer país encontrado

      if (country) {
        const id = country.id;
        navigate(`/detail/${id}`);
      } else {
        alert("There are no countries with that name!");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while searching for the country.");
    }
  };

  const handleChangeSearch = (event) => {
    setName(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(name);
    setName("");
  };

  return (
    <div className={style.searchBar}>
      <input
        className={style.inputSearchBar}
        placeholder="Search countries"
        type="search"
        onChange={handleChangeSearch}
        value={name}
      />
      <button className={style.buttonSearch} onClick={handleSearchClick}>
        🔍
      </button>
    </div>
  );
};

export default SearchBar;