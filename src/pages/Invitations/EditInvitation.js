import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row, Alert, CardTitle} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import InvitationForm from "./InvitationForm";
import {editInvitation, getInvitationById} from "../../microservices/invitations/invitations";

const EditInvitation = props => {
    const {id} = props.match.params;
    const [invitation, setInvitation] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => { //act like componentDidMount
        getInvitationById({id}).then((response) => {
            setInvitation(response)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmitForm = (data) => {
        editInvitation(data).then((res) => {
            if (res.errorCode === 0 && res.errorName === null) {
                props.history.push('/invitations')
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
                    <Breadcrumbs title="StudentTracker" breadcrumbItem="ניהול זימונים"/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">ערוך זימון</CardTitle>
                                    {
                                        errorMsg !== '' &&
                                        <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    {
                                        (invitation.object !== null)
                                            ? (<InvitationForm
                                                invitationObject={invitation.object}
                                                handleSubmitForm={handleSubmitForm}
                                                history={props.history}
                                            />)
                                            : (<Alert color="danger">{invitation.errorName}</Alert>)
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

export default EditInvitation