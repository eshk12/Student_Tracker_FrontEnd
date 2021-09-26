import React from "react";
import {deleteInvitation} from "../../microservices/invitations/invitations";

const DeleteInvitation = ({ history ,match }) => {
    const {id} = match.params;
    if(id < 0){
        history.push('/invitations')
    }else{
        deleteInvitation({id, deleted : true}).then((res) => {
            history.push('/invitations')
        }).catch((e) => {history.push('/invitations')
        })
    }
    return (
        <React.Fragment>

        </React.Fragment>
    )
}
export default DeleteInvitation