import React, {useEffect, useState} from "react";
import {Alert, Button, Card, CardBody, CardTitle, Col, Container, Row, Table} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {getInvitationById, uploadCandidateExcelFileWithInvitationId} from "../../microservices/invitations/invitations";
import Dropzone from "react-dropzone"
import {AvForm} from "availity-reactstrap-validation";
import { Link } from "react-router-dom"
import {CANDIDATE_SUCCSESSFULLY_INSERTED, CANDIDATE_UNSUCCSESSFULLY_INSERTED} from "../../helpers/definitions";

const AddExcelFileCandidate = (props) => {
    const { invitationId } = props.match.params;

    const [errorMsg, setErrorMsg] = useState('');
    const [secondaryErrorMsg, setSecondaryErrorMsg] = useState('');
    const [selectedFiles, setselectedFiles] = useState([]);
    const [uploadFile, setUploadFile] = useState([]);
    const [candidateStatus, setCandidateStatus] = useState([]);
    const [invitationObject, setInvitationObject] = useState({})



    useEffect(() => { //act like componentDidMount
        getInvitationById({id: invitationId}).then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    props.history.push('/logout')
                } else {
                    setErrorMsg(response.errorName)
                }
            } else {
                setInvitationObject(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleSubmitForm = () => {
        setSecondaryErrorMsg('');
        setCandidateStatus([]);
        if(uploadFile.length > 0 && selectedFiles.length > 0){
            uploadCandidateExcelFileWithInvitationId({
                file: uploadFile,
                invitationId
            }).then((response) => {
                if (response.errorCode !== null && response.errorName !== null) {
                    if (response.errorCode === 999) { //invalid token so... logout please.
                        props.history.push('/logout')
                    } else {
                        setSecondaryErrorMsg(response.errorName)
                    }
                } else {
                    setCandidateStatus(response.object)
                }
            }).catch(e =>{
                setSecondaryErrorMsg("אירעה שגיאה בהעלאה, אנא נסה מאוחר יותר.")
            }).finally(() => {
                setselectedFiles([])
                setUploadFile([])
            })
        }else{
            setSecondaryErrorMsg("בחר קובץ להעלאה!")
        }
    }

    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )
        setselectedFiles(files)
    }
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs
                        title="StudentTracker"
                        breadcrumbItem={( errorMsg !== '')
                            ? "הוספת מועמד"
                            : "העלאת קובץ מועמדים לזימון - "+ invitationObject.name
                        }
                    />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    {errorMsg !== ''

                                        ?
                                            <Alert color="danger">{errorMsg}</Alert>
                                        :
                                            <React.Fragment>
                                                <CardTitle className="h4">העלה קובץ</CardTitle>
                                                {
                                                    secondaryErrorMsg !== '' &&
                                                         <Alert color="danger">{secondaryErrorMsg}</Alert>
                                                }
                                                {
                                                    candidateStatus.length > 0 &&
                                                    (
                                                        <>
                                                        <Row>
                                                            <Col md={4}>
                                                                <div className="table-responsive">
                                                                    <Table className="table table-sm m-0">
                                                                        <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>שם המועמד</th>
                                                                            <th>מצב הכנסה</th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                            {
                                                                candidateStatus.map(( candidate, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <th scope="row">{index+1}</th>
                                                                            <td>{candidate.candidateName}</td>
                                                                            <td>{candidate.failed ? CANDIDATE_UNSUCCSESSFULLY_INSERTED :  CANDIDATE_SUCCSESSFULLY_INSERTED}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                                <br />
                                                            </Col>
                                                        </Row>
                                                        </>
                                                    )



                                                }

                                                <AvForm
                                                    encType='multipart/form-data'
                                                    onValidSubmit={(e, v) => {
                                                        handleSubmitForm()
                                                    }}
                                                >
                                                    <Row className="mb-3">
                                                        <Dropzone
                                                            onDrop={acceptedFiles => {
                                                                handleAcceptedFiles(acceptedFiles)
                                                                setUploadFile(acceptedFiles)
                                                            }}
                                                            name="file"
                                                        >
                                                            {({ getRootProps, getInputProps }) => (
                                                                <div className="dropzone">
                                                                    <div
                                                                        className="dz-message needsclick"
                                                                        {...getRootProps()}
                                                                    >
                                                                        <input {...getInputProps()  } />
                                                                        <div className="mb-3">
                                                                            <i className="display-4 text-muted uil uil-cloud-upload"/>
                                                                        </div>
                                                                        <h4>זרוק כאן קבצים או לחץ עלי בשביל להעלאות.</h4>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Dropzone>
                                                    </Row>
                                                    <Row>
                                                        <div className="dropzone-previews mt-3" id="file-previews">
                                                            {selectedFiles.map((f, i) => {
                                                                return (
                                                                    <Card
                                                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                        key={i + "-file"}
                                                                    >
                                                                        <div className="p-2">
                                                                            <Row className="align-items-center">
                                                                                <Col className="col-auto">
                                                                                    <img
                                                                                        data-dz-thumbnail=""
                                                                                        height="80"
                                                                                        className="avatar-sm rounded bg-light"
                                                                                        alt={f.name}
                                                                                        src={f.preview}
                                                                                    />
                                                                                </Col>
                                                                                <Col>
                                                                                    <Link
                                                                                        to="#"
                                                                                        className="text-muted font-weight-bold"
                                                                                    >
                                                                                        {f.name}
                                                                                    </Link>
                                                                                    <p className="mb-0">
                                                                                        <strong>{f.formattedSize}</strong>
                                                                                    </p>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    </Card>
                                                                )
                                                            })}
                                                        </div>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Button color="primary" type="submit">
                                                            העלה קובץ
                                                        </Button>
                                                    </Row>
                                                </AvForm>
                                            </React.Fragment>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default AddExcelFileCandidate