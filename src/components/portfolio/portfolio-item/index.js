import PropTypes from "prop-types";
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import Link from "next/link";

const PortfolioItem = ({ portfolio }) => {
  return (
    <div className="single-portfolio">
      <LightgalleryProvider>
        <LightgalleryItem
          group="any"
          src={process.env.PUBLIC_URL + portfolio.homeImage}
        >
          <div className="thumbnail">
            <div className="overlay">
              <img
                src={process.env.PUBLIC_URL + portfolio.homeImage}
                alt="portfolio"
              />
            </div>
          </div>
        </LightgalleryItem>
      </LightgalleryProvider>
      <div className="content">
      <h3 className="title">
          <Link href={process.env.PUBLIC_URL + `/portfolio-details/${portfolio.id}`} >
            <a >{portfolio.title}</a>
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
