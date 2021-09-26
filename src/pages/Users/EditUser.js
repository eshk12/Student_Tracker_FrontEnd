import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row, Alert, CardTitle} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import UserForm from "./UserForm";
import {editUser, getUserById} from "../../microservices/users/users";

const EditUser = props => {
    const {id} = props.match.params;
    const [user, setUser] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => { //act like componentDidMount
        getUserById({id}).then((response) => {
            setUser(response)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmitForm = (data) => {
        delete data.token
        editUser(data).then((res) => {
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
                                    <CardTitle className="h4">ערוך משתמש</CardTitle>
                                    {
                                        errorMsg !== '' &&
                                        <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    {
                                        (user.object !== null)
                                            ? (<UserForm
                                                userObject={user.object}
                                                handleSubmitForm={handleSubmitForm}
                                                history={props.history}
                                            />)
                                            : (<Alert color="danger">{user.errorName}</Alert>)
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

export default EditUser