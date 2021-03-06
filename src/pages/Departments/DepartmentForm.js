import React, {useEffect, useState} from "react"
import {
    Row,
    Button
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import {getInstitutes} from "../../microservices/institutes/institutes";



const DepartmentForm = (props) => {
    const {departmentObject = {}} = props // if not exist default value = {}
    const [innerDepartment, setInnerDepartment] = useState({})
    const [instituteList, setInstituteList] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() =>{
        if (Object.keys(departmentObject).length > 0) // if exists update the state.
        {
            const modifyiedDepartmentObject = {
                ...departmentObject,
                instituteId : departmentObject.instituteObject.id
            }
            setInnerDepartment(modifyiedDepartmentObject)
        }
    }, [departmentObject])

    /* eslint eqeqeq: 0 */
    useEffect(() => {
        if(localStorage.getItem("authUser_permission") == 1){ //admin permission
            setIsAdmin(true);
            getInstitutes().then((response) => {
                if (response.errorCode !== null && response.errorName !== null) {
                    if (response.errorCode === 999 || response.authUser.permission !== 1) { //invalid token so... logout please.
                        setIsAdmin(false);
                        props.history.push('/logout')
                    }else if(response.errorCode === 998){
                        props.history.push('/dashboard')
                        setIsAdmin(false);
                    } else {
                        props.history.push('/dashboard')
                    }
                } else {
                    setInstituteList(response.object)
                }
            }).catch((e) => {
                props.history.push('/departments')
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleValidSubmit = (event, values) => {
        props.handleSubmitForm(innerDepartment)
    }
    return (
        <React.Fragment>
            <AvForm
                onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                }}
            >
                { innerDepartment.id !== undefined &&

                        <Row className="mb-3">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-2 col-form-label"
                            >
                                ???????? ????????
                            </label>
                            <div className="col-md-10">
                                <AvField
                                    name="id"
                                    placeholder="????????"
                                    type="text"
                                    className="form-control"
                                    disabled={true}
                                    value={innerDepartment.id}
                                />
                            </div>
                        </Row>
                }
                <Row className="mb-3">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                    >
                        ???? ????????
                    </label>
                    <div className="col-md-10">
                        <AvField
                            name="name"
                            placeholder="???? ????????"
                            type="text"
                            errorMessage="?????? ????????"
                            className="form-control"
                            validate={{required: {value: true}}}
                            id="validationCustom03"
                            value={innerDepartment.name}
                            onChange={(e) => { setInnerDepartment({
                                ...innerDepartment,
                                name: e.target.value
                            })}}
                        />
                    </div>
                </Row>
                {
                    isAdmin &&
                    <Row className="mb-3">
                        <label className="col-md-2 col-form-label">???????? ??????????</label>
                        <div className="col-md-10">
                            <AvField
                                type="select"
                                name="select"
                                validate={{required: {value: true}}}
                                value={innerDepartment.instituteId}
                                errorMessage="?????? ????????"
                                placeholder="???????? ??????????"
                                    onChange={(e) => { setInnerDepartment({
                                    ...innerDepartment,
                                    instituteId: e.target.value
                                })}}
                            >
                                <option value="0">?????? ????????</option>
                                {
                                    instituteList.map((institute) => {
                                        return <option key={institute.id} value={institute.id}>{institute.name}</option>
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
                            value={innerDepartment.deleted}
                            className="form-control"
                            placeholder="?????? ??????????"
                            onChange={(e) => { setInnerDepartment({
                                ...innerDepartment,
                                deleted: e.target.value
                            })}}

                        >
                            <option value={false}>????????</option>
                            <option value={true}>???? ????????</option>
                        </select>
                    </div>
                </Row>
                <Row className="mb-3">
                    <Button color="primary" type="submit">
                        {
                            innerDepartment.id !== undefined
                            ? '???????? ??????' : '???????? ??????'
                        }
                    </Button>
                </Row>
            </AvForm>
        </React.Fragment>
    )

}

export default DepartmentForm