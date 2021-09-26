import React from "react"
import {Link} from "react-router-dom"

const invitationRow = () => [
    {
        text: "מזהה",
        dataField: "id",
        sort: true,
    },
    {
        text: "שם הזימון",
        dataField: "name",
        sort: true
    },
    {
        dataField: "instituteObject",
        text: "מוסד אקדמי",
        sort: true,
        formatter: (cellContent, invitation) => (
            <>
                {invitation.departmentObject.instituteObject.name ? invitation.departmentObject.instituteObject.name : 'טרם נקבע'}
            </>
        ),
    },
    {
        dataField: "departmentObject",
        text: "חוג",
        sort: true,
        formatter: (cellContent, invitation) => (
            <>
                {invitation.departmentObject.name ? invitation.departmentObject.name : 'טרם נקבע'}
            </>
        ),
    },
    {
        dataField: "studyYear",
        text: "שנת לימודים",
        sort: true,
    },
    {
        dataField: "deleted",
        text: "מצב תצוגה",
        sort: true,
        formatter: (cellContent, invitation) => (
            <>
                {invitation.deleted ? 'לא פעיל' : 'פעיל'}
            </>
        ),
    },
    {
        dataField: "menu",
        isDummyField: true,
        text: "פעולות",
        formatter: (cellContent, invitation) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={"/invitations/edit/" + invitation.id} className="px-2 text-body">
                        <i className="uil uil-pen font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/invitations/candidates/" + invitation.id} className="px-2 text-primary">
                        <i className="uil uil-list-ul font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/invitations/delete/" + invitation.id} className="px-2 text-danger">
                        <i className="uil uil-trash-alt font-size-18"></i></Link>
                </li>

            </ul>
        ),
    },
]

export default invitationRow
