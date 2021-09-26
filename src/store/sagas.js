import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import ecommerceSaga from "./e-commerce/saga"
import invoiceSaga from "./invoices/saga"
import institutesSaga from "./institute/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(ecommerceSaga),
    fork(invoiceSaga),
    fork(institutesSaga),
  ])
}
