import React from "react";
import {deleteUser} from "../../microservices/users/users";

const DeleteUser = props => {
    const {id} = props.match.params;
    if(id < 0){
        props.history.push('/users')
    }else{
        deleteUser({id, deleted : true}).then((res) => {
            props.history.push('/users')
        }).catch((e) => {
            props.history.push('/users')
        })
    }
    return (
        <React.Fragment>

        </React.Fragment>
    )
}
export default DeleteUser