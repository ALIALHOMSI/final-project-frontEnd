import React, { Fragment } from "react";

import Header from  '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Routers from '../Routers/Routers.jsx'

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
