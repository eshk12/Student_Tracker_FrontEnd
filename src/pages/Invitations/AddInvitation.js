import React, {useState} from "react";
import {Alert, Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import InvitationForm from "./InvitationForm";
import {addInvitation} from "../../microservices/invitations/invitations";

const AddInvitation = (props) => {
    const [errorMsg, setErrorMsg] = useState('')
    const handleSubmitForm = (data) =>{
        addInvitation(data).then((res) => {
            if(res.errorCode === 0 && res.errorName === null){
                props.history.push('/invitations')
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
                    <Breadcrumbs title="StudentTracker" breadcrumbItem="ניהול זימונים"/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">הוסף זימון</CardTitle>
                                    { errorMsg !== '' &&
                                    <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    <InvitationForm
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

export default AddInvitation