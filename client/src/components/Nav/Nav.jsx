import React from "react";
import style from "./Nav.module.css";
import SearchBar from "../Searchbar/SearchBar";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className={style.navContainer}>
      <div className={style.navBar}>
        <div>
          <NavLink to="/home">
            <button>HOME</button>
          </NavLink>

          <NavLink to="/create">
            <button>CREATE ACTIVITY</button>
          </NavLink>
        </div>

        <div className={style.searchButton}>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Nav;
