import React from "react";
import SEO from "../../components/seo";
import ContactContainer from "../../containers/contact";

import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const Contact = () => {
  return (
    <Layout>
      <SEO
        title="Contact | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/contact"}
      />
      <div className="wrapper">
        <Header classOption="hb-border" />
        <div className="container">
          <ContactContainer />
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Contact;
