import React from "react";
import { deleteInstitute } from "../../microservices/institutes/institutes"

const DeleteInstitute = props => {
    const {id} = props.match.params;
    if(id < 0){
        props.history.push('/institutes')
    }else{
        deleteInstitute({id, deleted : true}).then((res) => {
            props.history.push('/institutes')
        }).catch((e) => {
            props.history.push('/institutes')
        })
    }
    return (
        <React.Fragment>

        </React.Fragment>
    )
}
export default DeleteInstitute