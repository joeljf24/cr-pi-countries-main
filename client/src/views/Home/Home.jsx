import style from "./Home.module.css";
import Cards from "../../components/Cards/Cards";
import Paginated from "../../components/Paginated/Paginated";
import { getCountries, getActivities } from "../../redux/actions/actions";
import {
  setOrder,
  setFilterContinent,
  setFilterActivity,
  combinedFilters,
} from "../../redux/actions/filtered";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order);
  const filterContinent = useSelector((state) => state.filterContinent);
  const filterActivity = useSelector((state) => state.filterActivity);
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    if (order || filterContinent || filterActivity)
      dispatch(combinedFilters(order, filterContinent, filterActivity));
    else dispatch(getCountries());
  }, [order, filterContinent, filterActivity]);

  const handleOrderedCountries = (event) => {
    dispatch(setOrder(event.target.value));
    setCurrentPage(1);
  };

  const handleFilteredContinent = (event) => {
    dispatch(setFilterContinent(event.target.value));
    setCurrentPage(1);
  };

  const handleFilteredActivity = (event) => {
    dispatch(setFilterActivity(event.target.value));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    dispatch(setOrder("asc"));
    dispatch(setFilterContinent(""));
    dispatch(setFilterActivity(""));
    document.getElementById("sortSelect").value = 'asc';
    document.getElementById("continentSelect").value = "";
    document.getElementById("activitySelect").value = "";
    setCurrentPage(1);
  };

  return (
    <div>
      <div className={style.filterContainer}>
        <div className={style.filter}>
          <label htmlFor="sortSelect">Sort by: </label>
          <select
            id="sortSelect"
            onChange={(event) => handleOrderedCountries(event)}
          >
            <option value="asc">Ascendant</option>
            <option value="desc">Descendent</option>
            <option value="higherPop">Higher Population</option>
            <option value="lowerPop">Lower Population</option>
          </select>
        </div>

        <div className={style.filter}>
          <label htmlFor="continentSelect">Filter by continent: </label>
          <select
            id="continentSelect"
            onChange={(event) => handleFilteredContinent(event)}
          >
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
          </select>
        </div>

        <div className={style.filter}>
          <label htmlFor="activitySelect">Filter by activity: </label>
          <select
            id="activitySelect"
            onChange={(event) => handleFilteredActivity(event)}
          >
            <option value="">Any</option>
            {activities?.map((activity) => (
              <option value={activity.name} key={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>

        <div className={style.buttonFilter}>
          <button className={style.resetButton} onClick={resetFilters}>
            RESET FILTERS
          </button>
        </div>
      </div>

      {
      currentCountries.length > 0
      ? <Cards currentCountries={currentCountries} />
      : <p className={style.withOutCountries}>No countries were found with the specified filters or search terms.</p>
      }
      
      <Paginated
        countriesPerPage={countriesPerPage}
        countries={countries.length}
        paginated={paginated}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
