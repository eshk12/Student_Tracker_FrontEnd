import React, {useEffect, useState} from "react"
import {Container, Row, Col, Alert} from "reactstrap"


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import TopUser from "./topuser"
import RecentActivity from "./recent-activity"
import Widget from "./Widget";
import {
    getLastestCandidates,
    getLastestInvitations,
    getWidgetStatistics
} from "../../microservices/statistics/statistics";

const Dashboard = () => {
    const [statisticList, setStatisticList] = useState([])
    const [lastestInvitations, setLastestInvitations] = useState([])
    const [lastestCandidates, setLastestCandidates] = useState([])

    const [errorMsg, setErrorMsg] = useState('')
    const [errorNum, setErrorNum] = useState('')

    const [widErrorMsg, setWidErrorMsg] = useState('')
    const [widErrorNum, setWidErrorNum] = useState('')
    const [invErrorMsg, setInvErrorMsg] = useState('')
    const [invErrorNum, setInvErrorNum] = useState('')
    const [canErrorMsg, setCanErrorMsg] = useState('')
    const [canErrorNum, setCanErrorNum] = useState('')
    useEffect(() => {
        getWidgetStatistics().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    setWidErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
                } else {
                    setWidErrorMsg(response.errorName)
                    setWidErrorNum(response.errorCode)
                }
            } else {
                setStatisticList(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })
    }, [])

    useEffect(() => {
        getLastestInvitations().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    setInvErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
                } else {
                    setInvErrorMsg(response.errorName)
                    setInvErrorNum(response.errorCode)
                }
            } else {
                setLastestInvitations(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })
        getLastestCandidates().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    setCanErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
                } else {
                    setCanErrorMsg(response.errorName)
                    setCanErrorNum(response.errorCode)
                }
            } else {
                setLastestCandidates(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })
    }, [])
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="StudentTracker" breadcrumbItem="עמוד ראשי"/>
                    {
                        (errorMsg !== '')
                            ? <Alert color="danger">{errorMsg}</Alert>
                            : (
                                <React.Fragment>
                                    <Row>
                                        <Widget statistics={statisticList}/>
                                    </Row>
                                    <Row>
                                        <Col xl={6}>
                                            <TopUser
                                                canErrorMsg={canErrorMsg}
                                                lastestCandidates={lastestCandidates}
                                            />
                                        </Col>
                                        <Col xl={6}>
                                            <RecentActivity
                                                lastestInvitations={lastestInvitations}
                                                invErrorMsg={invErrorMsg}
                                            />
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            )

                    }
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Dashboard