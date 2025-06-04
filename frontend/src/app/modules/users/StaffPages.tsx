import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

import { StaffMembersPage } from "./staff/StaffMembersPage";
import { StaffHistoryPage } from "./staff/StaffHistoryPage";
import { StaffHR } from "./staff/StaffHR";
import { StaffAttendance } from "./staff/StaffAttendance";
import { StaffRoles } from "./staff/StaffRoles";
import { SchoolHeader } from "../profile/SchoolHeader";

const profileBreadCrumbs: Array<PageLink> = [
    {
        title: "Staff",
        path: "/people/staff",
        isSeparator: false,
        isActive: false,
    },
    {
        title: "Human Resource",
        path: "/people/hr",
        isSeparator: true,
        isActive: false,
    },
    {
        title: "Staff Attendance",
        path: "/people/attendance",
        isSeparator: true,
        isActive: false,
    },
    {
        title: "Roles & Permissions",
        path: "/people/roles-permissions",
        isSeparator: true,
        isActive: false,
    },
    {
        title: "",
        path: "",
        isSeparator: true,
        isActive: false,
    },
];

const StaffPages = () => (
    <Routes>
        <Route
            element={
                <>
                    <SchoolHeader
                        user_counts={{
                            user_population: 150,
                            user_absent: 10,
                            user_on_site: 140,
                        }}
                        user_info={[
                            {
                                first_name: "John",
                                last_name: "Doe",
                                image: null,
                            },
                            {
                                first_name: "Jane",
                                last_name: "Smith",
                                image: "/path/to/image.jpg",
                            },
                            // ... more users
                        ]}
                        display_strings={{
                            title: "User Management",
                            badge: "Active",
                            description:
                                "Manage all user accounts and permissions",
                            add_user: "Add New User",
                        }}
                    />
                    <Outlet />
                </>
            }
        >
            <Route
                path="view"
                element={
                    <>
                        <PageTitle breadcrumbs={profileBreadCrumbs}>
                            Staff
                        </PageTitle>
                        <StaffMembersPage />
                    </>
                }
            />
            <Route
                path="history"
                element={
                    <>
                        <PageTitle breadcrumbs={profileBreadCrumbs}>
                            Staff History
                        </PageTitle>
                        <StaffHistoryPage />
                    </>
                }
            />
            <Route
                path="hr"
                element={
                    <>
                        <PageTitle breadcrumbs={profileBreadCrumbs}>
                            Human Resource
                        </PageTitle>
                        <StaffHR />
                    </>
                }
            />
            <Route
                path="attendance"
                element={
                    <>
                        <PageTitle breadcrumbs={profileBreadCrumbs}>
                            Staff Attendance
                        </PageTitle>
                        <StaffAttendance />
                    </>
                }
            />
            <Route
                path="roles-permissions"
                element={
                    <>
                        <PageTitle breadcrumbs={profileBreadCrumbs}>
                            Roles & Permissions
                        </PageTitle>
                        <StaffRoles />
                    </>
                }
            />
            <Route
                index
                element={<Navigate to="/crafted/pages/profile/overview" />}
            />
        </Route>
    </Routes>
);

export default StaffPages;
