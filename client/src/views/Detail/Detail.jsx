import axios from "axios";
import style from "./Detail.module.css";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {
    const { id } = useParams();
    const [countries, setCountries] = useState({});
  
    useEffect(() => {
      axios(`https://server-yqou.onrender.com//countries/${id}`).then(({ data }) => {
        if (data.id) {
          setCountries(data);
        } else {
          window.alert("Can't find the detail of that country");
        }
      });
      return setCountries({});
    }, [id]);

    const deleteCountryFromActivity = async (activityId, countryId) => {
      try {
        await axios.delete(`https://server-yqou.onrender.com//activities/${activityId}/countries/${countryId}`);
        // Si la solicitud se completa correctamente, puedes actualizar la lista de actividades en el estado local, si es necesario.
        // Por ejemplo, puedes volver a cargar la información del país para reflejar los cambios después de la eliminación.
        // Puedes hacer otra solicitud para obtener el detalle actualizado del país.
      } catch (error) {
        console.error(error);
        window.alert("An error occurred while deleting the country from the activity.");
      }
    };
    const handleDeleteCountry = (activityId, countryId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this country from the activity?");
      if (confirmDelete) {
        deleteCountryFromActivity(activityId, countryId);
      }
    };
  
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
  
        {countries?.Activities?.length === 0 ? (
        <p className={style.noActivitiesMessage}>There are no activities for this country yet. Create yours!</p>
      ) : (
        <div className={style.activitiesContainer}>
          {countries?.Activities?.map((activity) => (
            <div key={activity.id} className={style.activityCard}>
              <h3>{activity.name}</h3>
              <p className={style.activityDetails}>Difficulty: {activity.difficulty}</p>
              <p className={style.activityDetails}>Duration: {activity.duration} hs</p>
              <p className={style.activityDetails}>Season: {activity.season}</p>
              <button
                className={style.deleteButton}
                onClick={() => handleDeleteCountry(activity.id, countries.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
  
        <div className={style.buttonContainer}>
          <NavLink to="/home">
            <button className={style.buttonBack}>GO TO HOME</button>
          </NavLink>
        </div>
      </div>
    );
  };
  
  export default Detail;