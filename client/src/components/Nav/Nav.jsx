import style from './Nav.module.css';
import SearchBar from '../Searchbar/SearchBar';
import { NavLink } from "react-router-dom";

const Nav = ({ onSearch }) => {
    return(
        <div className={style.navBar}>
            <div>
                <NavLink to='/home'>
                    <button>HOME</button>
                </NavLink>

                <NavLink to='/create'>
                    <button>CREATE ACTIVITY</button>
                </NavLink>
            </div>

            <div className={style.searchButton}>
                <SearchBar onSearch={onSearch}/>
            </div>
        </div>
    )
}

export default Nav;