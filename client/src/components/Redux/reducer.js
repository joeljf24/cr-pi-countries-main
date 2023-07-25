import { actionstypes } from "./actions-types";

const initialState = {
    countries: [],
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        default:
        return {...state};
    }
};


export default rootReducer;