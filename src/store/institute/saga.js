import {call, put, takeEvery} from "redux-saga/effects";
import {getInstitutes} from "../../microservices/institutes/institutes";
import {
    getInstitutesSuccess,
    getInstitutesFailed
} from "../institute/actions";
import {GET_INSTITUTES} from "./actionTypes";

function* fetchInstitutes() {
    try {
        const response = yield call(getInstitutes)
        if (response.errorCode === 0 && response.errorName === null && response.customMessage === null) { // login succsesful
            yield put(getInstitutesSuccess(response.object));
            yield put(getInstitutesFailed());
        } else {
            yield put(getInstitutesFailed(response.errorName));
        }
    } catch (e) {
        yield put(getInstitutesFailed(e));
    }
}

function* instituteSaga() {
    yield takeEvery(GET_INSTITUTES, fetchInstitutes)
}

export default instituteSaga
