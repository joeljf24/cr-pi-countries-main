import {
    GET_COUNTRIES,
    GET_ACTIVITIES,
} from '../actions-types';
import axios from 'axios';

export const getCountries = () => {
    const endpoint = 'http://localhost:3001/countries';

    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            if(!data) throw Error('The countries were not found, check the database');

            return dispatch({
                type: GET_COUNTRIES,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const getActivities = () => {
    const endpoint = 'http://localhost:3001/activities';

    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            if(!data) throw Error('No activities available');

            return dispatch({
                type: GET_ACTIVITIES,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};