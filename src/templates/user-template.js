import React from "react";
import Footer from "../components/user/common/footer/footer";
import Header from "../components/user/common/header/header";

const UserTemplate = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserTemplate;
