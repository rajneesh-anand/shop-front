import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";

const BlogCardTwo = ({ data }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // const truncate = (str, no_words) => {
  //   return str.split(" ").splice(0, no_words).join(" ");
  // };

  const unpublishBlog = async (id) => {
    await fetch(`https://nodappserver.herokuapp.com/api/publish/${id}/false`, {
      method: "PUT",
    });
    await Router.push("/user/account");
  };

  return (
    <div className="index-content">
      <div className="card">
        <img src={data.image} />
        <p>{data.title}</p>
        <p>{formatDate(data.createdAt)}</p>
        {/* <p>{truncate(htmr(data.content), 10)}</p> */}
        <div className="text-center" style={{ display: "flex" }}>
          <button
            className="blue-button"
            onClick={() => unpublishBlog(data.id)}
          >
            Un-Publish
          </button>
          <Link href={`/user/drafts/${data.id}`}>
            <a className="blue-button">Edit Blog</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

BlogCardTwo.propTypes = {
  data: PropTypes.object,
};

export default BlogCardTwo;
