import React from "react";
import {deleteDepartment} from "../../microservices/departments/departments";

const DeleteDepartment = props => {
    const {id} = props.match.params;
    if(id < 0){
        props.history.push('/department')
    }else{
        deleteDepartment({id, deleted : true}).then((res) => {
            props.history.push('/departments')
        }).catch((e) => {
            props.history.push('/departments')
        })
    }
    return (
        <React.Fragment>

        </React.Fragment>
    )
}
export default DeleteDepartment