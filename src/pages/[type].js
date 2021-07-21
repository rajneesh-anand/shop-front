import React from "react";
import SEO from "../components/seo";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import Layout from "../layouts";
import BannerData from "../data/banner.json";
import Banner from "../components/banner";
import { usePaginatedData } from "../utils/useRequest";
import { MessageBox, MessageTitle } from "../components/messagebox";
import Loading from "../components/loading";
import Shipping from "../components/shipping";
import ProductList from "../containers/product-list";
import { useRouter } from "next/router";

const ProductCategoryPage = () => {
  const router = useRouter();
  const { type } = router.query;
  const {
    result,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
    isEmpty,
  } = usePaginatedData(`/api/products/${type}`);
  return (
    <Layout>
      <SEO
        title={`${type} | Shop`}
        canonical={`${process.env.PUBLIC_URL}/${type}`}
      />
      <div className="wrapper">
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
            <div style={{ margin: "48px 0px", textAlign: "center" }}>
              <h6 style={{ color: "red" }}>Currently No Product Available !</h6>
            </div>
          ) : (
            <>
              <ProductList data={result} />
              <div className="row justify-content-center">
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
            </>
          )}
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default ProductCategoryPage;
