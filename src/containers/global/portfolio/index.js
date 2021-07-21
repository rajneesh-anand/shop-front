import PortfolioFilter from "../../../components/portfolio/portfolio-filter";
import PortfolioItem from "../../../components/portfolio/portfolio-item";
import PortfolioData from "../../../data/portfolio.json";
import useMasonry from "../../../hooks/use-masonry";
import { slugify } from "../../../utils";

const PortfolioContainer = () => {
  // Isotope Categories list JS

  const { subCategories } = useMasonry(
    PortfolioData,
    ".portfolio-list",
    ".masonry-grid",
    ".messonry-button",
    ".messonry-button button"
  );
  return (
    <div className="portfolio-area portfolio-default-area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="messonry-button text-center mb-50">
              <PortfolioFilter categories={subCategories} />
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 portfolio-list mb-n30">
          <div className="col resizer"></div>
          {PortfolioData &&
            PortfolioData.map((portfolio) => (
              <div
                key={portfolio.id}
                className={`col masonry-grid mb-30 ${portfolio.subCategories
                  .map((cat) => slugify(cat))
                  .join(" ")}`}
              >
                <PortfolioItem portfolio={portfolio} />
              </div>
            ))}
        </div>

        {/* <div className="row">
          <div className="col-lg-12 text-center mt-60">
            <button className="btn-portfolio">loading</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PortfolioContainer;
