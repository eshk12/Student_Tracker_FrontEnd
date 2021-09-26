import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react"
import { Row, Col, Alert, Container, CardBody ,Card} from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { userForgetPassword } from "../../store/actions"

// import images
import logo from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import {postForgetPwd} from "../../microservices/auth/auth";
import {isLogged} from "../../helpers/StorageManager";

const ForgetPasswordPage = ({ history }) => {
  const [fpwdForm, setFpwdForm] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [succsessMsg, setSuccsessMsg] = useState('')
  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });
  useEffect(() => {
    if(isLogged()){
      history.push("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(isLogged())
  function handleValidSubmit(event, values) {
    //props.userForgetPassword(values, props.history)
    setErrorMsg('')
    setSuccsessMsg('')
    postForgetPwd(fpwdForm).then((res) => {
      if(res.customMessage !== null){
        //props.history.push("/login")
        setSuccsessMsg(res.customMessage)
      }else{
        setErrorMsg(res.errorName)
      }
    }).catch(() => {
      setErrorMsg('אירעה שגיאה.')
    })
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="mdi mdi-home-variant h2"></i>
        </Link>
      </div>

      <div className="account-pages my-5  pt-sm-5">
        <Container>
          <div className="row justify-content-center">

            <div className="col-md-8 col-lg-6 col-xl-5">
              <div>

                <a href="/" className="mb-5 d-block auth-logo">
                  <img src={logo} alt="" height="100" className="logo logo-dark" />
                  <img src={logolight} alt="" height="100" className="logo logo-light" />
                </a>
                <Card>

                  <CardBody className="p-4">

                    <div className="text-center mt-2">
                      <h5 className="text-primary">איפוס סיסמא</h5>
                      <p className="text-muted">איפוס סיסמא למערכת StudentTracker.</p>
                    </div>
                    <div className="p-2 mt-4">
                      <div className="alert  text-center mb-4" role="alert">
                        הזן כתובת מייל ונשלח אלייך הוראות לאיפוס הסיסמא
                                        </div>
                      {errorMsg && errorMsg !== "" ? (
                        <Alert color="danger" className="text-center mb-4" style={{ marginTop: "13px" }}>
                          {errorMsg}
                        </Alert>
                      ) : null}
                      {succsessMsg && succsessMsg !== "" ? (
                        <Alert color="success" className="text-center mb-4" style={{ marginTop: "13px" }}>
                          {succsessMsg}
                        </Alert>
                      ) : null}

                      <AvForm
                          className="form-horizontal"
                          onValidSubmit={(e, v) => {
                            handleValidSubmit(e, v)
                          }}
                      >
                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="דואר אלקטרוני"
                            className="form-control"
                            errorMessage="אנא הזמן כתובת דואר אלקטרוני תקינה."
                            placeholder="דואר אלקטרוני"
                            type="email"
                            required
                            value={fpwdForm.email}
                            onChange={(e) => { setFpwdForm({
                              ...fpwdForm,
                              email: e.target.value
                            })}}
                          />
                        </div>
                        <Row className="row mb-0">
                          <Col className="col-12 text-end">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              אפס
                          </button>
                          </Col>
                        </Row>
                        <div className="mt-4 text-center">
                          <p className="mb-0">נזכרת בסיסמא?<Link to="/login" className="fw-medium text-primary"> התחבר</Link></p>
                        </div>
                      </AvForm>
                    </div>

                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} StudentTracker. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by BuildNet
                </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.any,
  forgetSuccessMsg: PropTypes.any,
  history: PropTypes.object,
  userForgetPassword: PropTypes.func
}

const mapStatetoProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword
  return { forgetError, forgetSuccessMsg }
}

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword })(ForgetPasswordPage)
)
