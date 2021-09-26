import {getRequest, postFileRequest, postRequest} from "../httprequest";
import * as urlDefinitions from "../url_definitions";

export const getInvitations = () => getRequest(urlDefinitions.GET_INVITATIONS);

export const getDepartments = () => getRequest(urlDefinitions.GET_INVITATION_DEPARTMENTS);

export const addInvitation = (data) => postRequest(urlDefinitions.ADD_INVITATION, {}, {}, data);

export const getInvitationById = (id) => getRequest(urlDefinitions.GET_INVITATION_BY_ID, {}, id);

export const editInvitation = (data) => postRequest(urlDefinitions.EDIT_INVITATION, {}, {}, data);

export const deleteInvitation = (data) => postRequest(urlDefinitions.DELETE_INVITATION, {}, {}, data);

export const uploadCandidateExcelFileWithInvitationId = (data) => postFileRequest(urlDefinitions.UPLOAD_CANDIDATE_EXCEL_FILE, data);