import PropTypes from "prop-types";
import Link from "next/link";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { slugify } from "../../../utils";
import Image from "next/image";

SwiperCore.use([Autoplay]);

const BlogItem = ({ data }) => {
  console.log(data);

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
        <a>{value}</a>
      </Link>
    );
  });

  return (
    <div className="post-item">
      <div className="thumb">
        <Link href={process.env.PUBLIC_URL + `/blog-details/${data.id}`}>
          <img src={data.image} alt={data.title} />
        </Link>
      </div>

      <div className="content">
        <div className="meta">
          <Link
            href={process.env.PUBLIC_URL + `/author/${slugify(data.authorId)}`}
          >
            <a className="author">Author - {data.author.name}</a>
          </Link>{" "}
          <span>/</span>{" "}
          <Link href={process.env.PUBLIC_URL + `/date/${data.createdAt}`}>
            <a className="post-date">{formatDate(data.createdAt)}</a>
          </Link>{" "}
          {/* <span>/</span> <span className="cate-link">{cate}</span> */}
        </div>
        {/* <Link
          className="post-date"
          href={process.env.PUBLIC_URL + `/date/${slugify(data.createdAt)}`}
        >
          <a>{data.createdAt}</a>
        </Link> */}

        {/* <Link
          className="author"
          href={process.env.PUBLIC_URL + `/author/${slugify(data.authorId)}`}
        >
          <a>{data.author}</a>
        </Link> */}
        {/* <span>/</span> <span className="cate-link">{cate}</span> */}

        <h4 className="title">
          <Link href={process.env.PUBLIC_URL + `/blog-details/${data.id}`}>
            <a>{data.title}</a>
          </Link>
        </h4>
        <Link href={process.env.PUBLIC_URL + `/read/${data.slug}`}>
          <a className="btn-link">Continue</a>
        </Link>
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  data: PropTypes.object,
};

export default BlogItem;
