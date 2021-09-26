import React from "react"
import { Link } from "react-router-dom"

const departmentRow = () => [
    {
        text: "מזהה",
        dataField: "id",
        sort: true,
    },
    {
        text: "שם החוג",
        dataField: "name",
        sort: true,
    },
    {
        dataField: "instituteObject",
        text: "מוסד אקדמי",
        sort: true,
        formatter: (cellContent, department) => (
            <>
                {department.instituteObject.name}
            </>
        ),
    },
    {
        dataField: "deleted",
        text: "מצב תצוגה",
        sort: true,
        formatter: (cellContent, department) => (
            <>
                {department.deleted ? 'לא מוצג' : 'מוצג' }
            </>
        ),
    },
    {
        dataField: "menu",
        isDummyField: true,
        text: "פעולות",
        formatter: (cellContent, department) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={"/departments/edit/"+department.id} className="px-2 text-primary"><i className="uil uil-pen font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/departments/delete/"+department.id} className="px-2 text-danger"><i  className="uil uil-trash-alt font-size-18"></i></Link>
                </li>
            </ul>
        ),
    },
]

export default departmentRow
