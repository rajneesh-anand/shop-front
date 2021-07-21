import PropTypes from "prop-types";
import Link from "next/link";

const PageTitle = ({ subTitle, title, classOption }) => {
  return (
    <div
      className={`page-title-content ${classOption}`}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <h4 className="page-title">{subTitle}</h4>
      <Link href="/user/newpost">
        <a className="title">{title}</a>
      </Link>
    </div>
  );
};

PageTitle.propTypes = {
  subTitle: PropTypes.string,
  title: PropTypes.string,
  classOption: PropTypes.string,
};
PageTitle.defaultProps = {
  classOption: "content-style2 text-center",
};

export default PageTitle;
