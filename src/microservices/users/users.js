import * as urlDefinitions from "../url_definitions";
import {getRequest, postRequest} from "../httprequest";

export const getUsers = () => getRequest(urlDefinitions.GET_USERS);

export const getUserById = (id) => getRequest(urlDefinitions.GET_USER_BY_ID, {}, id);

export const addUser = (data) => postRequest(urlDefinitions.ADD_USER, {}, {}, data);

export const editUser = (data) => postRequest(urlDefinitions.EDIT_USER, {}, {}, data);

export const editUserPassword = (data) => postRequest(urlDefinitions.EDIT_USER_PASSWORD, {}, {}, data);

export const deleteUser = (data) => postRequest(urlDefinitions.DELETE_USER, {}, {}, data);