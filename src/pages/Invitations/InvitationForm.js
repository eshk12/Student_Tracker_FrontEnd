import React, {useEffect, useState} from "react"
import {
    Row,
    Button
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import {getDepartments} from "../../microservices/invitations/invitations";
import {ADMIN_PERMISSION, validPermission} from "../../helpers/definitions";


const InvitationForm = ({invitationObject = {}, history, handleSubmitForm}) => {
    const [innerInvitation, setInnerInvitation] = useState({})
    const [departmentList, setDepartmentList] = useState([])
    const [userPermission, setUserPermission] = useState(0)
    useEffect(() => {
        setUserPermission(localStorage.getItem("permission"));
        if (Object.keys(invitationObject).length > 0) // if exists update the state. //UPDATE COMPONENT
        {
            const modifyiedInvitationObject = {
                ...invitationObject,
                departmentId: invitationObject.departmentObject.id
            }
            delete modifyiedInvitationObject.departmentObject;
            setInnerInvitation(modifyiedInvitationObject)
        }
        fetchDepartments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invitationObject.id])
    /* eslint eqeqeq: 0 */
    const fetchDepartments = (id = null) => {
        getDepartments().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    history.push('/logout')
                } else {
                    history.push('/invitations')
                }
            } else {
                setDepartmentList(response.object);
            }
        }).catch((e) => {
            history.push('/invitations')
        });
    }
    const handleValidSubmit = (event, values) => {
        handleSubmitForm(innerInvitation)
    }
    return (
        <React.Fragment>
            <AvForm
                onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                }}
            >
                {invitationObject.id !== undefined &&

                <Row className="mb-3">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                    >
                        מזהה הזימון
                    </label>
                    <div className="col-md-10">
                        <AvField
                            name="id"
                            placeholder="מזהה"
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={innerInvitation.id}
                        />
                    </div>
                </Row>
                }

                <Row className="mb-3">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                    >
                        שם הזימון
                    </label>
                    <div className="col-md-10">
                        <AvField
                            name="name"
                            placeholder="שם הזימון"
                            type="text"
                            errorMessage="ערך חובה"
                            className="form-control"
                            validate={{required: {value: true}}}
                            id="validationCustom03"
                            value={innerInvitation.name}
                            onChange={(e) => {
                                setInnerInvitation({
                                    ...innerInvitation,
                                    name: e.target.value
                                })
                            }}
                        />
                    </div>
                </Row>
                <Row className="mb-3">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                    >
                        שנת לימודים
                    </label>
                    <div className="col-md-10">
                        <AvField
                            name="studyYear"
                            placeholder="שנת לימודים"
                            type="text"
                            errorMessage="ערך מספרי בלבד"
                            className="form-control"
                            validate={{
                                required: {value: true},
                                pattern: {value: '^[0-9]+$'},
                                minLength: {value: 4, errorMessage: 'שנת לימוד מורכבת מ4 ספרות בלבד'},
                                maxLength: {value: 4, errorMessage: 'שנת לימוד מורכבת מ4 ספרות בלבד'},
                            }}
                            id="validationCustom03"
                            value={innerInvitation.studyYear}
                            onChange={(e) => {
                                setInnerInvitation({
                                    ...innerInvitation,
                                    studyYear: e.target.value
                                })
                            }}
                        />
                    </div>
                </Row>
                <Row className="mb-3">
                    <label className="col-md-2 col-form-label">שייך לחוג</label>
                    <div className="col-md-10">
                        <AvField
                            type="select"
                            name="departmentId"
                            validate={{required: {value: true}}}
                            value={innerInvitation.departmentId}
                            errorMessage="ערך חובה"
                            placeholder="שייך לחוג"
                            onChange={(e) => {
                                setInnerInvitation({
                                    ...innerInvitation,
                                    departmentId: e.target.value
                                })
                            }}
                        >
                            <option disabled={true}>בחר חוג</option>
                            {
                                (departmentList).map((department) => {
                                    return <option key={department.id}
                                                   value={department.id}>
                                        {

                                            validPermission(userPermission, ADMIN_PERMISSION)
                                                ? department.instituteObject.name + " - " + department.name
                                                : department.name
                                        }

                                    </option>
                                })
                            }
                        </AvField>

                    </div>
                </Row>

                <Row className="mb-3">
                    <label className="col-md-2 col-form-label">מצב תצוגה</label>
                    <div className="col-md-10">
                        <select
                            value={innerInvitation.deleted}
                            className="form-control"
                            onChange={(e) => {
                                setInnerInvitation({
                                    ...innerInvitation,
                                    deleted: e.target.value
                                })
                            }}
                        >
                            <option disabled={true}>מצב תצוגה</option>
                            <option value={false}>מוצג</option>
                            <option value={true}>לא מוצג</option>
                        </select>
                    </div>
                </Row>
                <Row className="mb-3">
                    <Button color="primary" type="submit">
                        {
                            innerInvitation.id !== undefined
                                ? 'עדכן זימון' : 'הוסף זימון'
                        }
                    </Button>
                </Row>
            </AvForm>
        </React.Fragment>
    )

}

export default InvitationForm