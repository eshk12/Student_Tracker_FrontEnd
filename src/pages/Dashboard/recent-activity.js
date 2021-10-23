import React from "react"
import {Alert, Card, CardBody} from "reactstrap"
import SimpleBar from "simplebar-react"

const RecentActivity = ({lastestInvitations, invErrorMsg}) => {
    return (
        <Card>
            <CardBody>
                <div className="float-end">
                    <span className="text-muted">אחרונים</span>
                </div>

                <h4 className="card-title mb-4">זימונים אחרונים</h4>
                {
                    (invErrorMsg !== '')
                        ? <Alert color="warning">{invErrorMsg}</Alert>
                        :
                    lastestInvitations.map((item, key) => {
                        return (
                            <SimpleBar className="activity-feed mb-0 ps-2" style={{maxHeight: '336px'}}>
                                <li className="feed-item">
                                    <div className="feed-item-list">
                                        <p className="text-muted mb-1 font-size-13">18/10/2021<small
                                            className="d-inline-block ms-1">בשעה 12:20</small></p>
                                        <p className="mt-0 mb-0">
                                            נוצר זימון חדש בשם "{item.name}" בחוג ל{item.departmentObject.name} בשנת {item.studyYear} וקיימים בו {item.numOfCandidates} מועמדים.
                                        </p>
                                    </div>
                                </li>
                            </SimpleBar>
                        )
                    })
                }

            </CardBody>
        </Card>
    )
}

export default RecentActivity