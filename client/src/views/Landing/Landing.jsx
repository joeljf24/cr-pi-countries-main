import style from "./Landing.module.css";
import { useState } from "react";
import landingLogo from "../../assets/landingLogo.gif";

const Landing = () => {
  const [expanded, setExpanded] = useState(false);

  const handleGoHome = () => {
    setExpanded(true);
    setTimeout(() => {
      window.location.href = "/home";
    }, 1500);
  };

  return (
    <div className={style.homeContainer}>
      <img
        src={landingLogo}
        className={`${style.landingImage} ${expanded ? style.expanded : ""}`}
      />
      <h1 className={style.heading}>Start your travel around the world</h1>
      <button className={style.landingButton} onClick={handleGoHome}>
        GO HOME ✈️
      </button>
    </div>
  );
};

export default Landing;