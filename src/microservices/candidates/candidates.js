import {getRequest, postRequest} from "../httprequest";
import * as urlDefinitions from "../url_definitions";

export const getCandidateWithInvitationId = (id) => getRequest(urlDefinitions.GET_CANDIDATES_WITH_INVITATION_ID, {}, {invitationId: id});

export const addCandidate = (data) => postRequest(urlDefinitions.ADD_CANDIDATE, {}, {}, data);

export const getCandidateById = (id) => getRequest(urlDefinitions.GET_CANDIDATE_BY_ID, {}, id);

export const editCandidate = (data) => postRequest(urlDefinitions.EDIT_CANDIDATE, {}, {}, data);

export const deleteCandidate = (data) => postRequest(urlDefinitions.DELETE_CANDIDATE, {}, {}, data);