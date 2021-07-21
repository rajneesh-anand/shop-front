import React from "react";
import SEO from "../../components/seo";
import ContactContainer from "../../containers/contact";
// import MapContainer from "../../containers/global/map";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const Contact = () => {
  return (
    <React.Fragment>
      <Layout>
        <SEO
          title="Contact | KokeLiko "
          canonical={process.env.PUBLIC_URL + "/contact"}
        />
        <div className="wrapper">
          <Header classOption="hb-border" />
          <div className="container">
            <ContactContainer />
            {/* <MapContainer /> */}
          </div>
          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Contact;
