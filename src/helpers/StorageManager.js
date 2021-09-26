export const storageManager = (details => {
    localStorage.setItem("authUser_permission", details.authUser_permission);
    localStorage.setItem("authUser_username", details.authUser_username);
})
export const setStorage = ({authUser_id, authUser_permission, authUser_username, authUser_token}) => {
    localStorage.setItem("authUser_id", authUser_id);
    localStorage.setItem("authUser_permission", authUser_permission);
    localStorage.setItem("authUser_username", authUser_username);
    localStorage.setItem("authUser_token", authUser_token);
}
export const clearStorage =  () => {
    localStorage.removeItem("authUser_id")
    localStorage.removeItem("authUser_permission")
    localStorage.removeItem("authUser_username")
    localStorage.removeItem("authUser_token")
}
export const isLogged = () => {
    return (
        localStorage.getItem("authUser_id") !== null &&
        localStorage.getItem("authUser_permission") !== null &&
        localStorage.getItem("authUser_username") !== null &&
        localStorage.getItem("authUser_token") !== null
    )
}