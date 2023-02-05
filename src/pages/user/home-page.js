import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import ContactSearch from "../../components/user/home/contact-search";
import Contacts from "../../components/user/home/contacts";

const HomePage = () => {
  return (<div>
    <ContactSearch />
    <Spacer height={20} />
    <Contacts />

  </div>);
};

export default HomePage;
