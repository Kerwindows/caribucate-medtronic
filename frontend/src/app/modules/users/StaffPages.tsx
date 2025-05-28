import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

import { StaffMembersPage } from "./StaffMembersPage";
import { StaffHistoryPage } from "./StaffHistoryPage";
import { ProfileHeader } from "../profile/ProfileHeader";

const profileBreadCrumbs: Array<PageLink> = [
    {
        title: "Staff",
        path: "/people/staff",
        isSeparator: false,
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
                    <ProfileHeader />
                    <Outlet />
                </>
            }
        >
            <Route path="view"
                element={
                    <>
                        <PageTitle breadcrumbs={profileBreadCrumbs}>
                            Staff
                        </PageTitle>
                        <StaffMembersPage />
                    </>
                }
            />
            <Route path="history" element={
                    <>
                        <PageTitle breadcrumbs={profileBreadCrumbs}>
                            Staff History
                        </PageTitle>
                        <StaffHistoryPage />
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
