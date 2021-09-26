import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row, Alert, CardTitle} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import CandidateForm from "./CandidateForm";
import {editCandidate, getCandidateById} from "../../microservices/candidates/candidates";
import { toTimestamp } from "../../helpers/api_helper"

const EditCandidate = props => {
    const { invitationId, candidateId } = props.match.params;
    const [candidate, setCandidate] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => { //act like componentDidMount
        getCandidateById({id: candidateId}).then((response) => {
            setCandidate(response)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmitForm = (data) => {
        delete data.invitationObject;
        delete data.eventDate;
        delete data.validObject;
        editCandidate({
            ...data,
            id: candidateId,
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
                                        (candidate.object !== null)
                                            ? (<CandidateForm
                                                candidateObject={candidate.object}
                                                handleSubmitForm={handleSubmitForm}
                                                history={props.history}
                                            />)
                                            : (<Alert color="danger">{candidate.errorName}</Alert>)
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

export default EditCandidate