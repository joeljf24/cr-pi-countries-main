import axios from "axios";
import {
  SET_ORDER,
  SET_FILTER_CONTINENT,
  SET_FILTER_ACTIVITY,
  COMBINED_FILTERS,
} from "../actions-types";

export const setOrder = (order) => {
  return { type: SET_ORDER, payload: order };
};

export const setFilterContinent = (continent) => {
  return { type: SET_FILTER_CONTINENT, payload: continent };
};

export const setFilterActivity = (activity) => {
  return { type: SET_FILTER_ACTIVITY, payload: activity };
};

export const combinedFilters = (order, continent, activity) => {
  const endpoint = "http://localhost:3001/countries";

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      let filterCountries = data;

      if (order && !continent && !activity) {
        // Filtrar y ordenar si se proporciona solo el parámetro 'order'
        if (order === "asc") {
          filterCountries.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === "desc") {
          filterCountries.sort((a, b) => b.name.localeCompare(a.name));
        } else if (order === "lowerPop") {
          filterCountries.sort((a, b) => a.population - b.population);
        } else if (order === "higherPop") {
          filterCountries.sort((a, b) => b.population - a.population);
        }
      }
      
      else if (!order && continent && !activity) {
        // Filtrar por continente si se proporciona solo el parámetro 'continent'
        filterCountries = filterCountries.filter(
          (country) => country.continent === continent
        );
      }
      
      else if (!order && !continent && activity) {
        // Filtrar por actividad si se proporciona solo el parámetro 'activity'
        filterCountries = filterCountries.filter((country) =>
          country.Activities.some((act) => act.name === activity)
        );
      }
      
      else if (order && continent && !activity) {
        // Filtrar por orden y continente si se proporcionan 'order' y 'continent'
        filterCountries = filterCountries.filter(
          (country) => country.continent === continent
        );
        if (order === "asc") {
          filterCountries.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === "desc") {
          filterCountries.sort((a, b) => b.name.localeCompare(a.name));
        } else if (order === "lowerPop") {
          filterCountries.sort((a, b) => a.population - b.population);
        } else if (order === "higherPop") {
          filterCountries.sort((a, b) => b.population - a.population);
        }
      }
      
      else if (order && !continent && activity) {
        // Filtrar por orden y actividad si se proporcionan 'order' y 'activity'
        filterCountries = filterCountries.filter((country) =>
          country.Activities.some((act) => act.name === activity)
        );
        if (order === "asc") {
          filterCountries.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === "desc") {
          filterCountries.sort((a, b) => b.name.localeCompare(a.name));
        } else if (order === "lowerPop") {
          filterCountries.sort((a, b) => a.population - b.population);
        } else if (order === "higherPop") {
          filterCountries.sort((a, b) => b.population - a.population);
        }
      }
      
      else if (!order && continent && activity) {
        // Filtrar por continente y actividad si se proporcionan 'continent' y 'activity'
        filterCountries = filterCountries.filter(
          (country) => country.continent === continent
        );
        filterCountries = filterCountries.filter((country) =>
          country.Activities.some((act) => act.name === activity)
        );
      }
      
      else if (order && continent && activity) {
        // Filtrar por orden, continente y actividad si se proporcionan 'order', 'continent' y 'activity'
        filterCountries = filterCountries.filter(
          (country) => country.continent === continent
        );
        filterCountries = filterCountries.filter((country) =>
          country.Activities.some((act) => act.name === activity)
        );
        if (order === "asc") {
          filterCountries.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === "desc") {
          filterCountries.sort((a, b) => b.name.localeCompare(a.name));
        } else if (order === "lowerPop") {
          filterCountries.sort((a, b) => a.population - b.population);
        } else if (order === "higherPop") {
          filterCountries.sort((a, b) => b.population - a.population);
        }
      }

      return dispatch({ type: COMBINED_FILTERS, payload: filterCountries });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};