import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions"

//Include Both Helper File with needed methods


import { postForgetPwd } from '../../../microservices/auth/auth'


//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
      const response = yield call(postForgetPwd,{
        email: user.email
      })
      if (response.errorCode === 0 && response.errorName === null) {
          yield put(
              userForgetPasswordSuccess(
                  response.customMessage
              )
          )
      }else{
          yield put(userForgetPasswordError(response.errorName))
      }

  } catch (error) {
    yield put(userForgetPasswordError('אירעה שגיאה'))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga
