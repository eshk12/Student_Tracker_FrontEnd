import {
    GET_INSTITUTES,
    GET_INSTITUTES_SUCCESS,
    GET_INSTITUTES_FAIL
} from "./actionTypes";

export const getInstitutes = () => ({
    type: GET_INSTITUTES,
})

export const getInstitutesSuccess = (institutes) => ({
    type: GET_INSTITUTES_SUCCESS,
    payload: institutes
})

export const getInstitutesFailed = (msg) => ({
    type: GET_INSTITUTES_FAIL,
    payload: msg
})