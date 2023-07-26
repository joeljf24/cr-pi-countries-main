import axios from "axios";
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
            <h1>{countries?.name}</h1>
            <img src={countries?.image} alt={countries?.name} />
            <h2>{countries?.continent}</h2>
        </div>
    )
};

export default Detail;