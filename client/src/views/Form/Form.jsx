import style from "./Form.module.css";
import axios from "axios";
import validations from "./validation";
import { getCountries } from "../../redux/actions/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const countries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({});
  const [activityData, setActivityData] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
    countrySearch: "",
    searchResults: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const changeHandler = (event) => {
    setActivityData({
      ...activityData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validations({
        ...activityData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleCountrySearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery)
    );
    setActivityData({
      ...activityData,
      countrySearch: event.target.value,
      searchResults: filteredCountries,
    });
  };

  const handleAddCountry = (country) => {
    if (!activityData.countries.includes(country.name)) {
      setActivityData((prevData) => ({
        ...prevData,
        countrySearch: "",
        searchResults: [],
        countries: [...prevData.countries, country.name],
      }));
    }
  };

  const handleRemoveCountry = (country) => {
    setActivityData((prevData) => ({
      ...prevData,
      countries: prevData.countries.filter((c) => c !== country),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = "https://server-yqou.onrender.com/activities"
    try {
      const res = await axios.post(endpoint, activityData);
      console.log("Response from server:", res.data);
      alert("Activity created successfully!");
      navigate("/home");
    } catch (error) {
      console.error(`Error creating activity:" ${error}`);
      if (error.response) {
        alert(`Error response from server: ${error.response.data.error}`);
      } else {
      alert("Error creating activity. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <div className={style.formContent}>
        <div>
          <h2 className={style.title}>CREATE ACTIVITY FOR YOUR COUNTRIES</h2>
          <p className={style.subTitle}>Fields with * are required</p>
        </div>

        <div>
          <label className={style.label}>Name: *</label>
          <input className={style.input} type="text" name="name" placeholder="Give the activity name" value={activityData.name} onChange={changeHandler}/>

          {errors.name && <p className={style.error}>{errors.name}</p>}
          <hr className={style.separator} />
        </div>

        <div>
          <label className={style.label}>Countries: *</label>
          <div className={style.countrySearchContainer}>
            <input className={style.countrySearchInput} type="text" name="countries" value={activityData.countrySearch} onChange={handleCountrySearch} placeholder="Search countries..."/>
            <div className={style.searchResults}>
              {
                activityData.searchResults.map((country) => (
                  <div key={country.name} className={style.searchResultItem} onClick={() => handleAddCountry(country)}>
                    {country.name}
                    {activityData.countries.includes(country.name) && (<span className={style.addedIndicator}>Added</span>)}
                  </div>
                ))
              }
            </div>

            {errors.countries && activityData.countries.length === 0 && <p className={style.error}>{errors.countries}</p>}
          </div>

          <div>
            <label className={style.label}>Difficulty: *</label>
            <select className={style.input} type="number" name="difficulty" value={activityData.difficulty} onChange={changeHandler}>
              <option value="">Select difficulty</option>
              <option value="1">⭐ ✰ ✰ ✰ ✰  Easy</option>
              <option value="2">⭐⭐ ✰ ✰ ✰</option>
              <option value="3">⭐⭐⭐ ✰ ✰  Intermediate</option>
              <option value="4">⭐⭐⭐⭐ ✰</option>
              <option value="5">⭐⭐⭐⭐⭐  Hard</option>
            </select>

            {errors.difficulty && <p className={style.error}>{errors.difficulty}</p>}
            <hr className={style.separator} />
          </div>

          <div>
            <label className={style.label}>Duration: *</label>
            <input className={style.input} type="time" name="duration" value={activityData.duration} onChange={changeHandler}/>

            {errors.duration && <p className={style.error}>{errors.duration}</p>}
            <hr className={style.separator} />
          </div>

          <div>
            <label className={style.label}>Season: *</label>
            <select className={style.input} name="season" value={activityData.season} onChange={changeHandler}>
              <option value="">Select season</option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </select>

            {errors.season && <p className={style.error}>{errors.season}</p>}
            <hr className={style.separator} />
          </div>

          <div className={style.selectedCountries}>
            {
              activityData.countries.map((country) => (
                <div key={country} className={style.selectedCountry}>
                  <span>{country}</span>
                  <button type="button" className={style.removeCountryButton} onClick={() => handleRemoveCountry(country)}>
                    X
                  </button>
                </div>
              ))
            }
          </div>
          <hr className={style.separator} />
          <div>
            {
              activityData.name && activityData.difficulty && activityData.season && activityData.countries.length > 0 && Object.keys(errors).length === 0 
              ? ( <button className={style.button}>CREATE ACTIVITY</button> )
              : ( <button className={style.button} disabled>COMPLETE ALL FIELDS FIRST</button>)
            }
          </div>

        </div>
      </div>
    </form>
  );
};

export default Form;