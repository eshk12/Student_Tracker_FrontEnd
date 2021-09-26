import React, {useState} from "react";
import {Alert, Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import UserForm from "./UserForm";
import {addUser} from "../../microservices/users/users";

const AddUser = (props) => {
    const [errorMsg, setErrorMsg] = useState('')
    const handleSubmitForm = (data) =>{
        addUser(data).then((res) => {
            if(res.errorCode === 0 && res.errorName === null){
                props.history.push('/users')
            }else{
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
                                    <CardTitle className="h4">הוסף משתמש</CardTitle>
                                    { errorMsg !== '' &&
                                    <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    <UserForm
                                        handleSubmitForm={handleSubmitForm}
                                        history={props.history}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default AddUser