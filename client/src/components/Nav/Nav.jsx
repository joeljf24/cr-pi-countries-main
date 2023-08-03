import React from "react";
import style from "./Nav.module.css";
import SearchBar from "../Searchbar/SearchBar";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className={style.navContainer}>
      <div>
        <NavLink to="/home">
          <button className={style.buttonNav}>HOME</button>
        </NavLink>
      </div>

      <div>
        <NavLink to="/create">
          <button className={style.buttonNav}>CREATE ACTIVITY</button>
        </NavLink>
      </div>
      
      <div>
        <SearchBar/>
      </div>

      <div>
        <NavLink to="/">
          <button className={style.buttonLogout}>↩️</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;