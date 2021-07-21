import PropTypes from "prop-types";
import Link from "next/link";

const Logo = ({ image }) => {
  return (
    <Link href="/">
      <img
        className="logo-main"
        src={process.env.PUBLIC_URL + image}
        alt="Logo"
      />
    </Link>
  );
};

Logo.propTypes = {
  image: PropTypes.string,
};

export default Logo;
