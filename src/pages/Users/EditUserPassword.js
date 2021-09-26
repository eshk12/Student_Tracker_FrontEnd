import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row, Alert, CardTitle, Button} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"


import {editUserPassword, getUserById} from "../../microservices/users/users";
import {AvField, AvForm} from "availity-reactstrap-validation";

const EditUserPassword = props => {
    const {id} = props.match.params;
    const [user, setUser] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => { //act like componentDidMount
        getUserById({id}).then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    props.history.push('/logout')
                } else {
                    setErrorMsg(response.errorName)
                }
            } else {
                setUser(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleValidSubmit = (event, values) => {
        const {id, password, valid_password} = user;
        editUserPassword({
            id,
            password,
            valid_password
        }).then((res) => {
            if (res.errorCode === 0 && res.errorName === null) {
                props.history.push('/users')
            } else {
                setErrorMsg(res.errorName)
            }
        }).catch(e => {
            setErrorMsg('אירעה שגיאה.')
        })
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="StudentTracker" breadcrumbItem="ניהול משתמשים"/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">שינוי סיסמא</CardTitle>
                                    {
                                        (errorMsg === '')
                                            ? (
                                                <AvForm
                                                    onValidSubmit={() => {
                                                        handleValidSubmit()
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
                                                                value={user.id}
                                                            />
                                                        </div>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <label
                                                            htmlFor="example-text-input"
                                                            className="col-md-2 col-form-label"
                                                        >
                                                            דואר אלקטרוני
                                                        </label>
                                                        <div className="col-md-10">
                                                            <AvField
                                                                name="id"
                                                                placeholder="מזהה"
                                                                type="text"
                                                                className="form-control"
                                                                disabled={true}
                                                                value={user.email}
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

                                            )
                                            : (<Alert color="danger">{errorMsg}</Alert>)
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default EditUserPassword