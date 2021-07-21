import React from "react";

import BlogCardTwo from "../../../components/blog/blog-card-two";

const BlogContainerTwo = ({ data }) => {
  return (
    <div className="blog-area ">
      <div className="container">
        <div className="row  post-items-style1">
          {data &&
            data.map((blog) => (
              <div key={blog.id} className="col-sm-6 col-md-6 col-lg-3">
                <BlogCardTwo data={blog} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogContainerTwo;
