import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminAddUser from "../components/admin/user-add/user-add";
import AdminUserEdit from "../components/admin/user-edit/user-edit";
import AdminUsers from "../components/admin/users/users";
import ScrollToTop from "../components/common/scroll-to-top/scroll-to-top";
import AdminHomePage from "../pages/admin/admin-home-page";
import NotFoundPage from "../pages/common/not-found-page";
import UnAuthorizedPage from "../pages/common/un-authorized-page";
import ContactDetailPage from "../pages/user/contact-detail-page";
import HomePage from "../pages/user/home-page";
import PrivacyPolicyPage from "../pages/user/privacy-policy-page";
import ProfilePage from "../pages/user/profile-page";
import UserAuthPage from "../pages/user/user-auth-page";
import AdminTemplate from "../templates/admin-template";
import UserTemplate from "../templates/user-template";
import ProtectedRoute from "./protected-route";

const LinkRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/">
          <Route index element={<UserTemplate><HomePage /></UserTemplate>} />
          <Route path="contact" element={<UserTemplate><ContactDetailPage /></UserTemplate>} />
          <Route path="auth" element={<UserTemplate><UserAuthPage /></UserTemplate>} />
          <Route path="profile" element={<ProtectedRoute><UserTemplate><ProfilePage /></UserTemplate></ProtectedRoute>}></Route>
          <Route path="unauthorized" element={<UserTemplate><UnAuthorizedPage /></UserTemplate>}></Route>
          <Route path="privacy-policy" element={<UserTemplate><PrivacyPolicyPage /></UserTemplate>}></Route>

          <Route path="admin">
            <Route index element={<ProtectedRoute admin={true}><AdminTemplate><AdminHomePage /></AdminTemplate></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute admin={true}><AdminTemplate><AdminUsers /></AdminTemplate></ProtectedRoute>}></Route>
            <Route path="add-user" element={<ProtectedRoute admin={true}><AdminTemplate><AdminAddUser /></AdminTemplate></ProtectedRoute>}></Route>
            <Route path="edit-user" element={<ProtectedRoute admin={true}><AdminTemplate><AdminUserEdit /></AdminTemplate></ProtectedRoute>}></Route>

          </Route>

          <Route path="*" element={<UserTemplate><NotFoundPage /></UserTemplate>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default LinkRoutes;
