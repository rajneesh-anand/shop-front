import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/product/product-card";
import Router, { useRouter } from "next/router";

const ShopContainer = ({ shopData }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    if (shopData) {
      if (shopData.error) {
        // Handle error
      } else {
        setProducts(shopData.data);
      }
    }
  }, [shopData]);

  // Router event handler
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    // To get page offset of last user
    const lastUserLoaded = document.querySelector(
      ".post-items-style1 > .productList:last-child"
    );
    if (lastUserLoaded) {
      const lastUserLoadedOffset =
        lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastUserLoadedOffset) {
        // Stops loading
        /* IMPORTANT: Add !loading  */
        if (shopData.curPage < shopData.maxPage && !loading) {
          // Trigger fetch
          const query = router.query;
          query.page = parseInt(shopData.curPage) + 1;
          router.push({
            pathname: router.pathname,
            query: query,
          });
        }
      }
    }
  };

  return (
    <>
      <div className="row post-items-style1">
        {products.length > 0 &&
          products.map((product, i) => {
            return (
              <div key={product.id} className="col-sm-3 productList">
                <ProductCard data={product} />
              </div>
            );
          })}
      </div>

      {loading && (
        <div className="hv-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopContainer;
