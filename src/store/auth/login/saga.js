import {call, put, takeEvery, takeLatest} from "redux-saga/effects"

// Login Redux States
import {LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN} from "./actionTypes"
import {apiError, loginSuccess} from "./actions"

//Include Both Helper File with needed methods
import {getFirebaseBackend} from "../../../helpers/firebase_helper"
import {
    postSocialLogin,
} from "../../../helpers/fakebackend_helper"
import { postLogin } from '../../../microservices/auth/auth'


function* loginUser({payload: {user, history}}) {
    try {
        const response = yield call(postLogin, {
            email: user.email,
            password: user.password,
        })
        if (response.errorCode === 0 && response.errorName === null && response.object !== null) { // login succsesful
            const {userid, authUser, token, permission} = response.object
            console.log(userid, authUser, token, permission)
            localStorage.setItem('userid', userid);
            localStorage.setItem('authUser', authUser);
            localStorage.setItem('token', token);
            localStorage.setItem('permission', permission);
            yield put(apiError());
            history.push("/dashboard")
        } else {
            yield put(apiError(response.errorName));
        }
    } catch (e) {
        yield put(apiError(e));
    }
}

function* logoutUser({payload: {history}}) {
    try {
        localStorage.removeItem("userid")
        localStorage.removeItem("authUser")
        localStorage.removeItem("token")
        localStorage.removeItem("permission")
        history.push("/login")
    } catch (error) {
        yield put(apiError(error))
    }
}

function* socialLogin({payload: {data, history, type}}) {
    try {
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const fireBaseBackend = getFirebaseBackend()
            const response = yield call(
                fireBaseBackend.socialLoginUser,
                data,
                type,
            )
            localStorage.setItem("authUser", JSON.stringify(response))
            yield put(loginSuccess(response))
        } else {
            const response = yield call(postSocialLogin, data)
            localStorage.setItem("authUser", JSON.stringify(response))
            yield put(loginSuccess(response))
        }
        history.push("/dashboard")
    } catch (error) {
        yield put(apiError(error))
    }
}

function* authSaga() {
    yield takeEvery(LOGIN_USER, loginUser)
    yield takeLatest(SOCIAL_LOGIN, socialLogin)
    yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
