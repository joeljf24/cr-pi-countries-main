import axios from "axios";
import style from "./Detail.module.css";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {
    const { id } = useParams();
    const [countries, setCountries] = useState({});
  
    useEffect(() => {
      axios(`http://localhost:3001/countries/${id}`).then(({ data }) => {
        if (data.id) {
          setCountries(data);
        } else {
          window.alert("Can't find the detail of that country");
        }
      });
      return setCountries({});
    }, [id]);
  
    return (
      <div className={style.container}>
        <div className={style.countryDetails}>
          <img
            src={countries?.image}
            alt={countries?.name}
            className={style.flagImage}
          />
          <div className={style.countryInfo}>
            <h2>Name: {countries?.name}</h2>
            <p>Capital: {countries?.capital}</p>
            <p>Continent: {countries?.continent}</p>
            <p>Subregion: {countries?.subregion}</p>
            <p>Area: {countries?.area}</p>
            <p>Population: {countries?.population}</p>
          </div>
        </div>
  
        <div className={style.activitiesHeader}>Activity/ies</div> {/* Movemos el encabezado fuera del contenedor de las cards */}
  
        <div className={style.activitiesContainer}>
          {countries?.Activities?.map((activity) => (
            <div key={activity.id} className={style.activityCard}>
              <h3>{activity.name}</h3>
              <p className={style.activityDetails}>Difficulty: {activity.difficulty}</p>
              <p className={style.activityDetails}>Duration: {activity.duration} hs</p>
              <p className={style.activityDetails}>Season: {activity.season}</p>
              <button className={style.deleteButton}>X</button>
            </div>
          ))}
        </div>
  
        <div className={style.buttonContainer}>
          <NavLink to="/home">
            <button className={style.buttonBack}>GO TO HOME</button>
          </NavLink>
        </div>
      </div>
    );
  };
  
  export default Detail;