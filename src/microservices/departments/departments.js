import * as urlDefinitions from "../url_definitions";
import {getRequest, postRequest} from "../httprequest";

export const getDepartments = () => getRequest(urlDefinitions.GET_DEPARTMENTS);

export const getDepartmentsWithInstituteId = (id) => getRequest(urlDefinitions.GET_DEPARTMENTS_WITH_INSTITUTE_ID, {}, {instituteId: id});

export const getDepartmentById = (id) => getRequest(urlDefinitions.GET_DEPARTMENTS_BY_ID, {} ,id)

export const addDepartment = (data) => postRequest(urlDefinitions.ADD_DEPARTMENT, {}, {}, data);

export const editDepartment = (data) => postRequest(urlDefinitions.EDIT_DEPARTMENT, {}, {}, data);

export const deleteDepartment = (data) => postRequest(urlDefinitions.EDIT_DEPARTMENT, {}, {}, data);

export const getInstitutes = () => getRequest(urlDefinitions.GET_INSTITUTES_DEPARTMENT_PERMISSION);