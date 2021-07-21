import PropTypes from "prop-types";
import Link from "next/link";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogTag from "../../../components/blog/blog-tag";
import Comment from "../../../components/comment";
import { slugify } from "../../../utils";
import htmr from "htmr";
import SocialIcon from "../../../components/social-icon";

SwiperCore.use([Pagination]);

const BlogDetailsWithoutImage = ({ data }) => {
  console.log(data.author);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const cate = data.subCategories.map((value, i) => {
    return (
      <Link
        className="category"
        href={process.env.PUBLIC_URL + `/category/${slugify(value)}`}
        key={i}
      >
        {value}
        {i !== data.subCategories.length - 1 && ","}
      </Link>
    );
  });
  return (
    <div className="blog-details-area">
      <div className="post-details-content">
        <div className="post-details-body">
          <div className="blog-title">{data.title}</div>
          <div className="user">
            <img src={data.author.image} alt="profileimage" />
            <div className="user-info">
              <small>{data.author.name}</small>
              <small>{formatDate(data.createdAt)}</small>
            </div>
            <div className="social-icons">
              <SocialIcon
                path="https://www.facebook.com/"
                icon="icofont-facebook"
              />
              <SocialIcon path="https://twitter.com/" icon="icofont-twitter" />

              <SocialIcon
                path="https://www.pinterest.com"
                icon="social_pinterest"
              />
              <SocialIcon
                path="https://www.instagram.com/"
                icon="icofont-instagram"
              />
              <SocialIcon path="https://rss.com/" icon="social_rss" />
            </div>
          </div>

          <div className="bread-crumbs">
            <Link href={process.env.PUBLIC_URL + "/"}>
              <a>home</a>
            </Link>
            <span>&#8250;</span>
            <Link href={`${process.env.PUBLIC_URL}/articles/${data.category}`}>
              <a>{data.category}</a>
            </Link>
            <span>&#8250;</span>
            <span className="active">{data.title}</span>
          </div>

          <div className="blog-content"> {htmr(data.content)} </div>

          <BlogTag tags={data.tags} />

          <div className="comment-area">
            <h4 className="title">Leave a comment</h4>
            <div className="comment-form-wrap">
              <Comment
                url={`https://kokeliko.vercel.app/read/${data.id}/${data.slug}`}
                id={data.id}
                title={data.title}
              />
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

BlogDetailsWithoutImage.propTypes = {
  data: PropTypes.object,
};

export default BlogDetailsWithoutImage;
