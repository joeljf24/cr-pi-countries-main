import {
    GET_COUNTRIES,
    GET_COUNTRIES_BY_ID,
    GET_ACTIVITIES,
} from "../actions-types";
import axios from "axios";

export const getCountries = () => {
    const endpoint = "https://server-yqou.onrender.com/countries";

    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            if(!data) throw Error("The countries were not found, check the database");

            return dispatch({
                type: GET_COUNTRIES,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const getCountriesByName = (name) => {
    const endpoint = "https://server-yqou.onrender.com/countries/name"

    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint, {
            params: {
                name: name,
            },
            });
            return dispatch({
                type: GET_COUNTRIES_BY_ID,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const getActivities = () => {
    const endpoint = "https://server-yqou.onrender.com/activities";

    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            if(!data) throw Error("No activities available");

            return dispatch({
                type: GET_ACTIVITIES,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};