import React, {useEffect, useState} from "react";
import {Alert, Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {getInvitationById} from "../../microservices/invitations/invitations";
import CandidateForm from "./CandidateForm";
import {addCandidate} from "../../microservices/candidates/candidates";
import {toTimestamp} from "../../helpers/api_helper";

const AddCandidate = (props) => {
    const { invitationId } = props.match.params;
    const [errorMsg, setErrorMsg] = useState('')
    const [invitationObject, setInvitationObject] = useState({})
    useEffect(() => { //act like componentDidMount
        getInvitationById({id: invitationId}).then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    props.history.push('/logout')
                } else {
                    setErrorMsg(response.errorName)
                }
            } else {
                setInvitationObject(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleSubmitForm = (data) => {
        addCandidate({
            ...data,
            invitationId,
            scheduleDate: toTimestamp(data.scheduleDate)
        }).then((res) => {
            if (res.errorCode === 0 && res.errorName === null) {
                props.history.push('/invitations/candidates/'+invitationId)
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
                    <Breadcrumbs
                        title="StudentTracker"
                        breadcrumbItem={( errorMsg !== '')
                            ? "הוספת מועמד"
                            : "הוספת מועמד לזימון - "+ invitationObject.name
                        }
                    />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    {errorMsg !== ''

                                        ?
                                            <Alert color="danger">{errorMsg}</Alert>
                                        :
                                            <React.Fragment>
                                                <CardTitle className="h4">הוסף מועמד</CardTitle>
                                                <CandidateForm
                                                    handleSubmitForm={handleSubmitForm}
                                                    history={props.history}
                                                />
                                            </React.Fragment>
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

export default AddCandidate