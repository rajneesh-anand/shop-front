import Image from "next/image";
import React, { useState, useEffect } from "react";
import PortfolioContainer from "../../containers/global/photos";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

export default function Photos() {
  return (
    <Layout>
      <SEO
        title="Photo Gallery | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/photos"}
      />
      <div className="wrapper home-default-wrapper">
        <Header />
        <div className="main-content">
          <div className="container">
            <PortfolioContainer />
          </div>
        </div>

        <Footer />
      </div>
    </Layout>
  );
}
