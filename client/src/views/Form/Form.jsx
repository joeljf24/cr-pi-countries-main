import style from './Form.module.css';
import axios from 'axios';
import { getCountries } from '../../redux/actions/actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({});
  const [activityData, setActivityData] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: [],
    countrySearch: '',
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
    // setErrors(
    //   validation({
    //     ...activityData,
    //     [event.target.name]: event.target.value,
    //   })
    // );
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
    const isCountryAlreadyAdded = activityData.countries.some(
      (c) => c.name === country.name
    );
    if (!isCountryAlreadyAdded) {
      setActivityData({
        ...activityData,
        countrySearch: '',
        searchResults: [],
        countries: [...activityData.countries, country],
      });
    }
  };

  const handleRemoveCountry = (countryId) => {
    setActivityData({
      ...activityData,
      countries: activityData.countries.filter(
        (country) => country.id !== countryId
      ),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/activities', activityData)
      .then((res) => {
        console.log('Response from server:', res.data);
        alert('Activity created successfully!');
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error creating activity:', error);
        if (error.response) {
          console.error('Error response from server:', error.response.data);
        }
        alert('Error creating activity. Please try again.');
      });
  };

  console.log('DATOS DE LA ACTIVIDAD', activityData);
  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <div className={style.formContent}>
        <div>
          <h2 className={style.title}>CREATE ACTIVITY FOR YOUR COUNTRIES</h2>
          <p className={style.subTitle}>Fields with * are required</p>
        </div>

        <div>
          <label className={style.label}>Name: *</label>
          <input
            className={style.input}
            type='text'
            name='name'
            value={activityData.name}
            onChange={changeHandler}
          />
          {errors.name && <p className={style.error}>{errors.name}</p>}
          <hr className={style.separator} />
        </div>

        <div>
          <label className={style.label}>Difficulty: *</label>
          <select
            className={style.input}
            type='number'
            name='difficulty'
            value={activityData.difficulty}
            onChange={changeHandler}
          >
            <option value='' disabled>
              Select difficulty
            </option>
            <option value='1'>⭐ ✰ ✰ ✰ ✰</option>
            <option value='2'>⭐⭐ ✰ ✰ ✰</option>
            <option value='3'>⭐⭐⭐ ✰ ✰</option>
            <option value='4'>⭐⭐⭐⭐ ✰</option>
            <option value='5'>⭐⭐⭐⭐⭐</option>
          </select>
          {errors.difficulty && (
            <p className={style.error}>{errors.difficulty}</p>
          )}
          <hr className={style.separator} />
        </div>

        <div>
          <label className={style.label}>Duration: </label>
          <input
            className={style.input}
            type='time'
            name='duration'
            value={activityData.duration}
            onChange={changeHandler}
          />
          {errors.duration && <p className={style.error}>{errors.duration}</p>}
          <hr className={style.separator} />
        </div>

        <div>
          <label className={style.label}>Season: *</label>
          <select
            className={style.input}
            name='season'
            value={activityData.season}
            onChange={changeHandler}
          >
            <option value='' disabled>
              Select season
            </option>
            <option value='Summer'>Summer</option>
            <option value='Autumn'>Autumn</option>
            <option value='Winter'>Winter</option>
            <option value='Spring'>Spring</option>
          </select>
          {errors.season && <p className={style.error}>{errors.season}</p>}
          <hr className={style.separator} />
        </div>

        <div>
          <label className={style.label}>Countries: *</label>
          <div className={style.countrySearchContainer}>
            <input
              className={style.countrySearchInput}
              type='text'
              value={activityData.countrySearch}
              onChange={handleCountrySearch}
              placeholder='Search countries...'
            />
            <div className={style.searchResults}>
              {activityData.searchResults.map((country) => (
                <div
                  key={country.name}
                  className={style.searchResultItem}
                  onClick={() => handleAddCountry(country)}
                >
                  {/* <img
                    src={country.flag} // Asegúrate de que country.flag sea el enlace correcto a la imagen
                    alt={country.name}
                    className={style.flag}
                  /> */}
                  {country.name}
                </div>
              ))}
            </div>
          </div>
          <div className={style.selectedCountries}>
            {activityData.countries.map((country, index) => (
              <div key={index} className={style.selectedCountry}>
                {/* <img
                  src={country.flag} // Asegúrate de que country.flag sea el enlace correcto a la imagen
                  alt={country.name}
                  className={style.flag}
                /> */}
                <span>{country.name}</span>
                <button
                  type='button'
                  className={style.removeCountryButton}
                  onClick={() => handleRemoveCountry(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <hr className={style.separator} />
        </div>

        <div>
          <button className={style.button}>CREATE ACTIVITY</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
