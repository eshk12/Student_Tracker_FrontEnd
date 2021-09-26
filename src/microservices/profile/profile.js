import {getRequest, postRequest} from "../httprequest";
import * as urlDefinitions from "../url_definitions";

export const getDetails = () => getRequest(urlDefinitions.PROFILE_GET_DETAILS);

export const updateProfileUser = (data) => postRequest(urlDefinitions.PROFILE_UPDATE_USER, {}, {}, data);

export const editProfileUserPassword = (data) => postRequest(urlDefinitions.PROFILE_UPDATE_PASSWORD, {}, {}, data);