import React from "react"
import {Link} from "react-router-dom"
import { toDateView } from "../../helpers/api_helper"
import {candidateStatus, registrationState} from "../../helpers/definitions";

const userRow = () => [
    {
        text: "תעודת זהות",
        dataField: "uid",
        sort: true,
    },
    {
        text: "שם המועמד",
        dataField: "candidateName",
        sort: true,
    },
    {
        dataField: "candidateStatus",
        text: "סטטוס",
        sort: true,
        formatter: (cellContent, candidate) => {
            return candidate.candidateStatus == undefined || candidate.candidateStatus === ''  ? 'טרם נקבע' : candidateStatus[candidate.candidateStatus] ;
        }
    },
    {
        dataField: "registerationState",
        text: "מצב הרשמה",
        sort: true,
        formatter: (cellContent, candidate) => {
            return candidate.registerationState == undefined || candidate.registerationState === ''  ? 'טרם נקבע' : registrationState[candidate.registerationState] ;
        }
    },

    {
        dataField: "scheduleDate",
        text: "תאריך עריכת מערכת",
        sort: true,
        formatter: (cellContent, candidate) => {
            if(parseInt(candidate.scheduleDate) > 0){
                return toDateView(candidate.scheduleDate)
            }else{
                return "טרם ערך"
            }

        }
    },
    {
        dataField: "eventDate",
        text: "תאריך הוספה",
        sort: true,
        formatter: (cellContent, candidate) => {
            return toDateView(candidate.eventDate)
        }
    },
    {
        dataField: "comment",
        text: "הערות",
        sort: true,
        formatter: (cellContent, candidate) => {
            return candidate.comment == undefined || candidate.comment === ''  ? '-' : candidate.comment ;
        }
    },
    {
        dataField: "menu",
        isDummyField: true,
        text: "פעולות",
        formatter: (cellContent, candidate) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={"/invitations/candidates/"+candidate.invitationObject.id+"/edit/"+candidate.id} className="px-2 text-primary"><i
                        className="uil uil-pen font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/invitations/candidates/"+candidate.invitationObject.id+"/delete/"+candidate.id} className="px-2 text-danger"><i
                        className="uil uil-trash-alt font-size-18"></i></Link>
                </li>

            </ul>
        ),
    },
]

export default userRow
