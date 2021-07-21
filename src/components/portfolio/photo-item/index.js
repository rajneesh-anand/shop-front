import PropTypes from "prop-types";
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import Link from "next/link";

const PortfolioItem = ({ portfolio }) => {
  function addDefaultSrc(ev) {
    ev.target.src = "https://source.unsplash.com/600x900/?tech,street";
  }
  return (
    <div className="single-portfolio">
      <LightgalleryProvider>
        <LightgalleryItem
          group="any"
          src={process.env.PUBLIC_URL + portfolio.url}
        >
          <div className="thumbnail">
            <div className="overlay">
              <img
                onError={addDefaultSrc}
                src={process.env.PUBLIC_URL + portfolio.url}
                alt="portfolio"
              />
            </div>
          </div>
        </LightgalleryItem>
      </LightgalleryProvider>
      <div className="content">
        <h3 className="title">
          <Link href={process.env.PUBLIC_URL + `/portfolio-details`}>
            <a>{portfolio.title}</a>
          </Link>
        </h3>
        <p className="desc">{portfolio.excerpt}</p>
      </div>
    </div>
  );
};

PortfolioItem.propTypes = {
  portfolio: PropTypes.object,
};

export default PortfolioItem;
