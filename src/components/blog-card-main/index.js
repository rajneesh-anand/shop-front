import Link from "next/link";
import htmr from "htmr";
import SocialIcon from "../social-icon";

const BlogCardMain = ({ data }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const truncate = (str, no_words) => {
    return htmr(str.split(" ").splice(0, no_words).join(" "));
  };

  function addDefaultSrc(ev) {
    ev.target.src = "https://source.unsplash.com/600x900/?tech,street";
  }

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-3">
          <img
            onError={addDefaultSrc}
            className="img-responsive"
            src={data.image}
            alt={data.title}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            <div className="card-user">
              <img src={data.author.image} alt="profile image" />
              <small>{data.author.name} |</small>
              <small className="text-muted">{formatDate(data.createdAt)}</small>
              <div className="social-icons">
                <SocialIcon
                  path="https://www.facebook.com/"
                  icon="icofont-facebook"
                />
                <SocialIcon
                  path="https://twitter.com/"
                  icon="icofont-twitter"
                />

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

            <div className="card-text">{truncate(data.content, 50)}</div>

            <div style={{ marginLeft: "auto" }}>
              <Link
                href={process.env.PUBLIC_URL + `/read/${data.id}/${data.slug}`}
              >
                <a className="blue-button">Continue Reading </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardMain;
