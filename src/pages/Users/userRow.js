import React from "react"
import {Link} from "react-router-dom"
import { getPermissionTitle } from "../../helpers/definitions"



const userRow = () => [
    {
        text: "מזהה",
        dataField: "id",
        sort: true,
    },
    {
        text: "שם מלא",
        dataField: "name",
        sort: true,
        formatter: (cellContent, user) => (
            <>
                {user.firstName + ' ' + user.lastName}
            </>
        ),
    },
    {
        dataField: "phone",
        text: "מספר טלפון",
        sort: true,
    },
    {
        dataField: "instituteObject",
        text: "מוסד אקדמי",
        sort: true,
        formatter: (cellContent, user) => (
            <>
                {user.instituteObject.name ? user.instituteObject.name : 'טרם נקבע'}
            </>
        ),
    },
    {
        dataField: "departmentObject",
        text: "חוג",
        sort: true,
        formatter: (cellContent, user) => (
            <>
                {user.departmentObject.name ? user.departmentObject.name : 'טרם נקבע'}
            </>
        ),
    },
    {
        dataField: "permission",
        text: "סוג משתמש",
        sort: true,
        formatter: (cellContent ,user) => (
            <>
                { getPermissionTitle(user.permission) }
            </>
        )
    },
    {
        dataField: "deleted",
        text: "מצב חשבון",
        sort: true,
        formatter: (cellContent, user) => (
            <>
                {user.deleted ? 'לא פעיל' : 'פעיל'}
            </>
        ),
    },
    {
        dataField: "menu",
        isDummyField: true,
        text: "פעולות",
        formatter: (cellContent, institute) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={"/users/edit/" + institute.id} className="px-2 text-primary"><i
                        className="uil uil-pen font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/users/editPassword/" + institute.id} className="px-2 text-primary"><i
                        className="uil uil-unlock font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/users/delete/" + institute.id} className="px-2 text-danger"><i
                        className="uil uil-trash-alt font-size-18"></i></Link>
                </li>

            </ul>
        ),
    },
]

export default userRow
