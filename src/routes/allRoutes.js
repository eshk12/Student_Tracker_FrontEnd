import React from "react"
import {Redirect} from "react-router-dom"
// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
// Profile
import UserProfile from "../pages/Authentication/user-profile"

import Institutes from "../pages/Institutes/Institute"
import AddInstitute from "../pages/Institutes/AddInstitute"
import EditInstitute from "../pages/Institutes/EditInstitute"
import DeleteInstitute from "../pages/Institutes/DeleteInstitute"
import Invitations from "../pages/Invitations/Invitation"
import Users from "../pages/Users/User";

import AddDepartment from "../pages/Departments/AddDepartment";
import Departments from "../pages/Departments/Deparments"
import EditDepartment from "../pages/Departments/EditDepartment";
import DeleteDepartment from "../pages/Departments/DeleteDepartment";
import AddUser from "../pages/Users/AddUser";
import EditUser from "../pages/Users/EditUser";
import DeleteUser from "../pages/Users/DeleteUser";
import EditUserPassword from "../pages/Users/EditUserPassword";
import AddInvitation from "../pages/Invitations/AddInvitation";
import EditInvitation from "../pages/Invitations/EditInvitation";
import DeleteInvitation from "../pages/Invitations/DeleteInvitation";
import Candidates from "../pages/Candidates/Candidates";
import AddCandidate from "../pages/Candidates/AddCandidate";
import EditCandidate from "../pages/Candidates/EditCandidate";
import DeleteCandidate from "../pages/Candidates/DeleteCandidate";
import AddExcelFileCandidate from "../pages/Candidates/AddExcelFileCandidate";


const userRoutes = [
    {path: "/dashboard", component: Dashboard},


    {path: "/users", component: Users},
    {path: "/users/add/", component: AddUser},
    {path: "/users/edit/:id", component: EditUser},
    {path: "/users/editPassword/:id", component: EditUserPassword},
    {path: "/users/delete/:id", component: DeleteUser},

    {path: "/departments", component: Departments},
    {path: "/departments/add", component: AddDepartment},
    {path: "/departments/edit/:id", component: EditDepartment},
    {path: "/departments/delete/:id", component: DeleteDepartment},

    {path: "/institutes", component: Institutes},
    {path: "/institutes/add", component: AddInstitute},
    {path: "/institutes/edit/:id", component: EditInstitute},
    {path: "/institutes/delete/:id", component: DeleteInstitute},


    {path: "/invitations", component: Invitations},
    {path: "/invitations/add", component: AddInvitation},
    {path: "/invitations/edit/:id", component: EditInvitation},
    {path: "/invitations/delete/:id", component: DeleteInvitation},

    {path: "/invitations/Candidates/:invitationId", component: Candidates},
    {path: "/invitations/Candidates/:invitationId/add", component: AddCandidate},
    {path: "/invitations/Candidates/:invitationId/addExcelFile", component: AddExcelFileCandidate},
    {path: "/invitations/candidates/:invitationId/edit/:candidateId", component: EditCandidate},
    {path: "/invitations/candidates/:invitationId/delete/:candidateId", component: DeleteCandidate},



    // //profile
    {path: "/profile", component: UserProfile},
    // this route should be at the end of all other routes
    {path: "/", exact: true, component: () => <Redirect to="/dashboard"/>},
]

const authRoutes = [
    {path: "/logout", component: Logout},
    {path: "/forgot-password", component: ForgetPwd},
    {path: "/login", component: Login},
]

export {userRoutes, authRoutes}