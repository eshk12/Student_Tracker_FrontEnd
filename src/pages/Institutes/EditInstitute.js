import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row, Alert, CardTitle} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import {editInstitute, getInstitutesById} from "../../microservices/institutes/institutes"
import InstituteForm from "./InstituteForm";

const EditInstitute = props => {
    const {id} = props.match.params;
    const [institute, setInstitute] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => { //act like componentDidMount
        getInstitutesById({id}).then((response) => {
            setInstitute(response)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmitForm = (data) => {
        editInstitute(data).then((res) => {
            if (res.errorCode === 0 && res.errorName === null && res.customMessage === null) {
                props.history.push('/institutes')
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
                    <Breadcrumbs title="StudentTracker" breadcrumbItem="ניהול מוסדות"/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">ערוך מוסד</CardTitle>
                                    {
                                        errorMsg !== '' &&
                                            <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    {
                                        (institute.object !== null)
                                            ? (<InstituteForm
                                                instituteObject={institute.object}
                                                handleSubmitForm={handleSubmitForm}
                                                history={props.history}
                                            />)
                                            : (<Alert color="danger">{institute.errorName}</Alert>)
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

export default EditInstitute