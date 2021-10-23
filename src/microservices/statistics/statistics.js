import {getRequest} from "../httprequest";
import * as urlDefinitions from "../url_definitions";

export const getWidgetStatistics = () => getRequest(urlDefinitions.STATISTICS_GET_WIDGETS);

export const getLastestInvitations = () => getRequest(urlDefinitions.STATISTICS_GET_LASTEST_INVITATIONS);

export const getLastestCandidates = () => getRequest(urlDefinitions.STATISTICS_GET_LASTEST_CANDIDATES);