import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"
//pass new generated access token here
const token = accessToken

//apply base url for axios
const API_URL = "http://localhost:8801/"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function postFile(url, data, config = {}) {
  return axiosApi
      .post(url, { ...data }, { ...config })
      .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

export const toTimestamp = (strDate) => {
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
