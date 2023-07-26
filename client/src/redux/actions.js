import { GET_ACTIVITIES, GET_COUNTRIES } from './actions-types';
import axios from 'axios';

export const getCountries = () => {
    const endpoint = 'http://localhost:3001/countries';

    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)

            if(!data) throw Error('The countries were not found, check the database')

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
            const { data } = await axios.get(endpoint)

            if(!data) throw Error('No activities available')

            return dispatch({
                type: GET_ACTIVITIES,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};

// export const addFav = (character) => {
//     const endpoint = 'http://localhost:3001/rickandmorty/fav';
//         return async (dispatch) => {
//             try {
//                 const { data } = await axios.post(endpoint, character);
                
//                 if(!data.length) throw Error('No hay favoritos')
    
//                 return dispatch({
//                     type: ADD_FAV,
//                     payload: data,
//                 });
//             } catch (error) {
//                 console.log(error.message);
//             }
                
//         };
//     }
    
//     export const removeFav = (id) => {
//         const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;
//         return async (dispatch) => {
//             try {
//                 const { data } = await axios.delete(endpoint);
    
//                 return dispatch({
//                     type: REMOVE_FAV,
//                     payload: data,
//                 });
//             } catch (error) {
//                 console.log(error.message);
//             }
//         };
//     }
    
//     export const filterCards = (gender) => {
//         return { type: FILTER, payload: gender}
//     }
    
//     export const orderCards = (order) => {
//         return { type: ORDER, payload: order}
//     }