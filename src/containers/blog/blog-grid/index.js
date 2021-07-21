import React, { useEffect, useState } from "react";
import BlogFilter from "../../../components/blog/blog-filter";
import BlogCard from "../../../components/blog/blog-card";
import useMasonry from "../../../hooks/use-masonry";
import { slugify } from "../../../utils";
import Router, { useRouter } from "next/router";

const BlogContainer = ({ blogData }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    if (blogData) {
      // Error check
      if (blogData.error) {
        // Handle error
      } else {
        setBlogs(blogData.data);
      }
    }
  }, [blogData]);

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
      ".post-items-style1 > .blogList:last-child"
    );
    if (lastUserLoaded) {
      const lastUserLoadedOffset =
        lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastUserLoadedOffset) {
        // Stops loading
        /* IMPORTANT: Add !loading  */
        if (blogData.curPage < blogData.maxPage && !loading) {
          // Trigger fetch
          const query = router.query;
          query.page = parseInt(blogData.curPage) + 1;
          router.push({
            pathname: router.pathname,
            query: query,
          });
        }
      }
    }
  };

  const { categories } = useMasonry(
    blogs,
    ".masonryGrid",
    ".masonry-item",
    ".blog-filter-menu",
    ".blog-filter-menu button"
  );
  return (
    <>
      <div className="blog-area blog-masonry-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <BlogFilter categories={categories} />
            </div>
          </div>
          <div className="row masonryGrid post-items-style1">
            {blogs.length > 0 &&
              blogs.map((blog, i) => {
                return (
                  <div
                    key={blog.id}
                    className={`col-sm-6 col-md-6 col-lg-4 blogList masonry-item ${blog.subCategories
                      .map((cat) => slugify(cat))
                      .join(" ")}`}
                    style={{ marginTop: "10px" }}
                  >
                    <BlogCard data={blog} />
                  </div>
                );
              })}
          </div>
        </div>
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

export default BlogContainer;
