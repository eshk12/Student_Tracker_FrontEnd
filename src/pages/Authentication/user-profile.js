import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
} from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"


//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

// actions
import {editProfileUserPassword, getDetails, updateProfileUser} from "../../microservices/profile/profile";
import {isValidIsraelPhoneNumber} from "../../helpers/api_helper";

const UserProfile = props => {
  const [errorMsg, setErrorMsg] = useState('');
  const [succsessMsg, setSuccsessMsg] = useState('');
  const [profileUser, setProfileUser] = useState({});


  const [errorMsg_password, setErrorMsg_password] = useState('');
  const [succsessMsg_password, setSuccsessMsg_password] = useState('');
  const [user, setUser] = useState({});


  useEffect(() => {
    getDetails().then((response) => {
      if (response.errorCode !== null && response.errorName !== null) {
        if (response.errorCode === 999) { //invalid token so... logout please.
          props.history.push('/logout')
        } else {
          setErrorMsg(response.errorName)
        }
      } else {
        let tmpUser = response.object;
        delete tmpUser.id
        delete tmpUser.deleted
        delete tmpUser.password
        delete tmpUser.token
        delete tmpUser.permission
        delete tmpUser.departmentObject
        delete tmpUser.instituteObject

        setProfileUser(response.object)
      }
    }).catch(() => {
      setErrorMsg("אירעה שגיאה")
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSubmitForm = () =>{
    updateProfileUser(profileUser).then((res) => {
      if(res.errorCode === 0 && res.errorName === null){
        setSuccsessMsg("עודכן בהצלחה!")
      }else{
        setErrorMsg(res.errorName)
      }
    }).catch(e => {
      setErrorMsg('אירעה שגיאה.')
    })
  }

  const handleValidSubmit_password = (event, values) => {
    const {password, valid_password} = user;
    editProfileUserPassword({
      password,
      valid_password
    }).then((res) => {
      if (res.errorCode === 0 && res.errorName === null) {
        setSuccsessMsg_password("הסיסמא שונתה בהצלחה!")
      } else {
        setErrorMsg_password(res.errorName)
      }
    }).catch(e => {
      setErrorMsg_password('אירעה שגיאה.')
    })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="StudentTracker" breadcrumbItem="פרופיל אישי" />


          <Card>
            <CardBody>
              <Row>
                <Col lg="12">
                  {errorMsg && errorMsg !== "" ? (
                      <Alert color="danger">{errorMsg}</Alert>
                  ) : null}
                  {succsessMsg && succsessMsg !== "" ? (
                      <Alert color="success">{succsessMsg}</Alert>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4 className={"h4 card-title"}>עדכון פרטים אישיים</h4>
                </Col>
              </Row>
              <AvForm
                  onValidSubmit={() => {
                    handleSubmitForm()
                  }}
              >
                <Row className="mb-3">
                  <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                  >
                    מזהה המשתמש
                  </label>
                  <div className="col-md-10">
                    <AvField
                        name="id"
                        placeholder="מזהה"
                        type="text"
                        className="form-control"
                        disabled={true}
                        value={profileUser.id}
                    />
                  </div>
                </Row>
                <Row>
                  <Col md="2">
                    <div className="mb-4">
                      <label
                          htmlFor="example-text-input"
                          className="col-md-6 col-form-label"
                      >
                        פרטים אישיים
                      </label>
                    </div>
                  </Col>
                  <Col md="2">
                    <div className="mb-3">
                      <AvField
                          name="uid"
                          placeholder="תעודת זהות"
                          type="text"
                          errorMessage="אנא הזן מספר תעודת זהות תקינה."
                          className="form-control"
                          validate={{required: {value: true}}}
                          id="validationCustom03"
                          value={profileUser.uid}
                          onChange={(e) => {
                            setProfileUser({
                              ...profileUser,
                              uid: e.target.value
                            })
                          }}
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <AvField
                          name="firstName"
                          placeholder="שם פרטי"
                          type="text"
                          errorMessage="אנא הזן קלט תקין"
                          className="form-control"
                          validate={{required: {value: true}}}
                          id="validationCustom04"
                          value={profileUser.firstName}
                          onChange={(e) => {
                            setProfileUser({
                              ...profileUser,
                              firstName: e.target.value
                            })
                          }}
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <AvField
                          name="lastName"
                          placeholder="שם משפחה"
                          type="text"
                          errorMessage="אנא הזן קלט תקין"
                          className="form-control"
                          validate={{required: {value: true}}}
                          id="validationCustom05"
                          value={profileUser.lastName}
                          onChange={(e) => {
                            setProfileUser({
                              ...profileUser,
                              lastName: e.target.value
                            })
                          }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="2">
                    <div className="mb-4">
                      <label
                          htmlFor="example-text-input"
                          className="col-md-6 col-form-label"
                      >
                        פרטי התקשרות
                      </label>
                    </div>
                  </Col>
                  <Col md="5">
                    <div className="mb-3">
                      <AvField
                          name="email"
                          placeholder="דואר אלקטרוני"
                          type="text"
                          errorMessage="אנא הזן דואר אלקטרוני תקין"
                          className="form-control"
                          id="validationCustom03"
                          value={profileUser.email}
                          disabled={true}
                      />
                    </div>
                  </Col>
                  <Col md="5">
                    <div className="mb-3">
                      <AvField
                          name="phone"
                          placeholder="מספר פלאפון"
                          type="text"
                          errorMessage="אנא הזן מספר פלאפון תקין"
                          className="form-control"
                          validate={
                            {
                              required: {value: true},
                              validPhone: () => {
                                return isValidIsraelPhoneNumber(profileUser.phone)
                              }
                            }
                          }
                          id="validationCustom04"
                          value={profileUser.phone}
                          onChange={(e) => {
                            setProfileUser({
                              ...profileUser,
                              phone: e.target.value
                            })
                          }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Button color="primary" type="submit">
                    עדכן פרופיל
                  </Button>
                </Row>
              </AvForm>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Row>
                <Col lg="12">
                  {errorMsg_password && errorMsg_password !== "" ? (
                      <Alert color="danger">{errorMsg_password}</Alert>
                  ) : null}
                  {succsessMsg_password && succsessMsg_password !== "" ? (
                      <Alert color="success">{succsessMsg_password}</Alert>
                  ) : null}
                </Col>
              </Row>
              <AvForm
                  onValidSubmit={() => {
                    handleValidSubmit_password()
                  }}
              >
                <Row>
                  <Col>
                    <h4 className={"h4 card-title"}>עדכון סיסמא</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md="2">
                    <div className="mb-4">
                      <label
                          htmlFor="example-text-input"
                          className="col-md-6 col-form-label"
                      >
                        סיסמא חדשה
                      </label>
                    </div>
                  </Col>
                  <Col md="5">
                    <div className="mb-3">
                      <AvField
                          name="password"
                          placeholder="הזן סיסמא"
                          type="password"
                          errorMessage="אנא הזן סיסמא תקינה."
                          className="form-control"
                          validate={{
                            required: {value: true},
                            minLength: {
                              value: 8,
                              errorMessage: 'הסיסמא חייבת להיות ארוכה מ-8 תווים'
                            },
                          }}
                          id="validationCustom03"
                          onChange={(e) => {
                            setUser({
                              ...user,
                              password: e.target.value
                            })
                          }}
                      />
                    </div>
                  </Col>
                  <Col md="5">
                    <div className="mb-3">
                      <AvField
                          name="valid_password"
                          placeholder="חזור על הסיסמא"
                          type="password"
                          errorMessage="הסיסמאות לא תואמות."
                          className="form-control"
                          validate={{
                            required: {value: true},
                            minLength: {
                              value: 8,
                              errorMessage: 'הסיסמא חייבת להיות ארוכה מ-8 תווים'
                            },
                            passwordValidate: () => {
                              return user.password === user.valid_password
                            }
                          }}
                          id="validationCustom04"
                          onChange={(e) => {
                            setUser({
                              ...user,
                              valid_password: e.target.value
                            })
                          }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Button color="primary" type="submit">
                    עדכן סיסמא
                  </Button>
                </Row>
              </AvForm>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default UserProfile
