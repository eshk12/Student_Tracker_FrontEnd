import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row, Alert} from "reactstrap"

//
import {Link} from "react-router-dom"
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

//


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import instituteRow from "./instituteRows";

import {getInstitutes} from "../../microservices/institutes/institutes"


const InstitutesList = props => {
    const [institutesList, setInstitutesList] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [errorNum, setErrorNum] = useState('')
    const {SearchBar} = Search

    useEffect(() => { //act like componentDidMount()

        getInstitutes().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    props.history.push('/logout')
                } else {
                    setErrorMsg(response.errorName)
                    setErrorNum(response.errorCode)
                }
            } else {
                setInstitutesList(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pageOptions = {
        sizePerPage: 3,
        totalSize: (!institutesList) ? 0 : institutesList.length,
        custom: true,
    }
    const handleTableChange = (type, {page, searchText}) => {
        setInstitutesList(
            institutesList.filter(institute =>
                Object.keys(institute).some(
                    key =>
                        typeof institute[key] === "string" &&
                        institute[key].toLowerCase().includes(searchText.toLowerCase())
                )
            )
        )
    }

    var selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
    };
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs
                        title="StudentTracker"
                        breadcrumbItem="ניהול מוסדות"
                    />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    {
                                        (errorMsg !== '' && errorNum === 998)
                                            ? <Alert color="danger">{errorMsg}</Alert>
                                            : (
                                                <PaginationProvider
                                                    pagination={paginationFactory(pageOptions)}
                                                >
                                                    {({paginationProps, paginationTableProps}) => (
                                                        <ToolkitProvider
                                                            keyField="id"
                                                            data={institutesList || []}
                                                            columns={instituteRow()}
                                                            bootstrap4
                                                            search
                                                        >
                                                            {toolkitProps => (
                                                                <React.Fragment>
                                                                    <Row className="row mb-2">
                                                                        <Col md={6}>
                                                                            <div className="mb-3">
                                                                                <Link to="/institutes/add"
                                                                                      className="btn btn-success waves-effect waves-light"><i
                                                                                    className="mdi mdi-plus me-2"></i> הוסף
                                                                                    מוסד
                                                                                </Link>
                                                                            </div>
                                                                        </Col>

                                                                        <Col md={6}>
                                                                            <div className="form-inline float-md-end mb-3">
                                                                                <div className="search-box ms-2">
                                                                                    <div className="position-relative">
                                                                                        <SearchBar {...toolkitProps.searchProps} />
                                                                                        <i className="mdi mdi-magnify search-icon"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                    {
                                                                        errorMsg === '' ?
                                                                            <>
                                                                                <Row>
                                                                                    <Col xl="12">
                                                                                        <div className="table-responsive mb-4">
                                                                                            <BootstrapTable
                                                                                                selectRow={selectRowProp}
                                                                                                responsive
                                                                                                remote
                                                                                                bordered={false}
                                                                                                striped={false}
                                                                                                classes={
                                                                                                    "table table-centered table-nowrap mb-0"
                                                                                                }
                                                                                                {...toolkitProps.baseProps}
                                                                                                onTableChange={handleTableChange}
                                                                                                {...paginationTableProps}
                                                                                            />
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                                <div className="float-sm-end">
                                                                                    <PaginationListStandalone
                                                                                        {...paginationProps}
                                                                                    />
                                                                                </div>
                                                                            </>
                                                                            : <Alert color="warning">{errorMsg}</Alert>
                                                                    }
                                                                </React.Fragment>
                                                            )}
                                                        </ToolkitProvider>
                                                    )}
                                                </PaginationProvider>
                                            )
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

export default InstitutesList