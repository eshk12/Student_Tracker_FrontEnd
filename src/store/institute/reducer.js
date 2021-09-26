import {
    GET_INSTITUTES,
    GET_INSTITUTES_SUCCESS,
    GET_INSTITUTES_FAIL
} from "./actionTypes";

const initialState = {
    institutesList: [],
    error: ""
}

const institutesReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_INSTITUTES:
            state = {
                ...state
            }
        break
        case GET_INSTITUTES_SUCCESS:
            state = {
                ...state,
                institutesList: action.payload
            }
        break
        case GET_INSTITUTES_FAIL:
            state = {
                ...state
            }
        break
        default:
            state = { ...state }
        break
    }
    return state
}

export default institutesReducer