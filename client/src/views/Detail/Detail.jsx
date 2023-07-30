import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {
    const { id } = useParams();
    const [countries, setCountries] = useState ({}) // Estado y funcion que me permite modificar el estado [state, fn()]

    useEffect(() => {
        axios(`http://localhost:3001/countries/${id}`)
        .then(({ data }) => {
           if (data.id) {
              setCountries(data);
           } else {
              window.alert('Cant find the detail of that country');
           }
        });
        return setCountries({});
     }, [id]);  // No olvidarse del ID porque genera un loop donde la API te banea


    return(
        <div>
            <div>
                <img src={countries?.image} alt={countries?.name} />
                <h2>ID: {countries?.id}</h2>
                <h2>Name: {countries?.name}</h2>
                <h2>Capital: {countries?.capital}</h2>
                <h2>Continent: {countries?.continent}</h2>
                <h2>Subregion: {countries?.subregion}</h2>
                <h2>Area: {countries?.area}</h2>
                <h2>Population: {countries?.population}</h2>
            </div>

            <div>
                <h2>Activity/ies: {countries?.Activities?.name}</h2>
                <h2>{countries?.Activities?.difficulty}</h2>
                <h2>{countries?.Activities?.duration}</h2>
                <h2>{countries?.Activities?.season}</h2>
            </div>

            <NavLink to='/home'>
                <button>GO TO HOME</button>
            </NavLink>
        </div>
    )
};

export default Detail;