import {postRequest} from "../httprequest";
import * as urlDefinitions from "../url_definitions";

export const postLogin = (data) => postRequest(urlDefinitions.POST_LOGIN, {}, {}, data)

export const postForgetPwd = data => postRequest(urlDefinitions.POST_PASSWORD_FORGET, {}, {},  data)
