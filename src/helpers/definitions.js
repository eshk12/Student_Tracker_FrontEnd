
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

export const registrationState = [
    "טרם נקבע",
    "התקבל",
    "קבלה בתנאי אנגלית",
    "קבלה בתנאי שנה א'"
];

export const candidateStatusColors = [
    "bg-soft-info",
    "bg-soft-success",
    "bg-soft-primary",
    "bg-soft-warning",
    "bg-soft-secondary",
    "bg-soft-secondary",
    "bg-soft-danger",
    "bg-soft-warning",
];

const startYear = 2021;
export const currentYear = new Date().getFullYear();
const endYear = currentYear+5; // current year +5
export const studyYearArr = () => { // will return year range between 2021 - currentYear+5
    let yearArr = [];
    for(let i = startYear;i <endYear;i++){
        yearArr.push(i);
    }
    return yearArr;
}
export const validPermission = (userPermission, requiredPermission) => {
    return userPermission <= requiredPermission;
}
