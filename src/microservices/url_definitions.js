export const POST_LOGIN = "/authenticate/login"
export const POST_PASSWORD_FORGET = "/authenticate/forgetpwd"


export const GET_INSTITUTES = "/institute/getAllInstitutes"
export const GET_INSTITUTES_BY_ID = "/institute/getInstitute"
export const ADD_INSTITUTE = "/institute/add"
export const EDIT_INSTITUTE = "/institute/update"


export const GET_USERS = "/users/getAllUsers"
export const GET_USER_BY_ID = "/users/getUser"
export const ADD_USER = "/users/add"
export const EDIT_USER = "/users/update"
export const EDIT_USER_PASSWORD = "/users/updateUserPassword"
export const DELETE_USER = "/users/deleteUser"



export const GET_INVITATIONS = "/invitation/getAllInvitations"
export const GET_INVITATION_DEPARTMENTS = "/invitation/getDepartments"
export const ADD_INVITATION = "/invitation/add"
export const GET_INVITATION_BY_ID = "/invitation/getInvitation"
export const EDIT_INVITATION = "/invitation/update"
export const DELETE_INVITATION = "/invitation/deleteInvitation"

export const GET_CANDIDATES_WITH_INVITATION_ID = "/candidate/getCandidatesWithInvitationId"
export const ADD_CANDIDATE = "/candidate/add"
export const GET_CANDIDATE_BY_ID = "/candidate/getCandidate"
export const EDIT_CANDIDATE = "/candidate/update"
export const DELETE_CANDIDATE = "/candidate/deleteCandidate"
export const UPLOAD_CANDIDATE_EXCEL_FILE = "/candidate/uploadxlsx"


export const GET_DEPARTMENTS = "/department/getAllDepartments"
export const GET_DEPARTMENTS_WITH_INSTITUTE_ID = "/department/getAllDepartmentsWithInstituteId"
export const ADD_DEPARTMENT = "/department/add"
export const GET_DEPARTMENTS_BY_ID = "/department/getDepartment"
export const EDIT_DEPARTMENT = "/department/update"
export const GET_INSTITUTES_DEPARTMENT_PERMISSION = "/department/getAllInstitutes"


export const PROFILE_GET_DETAILS = "/profile/getDetails"
export const PROFILE_UPDATE_USER = "/profile/updateUser"
export const PROFILE_UPDATE_PASSWORD = "/profile/updatePassword"