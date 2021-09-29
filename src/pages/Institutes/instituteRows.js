import React from "react"
import { Link } from "react-router-dom"

const instituteRow = () => [
    {
        text: "מזהה",
        dataField: "id",
        sort: true,
    },
  {
    text: "שם המוסד",
    dataField: "name",
    sort: true,
  },
  {
    text: "כתובת",
    dataField: "city",
    sort: true,
    formatter: (cellContent, institute) => (
        <>
          {institute.city +' '+ institute.street +' '+ institute.number}
        </>
    ),
  },
  {
    dataField: "contactName",
    text: "איש קשר",
    sort: true,
  },
    {
        dataField: "phoneNumber",
        text: "מספר טלפון",
        sort: true,
    },
    {
        dataField: "deleted",
        text: "מצב תצוגה",
        sort: true,
        formatter: (cellContent, institute) => (
            <>
                {institute.deleted ? 'לא מוצג' : 'מוצג' }
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
            <Link to={"/institutes/edit/"+institute.id} className="px-2 text-primary"><i className="uil uil-pen font-size-18"></i></Link>
          </li>
          <li className="list-inline-item">
              <Link to={"/institutes/delete/"+institute.id} className="px-2 text-danger"><i  className="uil uil-trash-alt font-size-18"></i></Link>
          </li>

        </ul>
    ),
  },
]

export default instituteRow
