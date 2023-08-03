import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_ID,
  GET_ACTIVITIES,
  SET_ORDER,
  SET_FILTER_CONTINENT,
  SET_FILTER_ACTIVITY,
  COMBINED_FILTERS,
} from "./actions-types";

const initialState = {
  allCountries: [],
  countries: [],
  activities: [],
  order: "",
  filterContinent: "",
  filterActivity: "",
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: payload,
        countries: payload,
      };

    case GET_COUNTRIES_BY_ID:
      return {
        ...state,
        countries: payload,
      }

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
      };

    case SET_ORDER:
      return {
        ...state,
        order: payload,
      };

    case SET_FILTER_CONTINENT:
      return {
        ...state,
        filterContinent: payload,
      };

    case SET_FILTER_ACTIVITY:
      return {
        ...state,
        filterActivity: payload,
      };

    case COMBINED_FILTERS:
      return {
        ...state,
        countries: payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;