import PropTypes from "prop-types";
import Link from "next/link";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogTag from "../../../components/blog/blog-tag";
import Comment from "../../../components/comment";
import { slugify } from "../../../utils";
import htmr from "htmr";
import Image from "next/image";

SwiperCore.use([Pagination]);

const BlogDetailsContainer = ({ data }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const cate = data.categories.map((value, i) => {
    return (
      <Link
        className="category"
        href={process.env.PUBLIC_URL + `/category/${slugify(value)}`}
        key={i}
      >
        {value}
        {i !== data.categories.length - 1 && ","}
      </Link>
    );
  });
  return (
    <div className="blog-details-area">
      <div className="post-details-content">
        <div className="post-media">
          <Image
            src={data.image}
            alt={data.title}
            layout="responsive"
            width={800}
            height={400}
          />
        </div>

        <div className="post-details-body">
          <div className="bread-crumbs">
            <Link href={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
            <span>&#8250;</span>
            <Link href={process.env.PUBLIC_URL + "/blogs"}>
              <a>Blogs</a>
            </Link>
            <span>&#8250;</span>
            <span className="active">{data.title}</span>
          </div>

          <div className="content">
            <div className="blog-title">{data.title}</div>
            <div className="blog-content"> {htmr(data.content)} </div>
            <div className="meta">{data.author.name}</div>
            {/* <div className="meta">{formatDate(data.createdAt)}</div> */}
          </div>

          <BlogTag tags={data.tags} />
          <div className="social-icons">
            <span>Share:</span>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icofont-facebook"></i>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icofont-twitter"></i>
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="social_pinterest"></i>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icofont-instagram"></i>
            </a>
            <a
              href="https://rss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="social_rss"></i>
            </a>
          </div>
          <div className="comment-area">
            <h4 className="title">Leave a comment</h4>
            <div className="comment-form-wrap">
              <Comment url="" id={data.id} title={data.title} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="blog-navigation">
        <div className="prev">
          <Link href={process.env.PUBLIC_URL + "/"}>
            <a>
              Newer post <i className="icofont-arrow-right"></i>
            </a>
          </Link>
        </div>
        <div className="next">
          <Link href={process.env.PUBLIC_URL + "/"}>
            <a>
              Older post <i className="icofont-arrow-right"></i>
            </a>
          </Link>
        </div>
      </div>
    */}
    </div>
  );
};

BlogDetailsContainer.propTypes = {
  data: PropTypes.object,
};

export default BlogDetailsContainer;
