import style from './Landing.module.css';
import landingLogo from  '../../assets/landingLogo.gif';
import { NavLink } from "react-router-dom";

const Landing = () => {
    return (
        <div className={style.homeContainer}>
            <img src={landingLogo} className={style.landingImage} />
            <h1 className={style.heading}>Start your traveling around the world</h1>
            <NavLink to='/home'>
                <button className={style.landingButton}>GO HOME ✈️</button>
            </NavLink>
        </div>
    )
};

export default Landing;