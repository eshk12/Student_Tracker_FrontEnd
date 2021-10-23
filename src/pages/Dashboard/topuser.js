import React from "react"
import {Alert, Card, CardBody, Table} from "reactstrap"

//Simple bar
import SimpleBar from "simplebar-react"

import {candidateStatus, candidateStatusColors} from "../../helpers/definitions";

const TopUser = ({lastestCandidates, canErrorMsg}) => {
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="float-end">
                        <span className="text-muted">אחרונים</span>
                    </div>
                    <h4 className="card-title mb-4">עדכוני סטודנטים אחרונים</h4>
                    <SimpleBar style={{maxHeight: "336px"}}>
                        {
                            (canErrorMsg !== '')
                                ? <Alert color="warning">{canErrorMsg}</Alert>
                                :
                                <div className="table-responsive">
                                    <Table className="table-borderless table-centered table-nowrap">
                                        <tbody>
                                        {
                                            lastestCandidates.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>
                                                            <h6 className="font-size-15 mb-1 fw-normal">{item.candidateName}</h6>
                                                            <p className="text-muted font-size-13 mb-0">
                                                                <i className="mdi mdi-map-marker"></i>
                                                                חוג
                                                                ל{item.invitationObject.departmentObject.name} במוסד {item.invitationObject.departmentObject.instituteObject.name}
                                                            </p>
                                                        </td>
                                                        <td>
                                                    <span
                                                        className={
                                                            `badge 
                                                            ${
                                                                (item.candidateStatus !== "" && item.candidateStatus !== null)
                                                                    ? candidateStatusColors[item.candidateStatus]
                                                                    : candidateStatusColors[0]
                                                            } font-size-12`}
                                                    >
                                                        {(item.candidateStatus !== "" && item.candidateStatus !== null)
                                                            ? candidateStatus[item.candidateStatus]
                                                            : 'טרם נקבע'}
                                                    </span>
                                                        </td>
                                                        <td className="text-muted fw-semibold text-end">
                                                            18/10/21
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                        </tbody>
                                    </Table>
                                </div>
                        }
                    </SimpleBar>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default TopUser