
export const ADMIN_PERMISSION = 1;
export const ADMIN_INSTITUTE_PERMISSION = 2;
export const ADMIN_DEPARTMENT_PERMISSION = 3;
export const GUEST_PERMISSION = 4;

export const ADMIN_PERMISSION_TITLE = "מנהל מערכת";
export const ADMIN_INSTITUTE_PERMISSION_TITLE = "מנהל מוסד";
export const ADMIN_DEPARTMENT_PERMISSION_TITLE = "מנהל חוג";
export const GUEST_PERMISSION_TITLE = "אורח";

export const CANDIDATE_SUCCSESSFULLY_INSERTED = "הוזן בהצלחה!"
export const CANDIDATE_UNSUCCSESSFULLY_INSERTED = "נכשל בהזנה!"
export const getPermissionTitle = (permission) => {
    switch (permission){
        case 1:
            return ADMIN_PERMISSION_TITLE
        case 2:
            return ADMIN_INSTITUTE_PERMISSION_TITLE
        case 3:
            return ADMIN_DEPARTMENT_PERMISSION_TITLE
        default:
            return GUEST_PERMISSION_TITLE
    }
}

export const candidateStatus = [
    "טרם נקבע",
    "ערך מערכת",
    "יערוך במועד אחר",
    "מתלבט",
    "ביקש מסלול אחר",
    "ערך במסלול אחר",
    "ביטל הרשמה",
    "אין מענה טלפוני"
];

export const validPermission = (userPermission, requiredPermission) => {
    return userPermission <= requiredPermission;
}
