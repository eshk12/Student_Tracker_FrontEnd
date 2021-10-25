import React, {useEffect, useState} from "react"
import {
    Row,
    Button, Col, Label
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import {candidateStatus, registrationState} from "../../helpers/definitions";
import {isValidIsraeliID, isValidIsraelPhoneNumber, toDateView} from "../../helpers/api_helper";


const CandidateForm = ({candidateObject = {}, history, handleSubmitForm}) => {
    const [innerCandidate, setInnerCandidate] = useState({})
    //const [userPermission, setUserPermission] = useState(0) //if something got wrong its because of this.
    useEffect(() => {
        //setUserPermission(localStorage.getItem("permission"));
        if (Object.keys(candidateObject).length > 0) // if exists update the state. //UPDATE COMPONENT
        {
            const scheduleDate = toDateView(candidateObject.scheduleDate, '-', true)
            const modifyiedCandidateObject = {
                ...candidateObject,
                scheduleDate
            }
            setInnerCandidate(modifyiedCandidateObject)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [candidateObject.id])
    /* eslint eqeqeq: 0 */
    const handleValidSubmit = (event, values) => {
        handleSubmitForm(innerCandidate)
    }
    return (
        <React.Fragment>
            <AvForm
                onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                }}
            >
                {candidateObject.id !== undefined &&

                <Row className="mb-3">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                    >
                        מזהה המועמד
                    </label>
                    <div className="col-md-10">
                        <AvField
                            name="id"
                            placeholder="מזהה"
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={innerCandidate.id}
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
                    <Col md="5">
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
                                            return isValidIsraeliID(innerCandidate.uid)
                                        }
                                    }
                                }

                                id="validationCustom03"
                                value={innerCandidate.uid}
                                onChange={(e) => {
                                    setInnerCandidate({
                                        ...innerCandidate,
                                        uid: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                    <Col md="5">
                        <div className="mb-3">
                            <AvField
                                name="candidateName"
                                placeholder="שם מלא"
                                type="text"
                                errorMessage="אנא הזן קלט תקין"
                                className="form-control"
                                validate={
                                    {
                                        required: {value: true},
                                        pattern: {value: '^[א-ת ]+$'},
                                    }
                                }
                                id="validationCustom04"
                                value={innerCandidate.candidateName}
                                onChange={(e) => {
                                    setInnerCandidate({
                                        ...innerCandidate,
                                        candidateName: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                </Row>
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
                                type="email"
                                errorMessage="אנא הזו כתובת דואר אלקטרוני תקינה."
                                className="form-control"
                                validate={
                                    {
                                        required: {value: true}
                                    }
                                }

                                id="validationCustom03"
                                value={innerCandidate.email}
                                onChange={(e) => {
                                    setInnerCandidate({
                                        ...innerCandidate,
                                        email: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                    <Col md="5">
                        <div className="mb-3">
                            <AvField
                                name="phoneNumber"
                                placeholder="מספר פלאפון"
                                type="text"
                                errorMessage="אנא הזן מספר פלאפון תקין"
                                className="form-control"
                                validate={
                                    {
                                        required: {value: true},
                                        validPhone: () => {
                                            return isValidIsraelPhoneNumber(innerCandidate.phoneNumber)
                                        }
                                    }
                                }
                                id="validationCustom04"
                                value={innerCandidate.phoneNumber}
                                onChange={(e) => {
                                    setInnerCandidate({
                                        ...innerCandidate,
                                        phoneNumber: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="2">
                        <div className="mb-4">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-6 col-form-label"
                            >
                                פרטי הרשמה
                            </label>
                        </div>
                    </Col>
                    <Col md="2">
                        <Label htmlFor="validationCustom05">תאריך עריכת מערכת</Label>
                        <AvField
                            name="scheduleDate"
                            type="date"
                            placeholder=""
                            value={parseInt(innerCandidate.scheduleDate) > 0 ? innerCandidate.scheduleDate : null}
                            onChange={(e) => {
                                setInnerCandidate({
                                    ...innerCandidate,
                                    scheduleDate: e.target.value
                                })
                            }}
                        />

                    </Col>
                    <Col md="4">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom05">מצב הרשמה</Label>
                            <AvField
                                type="select"
                                name="registerationState"
                                value={innerCandidate.registerationState}
                                placeholder="מצב הרשמה"
                                onChange={(e) => {
                                    setInnerCandidate({
                                        ...innerCandidate,
                                        registerationState: e.target.value
                                    })
                                }}
                            >
                                {
                                    registrationState.map((status, key) => {
                                        return <option key={key} value={key}>{status}</option>
                                    })
                                }
                            </AvField>
                            {/*<AvField
                                name="registerationState"
                                placeholder="מצב הרשמה"
                                type="text"
                                id="validationCustom04"
                                value={innerCandidate.registerationState || ""}
                                onChange={(e) => {
                                    setInnerCandidate({
                                        ...innerCandidate,
                                        registerationState: e.target.value
                                    })
                                }}
                            />*/}
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom05">סטטוס</Label>
                            <AvField
                                type="select"
                                name="candidateStatus"
                                value={innerCandidate.candidateStatus || ""}
                                placeholder="סטטוס"
                                onChange={(e) => {
                                    setInnerCandidate({
                                        ...innerCandidate,
                                        candidateStatus: e.target.value
                                    })
                                }}
                            >
                                {
                                    candidateStatus.map((status, key) => {
                                        return <option key={key} value={key}>{status}</option>
                                    })
                                }
                            </AvField>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <label className="col-md-2 col-form-label">הערות</label>
                    <div className="col-md-10">
                        <AvField
                            type="textarea"
                            name="comment"
                            placeholder="הערות"
                            value={innerCandidate.comment || ""}
                            onChange={(e) => {
                                setInnerCandidate({
                                    ...innerCandidate,
                                    comment: e.target.value
                                })
                            }}
                        />
                    </div>
                </Row>

                <Row className="mb-3">
                    <label className="col-md-2 col-form-label">מצב תצוגה</label>
                    <div className="col-md-10">
                        <select
                            value={innerCandidate.deleted}
                            className="form-control"
                            onChange={(e) => {
                                setInnerCandidate({
                                    ...innerCandidate,
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
                            innerCandidate.id !== undefined
                                ? 'עדכן מועמד' : 'הוסף מועמד'
                        }
                    </Button>
                </Row>
            </AvForm>
        </React.Fragment>
    )

}

export default CandidateForm