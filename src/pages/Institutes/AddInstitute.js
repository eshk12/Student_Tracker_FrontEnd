import React,{useState} from "react"
import {Alert, Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import  InstituteForm  from "./InstituteForm";
import { addInstitute } from "../../microservices/institutes/institutes";

const AddInstitute = (props) => {
    const [errorMsg, setErrorMsg] = useState('')
    const handleSubmitForm = (data) =>{
        addInstitute(data).then((res) => {
            if(res.errorCode === 0 && res.errorName === null && res.customMessage === null){
                props.history.push('/institutes')
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
                    <Breadcrumbs title="StudentTracker" breadcrumbItem="ניהול מוסדות"/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">הוסף מוסד</CardTitle>
                                    { errorMsg !== '' &&
                                         <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    <InstituteForm
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

export default AddInstitute