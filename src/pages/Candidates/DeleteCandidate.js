import React from "react";
import {deleteCandidate} from "../../microservices/candidates/candidates";

const DeleteCandidate = ({history, match}) => {
    const {invitationId, candidateId} = match.params;
    if (candidateId < 0) {
        history.push('/invitations/candidates/' + invitationId)
    } else {
        deleteCandidate({id: candidateId, deleted: true}).then((res) => {
            history.push('/invitations/candidates/' + invitationId)
        }).catch((e) => {
            history.push('/invitations/candidates/' + invitationId)
        })
    }
    return (
        <React.Fragment>

        </React.Fragment>
    )
}
export default DeleteCandidate