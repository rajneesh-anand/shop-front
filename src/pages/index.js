import React, { useEffect } from "react";
import SEO from "../components/seo";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import Layout from "../layouts";
import Banner from "../components/banner";
import { usePaginatedData } from "../utils/useRequest";
import { MessageBox, MessageTitle } from "../components/messagebox";
import Loading from "../components/loading";
import ProductList from "../containers/product-list";
import BannerData from "../data/banner.json";
import Shipping from "../components/shipping";

const HomePage = () => {
  const {
    result,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
    isEmpty,
  } = usePaginatedData("/api/products");

  return (
    <Layout>
      <SEO title="Gulshan | Home" canonical={process.env.PUBLIC_URL} />
      <div className="wrapper-home">
        <Header classOption="hb-border" />
        <Banner data={BannerData.slider} />
        <div className="container">
          <Shipping />
          {error && (
            <MessageBox>
              <MessageTitle color="red">Something went wrong</MessageTitle>
            </MessageBox>
          )}
          {isLoadingMore ? (
            <Loading />
          ) : isEmpty ? (
            <div className="text-center">
              <h6>No Product available</h6>
            </div>
          ) : (
            <>
              <ProductList data={result} />
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <button
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setSize(size + 1)}
                  >
                    {isLoadingMore
                      ? "Loading..."
                      : isReachingEnd
                      ? "No More products"
                      : "More Products"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </Layout>
  );
};

export default HomePage;
