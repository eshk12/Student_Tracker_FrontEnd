import React from "react"
import {Card, CardBody} from "reactstrap"
import SimpleBar from "simplebar-react"

const RecentActivity = () => {
    return (
        <Card>
            <CardBody>
                <div className="float-end">
                    <span className="text-muted">אחרונים</span>
                </div>

                <h4 className="card-title mb-4">זימונים אחרונים</h4>

                <SimpleBar className="activity-feed mb-0 ps-2" style={{maxHeight: '336px'}}>
                    <li className="feed-item">
                        <div className="feed-item-list">
                            <p className="text-muted mb-1 font-size-13">04/05/2021<small className="d-inline-block ms-1">בשעה 12:20</small></p>
                            <p className="mt-0 mb-0">נוצר זימון חדש בחוג למדעי המחשב בשנת תשפ"א ונוספו אליו 40 סטודנטים.</p>
                        </div>
                    </li>
                </SimpleBar>
                <SimpleBar className="activity-feed mb-0 ps-2" style={{maxHeight: '336px'}}>
                    <li className="feed-item">
                        <div className="feed-item-list">
                            <p className="text-muted mb-1 font-size-13">04/05/2021<small className="d-inline-block ms-1">בשעה 12:20</small></p>
                            <p className="mt-0 mb-0">נוצר זימון חדש בחוג לסיעוד בשנת תשפ"א ונוספו אליו 60 סטודנטים.</p>
                        </div>
                    </li>
                </SimpleBar>
                <SimpleBar className="activity-feed mb-0 ps-2" style={{maxHeight: '336px'}}>
                    <li className="feed-item">
                        <div className="feed-item-list">
                            <p className="text-muted mb-1 font-size-13">04/05/2021<small className="d-inline-block ms-1">בשעה 12:20</small></p>
                            <p className="mt-0 mb-0">נוצר זימון חדש בחוג לפסיכולוגיה בשנת תשפ"א ונוספו אליו 30 סטודנטים.</p>
                        </div>
                    </li>
                </SimpleBar>
                <SimpleBar className="activity-feed mb-0 ps-2" style={{maxHeight: '336px'}}>
                    <li className="feed-item">
                        <div className="feed-item-list">
                            <p className="text-muted mb-1 font-size-13">04/05/2021<small className="d-inline-block ms-1">בשעה 12:20</small></p>
                            <p className="mt-0 mb-0">נוצר זימון חדש בחוג לכלכלה בשנת תשפ"א ונוספו אליו 20 סטודנטים.</p>
                        </div>
                    </li>
                </SimpleBar>
            </CardBody>
        </Card>
    )
}

export default RecentActivity