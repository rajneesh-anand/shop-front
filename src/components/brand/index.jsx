import PropTypes from "prop-types";
import Link from "next/link";

const Brand = ({ data }) => {
  return (
    <div className="brand-logo-item">
      <Link href={process.env.PUBLIC_URL + "/"}>
        <img src={process.env.PUBLIC_URL + data.image} alt="Brand-Logo" />
      </Link>
    </div>
  );
};

Brand.propTypes = {
  data: PropTypes.object,
};

export default Brand;
