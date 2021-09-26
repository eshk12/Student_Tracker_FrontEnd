//apply base url for axios
import axios from "axios";
import {storageManager} from "../helpers/StorageManager";

const API_URL = "http://localhost:8801/"
//const API_URL = "http://3.141.85.9:8801/"

const axiosApi = axios.create({
    baseURL: API_URL,
})

let headers = {
    "PARAM_X_AUTH": localStorage.getItem("authUser_token") ? localStorage.getItem("authUser_token") : 'token_not_exists',
    "PARAM_ID_AUTH": localStorage.getItem("authUser_id") ? localStorage.getItem("authUser_id") : 0,
    "Content-Type" : "application/json;charset=UTF-8"
}
export async function getRequest(url, config = {}, params = {}) {
    return await axiosApi.get(
        url,
        {
            ...config,
            headers,
            params
        })
        .then((response) => {
            if( response.data.authUser != null){
                storageManager(response.data.authUser)
            }
            return response.data;
        })

}

export async function postRequest(url, data, config = {}, params = {}, header = {}) {
    return axiosApi
        .post(url,
            {...data},
            {
                ...config,
                headers,
                params})
        .then(response => {
            if( response.data.authUser != null){
                storageManager(response.data.authUser)
            }
            return response.data
        })
}

export async function postFileRequest(url, data, config = {}, params = {}) {
    let bodyFormData = new FormData();
    bodyFormData.append("invitationId", data.invitationId);
    bodyFormData.append("file", data.file[0]);
    headers = {
        ...headers,
        "Content-Type": "multipart/form-data"
    }
    return axiosApi
        .post(url,
            bodyFormData,
            {
                ...config,
                headers,
                params})
        .then(response => {
            if( response.data.authUser != null){
                storageManager(response.data.authUser)
            }
            return response.data
        })
}

export async function putRequest(url, data, config = {}) {
    return axiosApi
        .put(url, {...data}, {...config})
        .then(response => response.data)
}

export async function delRequest(url, config = {}) {
    return await axiosApi
        .delete(url, {...config})
        .then(response => response.data)
}


export const toTimestamp = (strDate) => { //todo reroute the funcntion to here.
    return new Date(strDate).getTime()
}
const months = ["01", "02", "03", "04", "05", "06", "07",
    "08", "09", "10", "11", "12"];

export const toDateView = (strTimestamp, spliter = '/', input = false) => {
    const date = new Date(parseInt(strTimestamp))
    const day = date.getDate() > 9 ? date.getDate() : '0'+date.getDate() ;
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return (input) ? year+spliter+month+spliter+day : day+spliter+month+spliter+year;
}