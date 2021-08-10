import React from "react"
import {Card, CardBody, Table} from "reactstrap"

//Simple bar
import SimpleBar from "simplebar-react"

import avatar4 from "../../assets/images/users/avatar-4.jpg"
import avatar5 from "../../assets/images/users/avatar-5.jpg"
import avatar6 from "../../assets/images/users/avatar-6.jpg"
import avatar7 from "../../assets/images/users/avatar-7.jpg"
import avatar8 from "../../assets/images/users/avatar-8.jpg"

const TopUser = () => {
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="float-end">
                        <span className="text-muted">אחרונים</span>
                    </div>
                    <h4 className="card-title mb-4">עדכוני סטודנטים אחרונים</h4>
                    <SimpleBar style={{maxHeight: "336px"}}>
                        <div className="table-responsive">
                            <Table className="table-borderless table-centered table-nowrap">
                                <tbody>
                                <tr>
                                    <td style={{width: "20px"}}><img src={avatar4} className="avatar-xs rounded-circle "
                                                                     alt="..."/></td>
                                    <td>
                                        <h6 className="font-size-15 mb-1 fw-normal">איציק ברבי</h6>
                                        <p className="text-muted font-size-13 mb-0">
                                            <i className="mdi mdi-map-marker"></i> אשקלון</p>
                                    </td>
                                    <td><span className="badge bg-soft-danger font-size-12">ביטול הרשמה</span></td>
                                    <td className="text-muted fw-semibold text-end">
                                        04/05/2021
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={avatar5} className="avatar-xs rounded-circle " alt="..."/></td>
                                    <td>
                                        <h6 className="font-size-15 mb-1 fw-normal">איציק ברבי</h6>
                                        <p className="text-muted font-size-13 mb-0"><i
                                            className="mdi mdi-map-marker"></i> אשקלון</p>
                                    </td>
                                    <td><span className="badge bg-soft-success font-size-12">ערך מערכת</span></td>
                                    <td className="text-muted fw-semibold text-end">
                                        04/05/2021
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={avatar6} className="avatar-xs rounded-circle " alt="..."/></td>
                                    <td>
                                        <h6 className="font-size-15 mb-1 fw-normal">איציק ברבי</h6>
                                        <p className="text-muted font-size-13 mb-0"><i
                                            className="mdi mdi-map-marker"></i> אשקלון</p>
                                    </td>
                                    <td><span className="badge bg-soft-info font-size-12">יערוך במועד מאוחר יותר</span></td>
                                    <td className="text-muted fw-semibold text-end">
                                        04/05/2021
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={avatar7} className="avatar-xs rounded-circle " alt="..."/></td>
                                    <td>
                                        <h6 className="font-size-15 mb-1 fw-normal">איציק ברבי</h6>
                                        <p className="text-muted font-size-13 mb-0"><i
                                            className="mdi mdi-map-marker"></i> אשדוד</p>
                                    </td>
                                    <td><span className="badge bg-soft-warning font-size-12">מתלבט</span></td>
                                    <td className="text-muted fw-semibold text-end">
                                        04/05/2021
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={avatar8} className="avatar-xs rounded-circle " alt="..."/></td>
                                    <td>
                                        <h6 className="font-size-15 mb-1 fw-normal">איציק ברבי</h6>
                                        <p className="text-muted font-size-13 mb-0"><i
                                            className="mdi mdi-map-marker"></i> אשדוד</p>
                                    </td>
                                    <td><span className="badge bg-soft-info font-size-12">יערוך במועד מאוחר יותר</span></td>
                                    <td className="text-muted fw-semibold text-end">
                                        04/05/2021
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </SimpleBar>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default TopUser