import PropTypes from "prop-types";
import { slugify } from "../../utils";

const ProductFilter = ({ categories }) => {
  return (
    <div className="messonry-button text-center mb-8">
      <button data-filter="*" className="is-checked">
        <span className="filter-text">all</span>
      </button>
      {categories?.map((cat, idx) => (
        <button key={idx} data-filter={`.${slugify(cat)}`}>
          <span className="filter-text">{cat}</span>
        </button>
      ))}
    </div>
  );
};

ProductFilter.propTypes = {
  categories: PropTypes.array,
};

export default ProductFilter;
