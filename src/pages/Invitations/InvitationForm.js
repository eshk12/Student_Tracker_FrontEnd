import React, {useEffect, useState} from "react"
import {
    Row,
    Button
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import {getDepartments} from "../../microservices/invitations/invitations";
import {ADMIN_PERMISSION, currentYear, studyYearArr, validPermission} from "../../helpers/definitions";


const InvitationForm = ({invitationObject = {}, history, handleSubmitForm}) => {
    const [innerInvitation, setInnerInvitation] = useState({})
    const [departmentList, setDepartmentList] = useState([])
    const [userPermission, setUserPermission] = useState(0)
    useEffect(() => {
        setUserPermission(localStorage.getItem("authUser_permission"));
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
                        ???????? ????????????
                    </label>
                    <div className="col-md-10">
                        <AvField
                            name="id"
                            placeholder="????????"
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
                        ???? ????????????
                    </label>
                    <div className="col-md-10">
                        <AvField
                            name="name"
                            placeholder="???? ????????????"
                            type="text"
                            errorMessage="?????? ????????"
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
                        ?????? ??????????????
                    </label>
                    <div className="col-md-10">
                        <AvField
                            type="select"
                            name="studyYear"
                            validate={{required: {value: true}}}
                            value={innerInvitation.studyYear}
                            errorMessage="?????? ????????"
                            placeholder="?????? ??????????????"
                            onChange={(e) => {
                                setInnerInvitation({
                                    ...innerInvitation,
                                    studyYear: e.target.value
                                })
                            }}
                        >
                            {
                                studyYearArr().map((year, index) => <option  value={year} key={index}>{year}</option> )
                            }
                        </AvField>
                    </div>
                </Row>
                {
                    innerInvitation.id === undefined &&
                    <Row className="mb-3">
                        <label className="col-md-2 col-form-label">???????? ????????</label>
                        <div className="col-md-10">
                            <AvField
                                type="select"
                                name="departmentId"
                                validate={{required: {value: true}}}
                                value={innerInvitation.departmentId}
                                errorMessage="?????? ????????"
                                placeholder="???????? ????????"
                                onChange={(e) => {
                                    setInnerInvitation({
                                        ...innerInvitation,
                                        departmentId: e.target.value
                                    })
                                }}
                            >
                                <option value="0">?????? ??????</option>
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
                }

                <Row className="mb-3">
                    <label className="col-md-2 col-form-label">?????? ??????????</label>
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
                            <option disabled={true}>?????? ??????????</option>
                            <option value={false}>????????</option>
                            <option value={true}>???? ????????</option>
                        </select>
                    </div>
                </Row>
                <Row className="mb-3">
                    <Button color="primary" type="submit">
                        {
                            innerInvitation.id !== undefined
                                ? '???????? ??????????' : '???????? ??????????'
                        }
                    </Button>
                </Row>
            </AvForm>
        </React.Fragment>
    )

}

export default InvitationForm