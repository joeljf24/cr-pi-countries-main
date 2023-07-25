import style from './Nav.module.css';
import { NavLink } from "react-router-dom";

const Nav = () => {
    return(
        <div className={style.navBar}>
            <NavLink to='/home'>
                <button>HOME</button>
            </NavLink>

            <NavLink to='/create'>
                <button>CREATE ACTIVITY</button>
            </NavLink>
        </div>
    )
}

export default Nav;