import React, { Fragment } from "react";

import AdminHeader from  '../components/Header/AdminHeader.jsx';
import Footer from '../components/Footer/Footer.jsx';
import AdminRouters from '../Routers/AdminRouters.jsx'

const Layout = () => {
  return (
    <Fragment>
      <AdminHeader />
      <div>
        <AdminRouters />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
