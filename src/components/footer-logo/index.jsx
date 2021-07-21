import PropTypes from "prop-types";
import Link from "next/link";
const FooterLogo = ({ image }) => {
  return (
    <Link href={process.env.PUBLIC_URL + "/"}>
      <img
        className="logo-main"
        src={process.env.PUBLIC_URL + image}
        alt="Logo"
      />
    </Link>
  );
};

FooterLogo.propTypes = {
  image: PropTypes.string,
};

export default FooterLogo;
