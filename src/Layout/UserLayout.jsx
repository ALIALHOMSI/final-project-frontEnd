import React, { Fragment } from "react";

import UserHeader from  '../components/Header/UserHeader.jsx';
import Footer from '../components/Footer/Footer.jsx';
import UserRouters from '../Routers/UserRouters.jsx'

const Layout = () => {
  return (
    <Fragment>
      <UserHeader />
      <div>
        <UserRouters />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
