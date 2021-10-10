
import React, {useEffect, useState} from "react"

import { Row, Col, Alert, Container ,CardBody,Card} from "reactstrap"

// Redux
import { connect } from "react-redux"
import {  Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError, socialLogin } from "../../store/actions"

// import images
import logo from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import {postLogin} from "../../microservices/auth/auth";
import {isLogged, setStorage} from "../../helpers/StorageManager";

const Login = ({ history }) => {
  const [loginForm, setLoginForm] = useState({})
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if(isLogged()){
      history.push("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
   // handleValidSubmit
  const handleValidSubmit = () => {
    //props.loginUser(values, props.history)
    postLogin(loginForm).then((res) => {
      if(res.errorCode === 0  && res.object.token !== '' && res.object.authUser_id > 0){
        setStorage(res.object)
        history.push("/dashboard")
      }else{
        setErrorMsg(res.errorName)
      }
    }).catch(() => {
      setErrorMsg('אירעה שגיאה.')
    })
  }
  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="mdi mdi-home-variant h2"></i>
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <Link to="/" className="mb-5 d-block auth-logo">
                  <img src={logo} alt="" height="100" className="logo logo-dark" />
                  <img src={logolight} alt="" height="100" className="logo logo-light" />
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>

                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">ברוך הבא</h5>
                    <p className="text-muted">אנא הזן פרטים כדי להתחבר למערכת</p>
                  </div>
                  <div className="p-2 mt-4">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >

                      {errorMsg && errorMsg !== "" ? (
                        <Alert color="danger">{errorMsg}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="דואר אלקטרוני"
                          className="form-control"
                          placeholder="דואר אלקטרוני"
                          errorMessage="אנא הזן כתובת דואר אלקטרוני תקינה."
                          type="email"
                          required
                          value={loginForm.email}
                          onChange={(e) => { setLoginForm({
                            ...loginForm,
                            email: e.target.value
                          })}}
                        />
                      </div>

                      <div className="mb-3">
                      <div className="float-end">
                          <Link to="/forgot-password" className="text-muted">שכחת את הסיסמא?</Link>
                        </div>
                        <AvField
                          name="password"
                          label="סיסמא"
                          type="password"
                          errorMessage="הזן את הסיסמא שלך."
                          required
                          placeholder="סיסמא"
                          value={loginForm.password}
                          onChange={(e) => { setLoginForm({
                            ...loginForm,
                            password: e.target.value
                          })}}
                        />
                      </div>
                      <div className="mt-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          התחבר
                        </button>
                      </div>
                    </AvForm>

                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>© {new Date().getFullYear()} StudentTracker. Crafted with <i
                  className="mdi mdi-heart text-danger"></i> by BuildNet
                        </p>
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default Login

