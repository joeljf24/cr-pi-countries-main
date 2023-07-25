import style from './Landing.module.css';
import { NavLink } from "react-router-dom";

const Landing = () => {
    return (
        <div className={style.homeContainer}>
            <h1>Hola, esta es la ruta Landing Page</h1>
            <NavLink to='/home'>
                <button>GO HOME</button>
            </NavLink>
        </div>
    )
};


export default Landing;
