import React, {useEffect, useState} from "react"
import {
    Row,
    Button, Col
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import {getInstitutes} from "../../microservices/departments/departments";
import {getDepartmentsWithInstituteId} from "../../microservices/departments/departments";
import {validPermission, ADMIN_INSTITUTE_PERMISSION, ADMIN_PERMISSION, getPermissionTitle} from "../../helpers/definitions"
import {isValidIsraeliID, isValidIsraelPhoneNumber} from "../../helpers/api_helper";


const UserForm = (props) => {
    const {userObject = {}} = props // if not exist default value = {}
    const [innerUser, setInnerUser] = useState({})
    const [instituteList, setInstituteList] = useState([])
    const [departmentList, setDepartmentList] = useState([])
    const [permissionArr, setPermissionArr] = useState([1,2,3])
    const [userPermission, setUserPermission] = useState(0)
    useEffect(() => {
        setUserPermission(parseInt(localStorage.getItem("authUser_permission")));
        if (validPermission(localStorage.getItem("authUser_permission"), ADMIN_INSTITUTE_PERMISSION)) {
            getInstitutes().then((response) => {
                if (response.errorCode !== null && response.errorName !== null) {
                    if (response.errorCode === 999) { //invalid token so... logout please.
                        props.history.push('/logout')
                    } else {
                        props.history.push('/users')
                    }
                } else {
                    setInstituteList(response.object)
                }
            }).catch((e) => {
                props.history.push('/users')
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (Object.keys(userObject).length > 0) // if exists update the state. //UPDATE COMPONENT
        {
            const modifyiedUserObject = {
                ...userObject,
                instituteId : userObject.instituteObject.id,
                departmentId : userObject.departmentObject.id
            }
            delete modifyiedUserObject.password;
            delete modifyiedUserObject.instituteObject;
            delete modifyiedUserObject.departmentObject;
            setInnerUser(modifyiedUserObject)
            fetchDepartments(modifyiedUserObject.instituteId)
        }/*else{ //add component
            fetchDepartments()
        }*/
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userObject.id])

    /* eslint eqeqeq: 0 */
    useEffect(() => {
        if(userPermission === ADMIN_INSTITUTE_PERMISSION){
            setPermissionArr([2,3]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userPermission])
    const fetchDepartments = (id = null) => {
        getDepartmentsWithInstituteId(id).then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    props.history.push('/logout')
                } else {
                    //props.history.push('/users')
                    console.log(1)
                }
            } else {
                setDepartmentList(response.object);
            }
        }).catch((e) => {
            props.history.push('/users')
        });
    }

    const handleValidSubmit = (event, values) => {
        props.handleSubmitForm(innerUser)
    }
    return (
        <React.Fragment>
            <AvForm
                onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                }}
            >

                {innerUser.id !== undefined &&

                <Row className="mb-3">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                    >
                        מזהה המשתמש
                    </label>
                    <div className="col-md-10">
                        <AvField
                            name="id"
                            placeholder="מזהה"
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={innerUser.id}
                        />
                    </div>
                </Row>
                }

                <Row>
                    <Col md="2">
                        <div className="mb-4">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-6 col-form-label"
                            >
                                פרטים אישיים
                            </label>
                        </div>
                    </Col>
                    <Col md="2">
                        <div className="mb-3">
                            <AvField
                                name="uid"
                                placeholder="תעודת זהות"
                                type="text"
                                errorMessage="אנא הזן מספר תעודת זהות תקינה."
                                className="form-control"
                                validate={
                                    {
                                        required: {value: true},
                                        isValid: () => {
                                            return isValidIsraeliID(innerUser.uid)
                                        }
                                    }
                                }
                                id="validationCustom03"
                                value={innerUser.uid}
                                onChange={(e) => {
                                    setInnerUser({
                                        ...innerUser,
                                        uid: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="mb-3">
                            <AvField
                                name="firstName"
                                placeholder="שם פרטי"
                                type="text"
                                errorMessage="אנא הזן קלט תקין"
                                className="form-control"
                                validate={{required: {value: true}}}
                                id="validationCustom04"
                                value={innerUser.firstName}
                                onChange={(e) => {
                                    setInnerUser({
                                        ...innerUser,
                                        firstName: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="mb-3">
                            <AvField
                                name="lastName"
                                placeholder="שם משפחה"
                                type="text"
                                errorMessage="אנא הזן קלט תקין"
                                className="form-control"
                                validate={{required: {value: true}}}
                                id="validationCustom05"
                                value={innerUser.lastName}
                                onChange={(e) => {
                                    setInnerUser({
                                        ...innerUser,
                                        lastName: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                {
                    innerUser.id === undefined &&
                    (
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            סיסמא
                        </label>
                        <div className="col-md-10">
                            <AvField
                                name="password"
                                placeholder="סיסמא"
                                type="password"
                                errorMessage="ערך חובה"
                                className="form-control"
                                validate={{
                                    required: {value: true},
                                    minLength: {value: 8, errorMessage: 'הסיסמא חייבת להיות ארוכה מ-8 תווים'},
                                }}

                                id="validationCustom03"
                                value={innerUser.name}
                                onChange={(e) => {
                                    setInnerUser({
                                        ...innerUser,
                                        password: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Row>
                    )
                }
                <Row>
                    <Col md="2">
                        <div className="mb-4">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-6 col-form-label"
                            >
                                פרטי התקשרות
                            </label>
                        </div>
                    </Col>
                    <Col md="5">
                        <div className="mb-3">
                            <AvField
                                name="email"
                                placeholder="דואר אלקטרוני"
                                type="text"
                                errorMessage="אנא הזן דואר אלקטרוני תקין"
                                className="form-control"
                                validate={{
                                    required: {value: true},
                                    email: true
                                }}
                                id="validationCustom03"
                                value={innerUser.email}
                                onChange={(e) => {
                                    setInnerUser({
                                        ...innerUser,
                                        email: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                    <Col md="5">
                        <div className="mb-3">
                            <AvField
                                name="phone"
                                placeholder="מספר פלאפון"
                                type="text"
                                errorMessage="אנא הזן מספר פלאפון תקין"
                                className="form-control"
                                validate={
                                    {
                                        required: {value: true},
                                        validPhone: () => {
                                            return isValidIsraelPhoneNumber(innerUser.phone)
                                        }
                                    }
                                }
                                id="validationCustom04"
                                value={innerUser.phone}
                                onChange={(e) => {
                                    setInnerUser({
                                        ...innerUser,
                                        phone: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                </Row>

                {

                    validPermission(userPermission, ADMIN_PERMISSION) &&
                    <Row className="mb-3">
                        <label className="col-md-2 col-form-label">שייך למוסד</label>
                        <div className="col-md-10">
                            <AvField
                                type="select"
                                name="instituteId"
                                validate={{required: {value: true}}}
                                value={innerUser.instituteId}
                                errorMessage="ערך חובה"
                                placeholder="שייך למוסד"
                                onChange={(e) => {
                                    setInnerUser({
                                        ...innerUser,
                                        instituteId: e.target.value
                                    })
                                    setDepartmentList([])
                                    fetchDepartments(e.target.value)
                                }}
                            >
                                <option value="0">בחר מוסד</option>
                                {
                                    instituteList.map((institute, index) => {
                                        return <option key={institute.id} value={institute.id}>{institute.name}</option>
                                    })
                                }
                            </AvField>

                        </div>
                    </Row>
                }
                <Row className="mb-3">
                    <label className="col-md-2 col-form-label">שייך לחוג</label>
                    <div className="col-md-10">
                        <AvField
                            type="select"
                            name="departmentId"
                            validate={{required: {value: true}}}
                            value={innerUser.departmentId}
                            errorMessage="ערך חובה"
                            placeholder="שייך לחוג"
                            onChange={(e) => {
                                setInnerUser({
                                    ...innerUser,
                                    departmentId: e.target.value
                                })
                            }}
                        >
                            <option value="0">בחר חוג</option>
                            {
                                (departmentList).map((department) => {
                                    return <option key={department.id}
                                                   value={department.id}>{department.name}</option>
                                })
                            }
                        </AvField>

                    </div>
                </Row>
                <Row className="mb-3">
                    <label className="col-md-2 col-form-label">סוג משתמש</label>
                    <div className="col-md-10">
                        <AvField
                            type="select"
                            name="select"
                            validate={{required: {value: true}}}
                            value={innerUser.permission}
                            errorMessage="ערך חובה"
                            placeholder="סוג משתמש"
                            onChange={(e) => {
                                setInnerUser({
                                    ...innerUser,
                                    permission: e.target.value
                                })
                            }}
                        >
                            {
                                permissionArr.map(permission =>
                                    <option key={permission} value={permission}>{getPermissionTitle(permission)}</option>
                                )
                            }

                        </AvField>

                    </div>
                </Row>

                <Row className="mb-3">
                    <label className="col-md-2 col-form-label">מצב תצוגה</label>
                    <div className="col-md-10">
                        <select
                            value={innerUser.deleted}
                            className="form-control"
                            onChange={(e) => {
                                setInnerUser({
                                    ...innerUser,
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
                            innerUser.id !== undefined
                                ? 'עדכן משתמש' : 'הוסף משתמש'
                        }
                    </Button>
                </Row>
            </AvForm>
        </React.Fragment>
    )

}

export default UserForm