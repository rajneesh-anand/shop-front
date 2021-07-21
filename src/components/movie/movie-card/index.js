import PropTypes from "prop-types";
import Link from "next/link";

const MovieCard = ({ data }) => {
  function addDefaultSrc(ev) {
    ev.target.src = "https://source.unsplash.com/600x900/?tech,street";
  }

  return (
    <div className="card">
      <div className="card-header-img">
        <img
          onError={addDefaultSrc}
          className="img-responsive"
          src={data.poster}
          alt={data.title}
        />
      </div>

      <div className="card-body-movie">
        <span className="tag tag-teal">{data.title}</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {data.time}

          <div className="playButton">
            <Link href={`/movie/${data.slug}`}>
              <a>
                PLAY MOVIE <i className="icofont-play-alt-1 icofont-2x" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  data: PropTypes.object,
};

export default MovieCard;
