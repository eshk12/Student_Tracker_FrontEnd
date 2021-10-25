import React, {useEffect, useState} from "react"
import {
    Row,
    Col,
    Label,
    Button
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import {isValidIsraelPhoneNumber} from "../../helpers/api_helper";


const InstituteForm = (props) => {
    const {instituteObject = {}} = props // if not exist default value = {}
    const [innerInstitute, setInnerInstitute] = useState({})
    useEffect(() =>{
        if (Object.keys(instituteObject).length > 0) // if exists update the state.
        {
            setInnerInstitute(instituteObject)
        }
    }, [instituteObject])
    const handleValidSubmit = (event, values) => {
        props.handleSubmitForm(innerInstitute)
    }
    return (
        <React.Fragment>
            <AvForm
                onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                }}
            >
                { innerInstitute.id !== undefined &&

                        <Row className="mb-3">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-2 col-form-label"
                            >
                                מזהה המוסד
                            </label>
                            <div className="col-md-10">
                                <AvField
                                    name="id"
                                    placeholder="מזהה"
                                    type="text"
                                    className="form-control"
                                    disabled={true}
                                    value={innerInstitute.id}
                                />
                            </div>
                        </Row>
                }
                <Row className="mb-3">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                    >
                        שם המוסד
                    </label>
                    <div className="col-md-10">
                        <AvField
                            name="name"
                            placeholder="שם המוסד"
                            type="text"
                            errorMessage="ערך חובה"
                            className="form-control"
                            validate={{required: {value: true}}}
                            id="validationCustom03"
                            value={innerInstitute.name}
                            onChange={(e) => { setInnerInstitute({
                                ...innerInstitute,
                                name: e.target.value
                            })}}
                        />
                    </div>
                </Row>
                <Row>
                    <Col md="2">
                        <div className="mb-4">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-4 col-form-label"
                            >
                                כתובת
                            </label>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom03">עיר</Label>
                            <AvField
                                name="city"
                                placeholder="עיר"
                                type="text"
                                errorMessage="אנא הזן עיר תקינה"
                                className="form-control"
                                validate={{required: {value: true}}}
                                id="validationCustom03"
                                value={innerInstitute.city}
                                onChange={(e) => { setInnerInstitute({
                                    ...innerInstitute,
                                    city: e.target.value
                                })}}
                            />
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom04">רחוב</Label>
                            <AvField
                                name="street"
                                placeholder="רחוב"
                                type="text"
                                errorMessage="אנא הזן רחוב תקין"
                                className="form-control"
                                validate={{required: {value: true}}}
                                id="validationCustom04"
                                value={innerInstitute.street}
                                onChange={(e) => { setInnerInstitute({
                                    ...innerInstitute,
                                    street: e.target.value
                                })}}
                            />
                        </div>
                    </Col>
                    <Col md="2">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom05">מספר</Label>
                            <AvField
                                name="number"
                                placeholder="מספר"
                                type="text"
                                errorMessage="אנא הזן מספר תקין"
                                className="form-control"
                                validate={{required: {value: true}}}
                                id="validationCustom05"
                                value={innerInstitute.number}
                                onChange={(e) => { setInnerInstitute({
                                    ...innerInstitute,
                                    number: e.target.value
                                })}}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="2">
                        <div className="mb-4">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-4 col-form-label"
                            >
                                פרטי קשר
                            </label>
                        </div>
                    </Col>
                    <Col md="5">
                        <div className="mb-2">
                            <Label htmlFor="validationCustom03">שם איש קשר</Label>
                            <AvField
                                name="contactName"
                                placeholder="איש קשר"
                                type="text"
                                errorMessage="ערך חובה"
                                className="form-control"
                                validate={{required: {value: true}}}
                                id="validationCustom03"
                                value={innerInstitute.contactName}
                                onChange={(e) => { setInnerInstitute({
                                    ...innerInstitute,
                                    contactName: e.target.value
                                })}}
                            />
                        </div>
                    </Col>
                    <Col md="5">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom04">מספר טלפון</Label>
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
                                            return isValidIsraelPhoneNumber(innerInstitute.phoneNumber)
                                        }
                                    }
                                }
                                id="validationCustom04"
                                value={innerInstitute.phoneNumber}
                                onChange={(e) => { setInnerInstitute({
                                    ...innerInstitute,
                                    phoneNumber: e.target.value
                                })}}
                            />
                        </div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <label className="col-md-2 col-form-label">מצב תצוגה</label>
                    <div className="col-md-10">
                        <select
                            value={innerInstitute.deleted}
                            className="form-control"
                            onChange={(e) => { setInnerInstitute({
                                ...innerInstitute,
                                deleted: e.target.value
                            })}}
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
                            innerInstitute.id !== undefined
                            ? 'עדכן מוסד' : 'הוסף מוסד'
                        }
                    </Button>
                </Row>
            </AvForm>
        </React.Fragment>
    )

}

export default InstituteForm