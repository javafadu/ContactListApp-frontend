import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/common/not-found-page";
import UnAuthorizedPage from "../pages/common/un-authorized-page";
import ContactDetailPage from "../pages/user/contact-detail-page";
import HomePage from "../pages/user/home-page";
import UserAuthPage from "../pages/user/user-auth-page";
import UserTemplate from "../templates/user-template";

const LinkRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<UserTemplate><HomePage /></UserTemplate>}/>
          <Route path="contact" element={<UserTemplate><ContactDetailPage /></UserTemplate>}/>
          <Route path="auth" element={<UserTemplate><UserAuthPage /></UserTemplate>}/>
          <Route path="unauthorized" element={<UserTemplate><UnAuthorizedPage/></UserTemplate>}></Route>
          <Route path="*" element={<UserTemplate><NotFoundPage/></UserTemplate>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default LinkRoutes;
