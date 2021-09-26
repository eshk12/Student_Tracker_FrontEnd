import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row, Alert, CardTitle} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { getDepartmentById, editDepartment } from "../../microservices/departments/departments";
import DepartmentForm from "./DepartmentForm";

const EditDepartment = props => {
    const {id} = props.match.params;
    const [department, setDepartment] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => { //act like componentDidMount
        getDepartmentById({id}).then((response) => {
            setDepartment(response)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmitForm = (data) => {
        delete data.instituteObject
        editDepartment(data).then((res) => {
            if (res.errorCode === 0 && res.errorName === null && res.customMessage === null) {
                props.history.push('/departments')
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
                    <Breadcrumbs title="StudentTracker" breadcrumbItem="ניהול חוגים"/>
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
                                        (department.object !== null)
                                            ? (<DepartmentForm
                                                departmentObject={department.object}
                                                handleSubmitForm={handleSubmitForm}
                                                history={props.history}
                                            />)
                                            : (<Alert color="danger">{department.errorName}</Alert>)
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

export default EditDepartment