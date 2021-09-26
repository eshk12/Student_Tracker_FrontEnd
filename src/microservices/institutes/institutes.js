import * as urlDefinitions from "../url_definitions";
import {getRequest, postRequest} from "../httprequest";

export const getInstitutes = () => getRequest(urlDefinitions.GET_INSTITUTES);

export const getInstitutesById = (id) => getRequest(urlDefinitions.GET_INSTITUTES_BY_ID, {} ,id)

export const addInstitute = (data) => postRequest(urlDefinitions.ADD_INSTITUTE, {}, {}, data);

export const editInstitute = (data) => postRequest(urlDefinitions.EDIT_INSTITUTE, {}, {}, data);

export const deleteInstitute = (data) => postRequest(urlDefinitions.EDIT_INSTITUTE, {}, {}, data);


