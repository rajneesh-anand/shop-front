import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import Logo from "../../components/logo";
import Profile from "../../components/profile";
import SideBarMenu from "../../components/sidebar-menu";
import SideBarCart from "../../components/sidebar-cart";
import ActiveLink from "../../utils/activeLink";
import { useCart } from "../../contexts/cart/use-cart";
import { GiShoppingBag } from "react-icons/gi";
import { IoCallSharp, IoMailSharp, IoLogoWhatsapp } from "react-icons/io5";

const Header = ({ classOption }) => {
  const { cartItemsCount } = useCart();
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const [ofcanvasShow, setOffcanvasShow] = useState(false);
  const onCanvasHandler = () => {
    setOffcanvasShow((prev) => !prev);
  };
  const [searchbarShow, setSearchbarShow] = useState(false);
  const onSearchHandler = () => {
    setSearchbarShow((prev) => !prev);
  };
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  useEffect(() => {
    const header = document.querySelector(".header-area");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = ({}) => {
    setScroll(window.scrollY);
  };
  return (
    <Fragment>
      <div className="top-nav">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-auto">
              <div>
                <IoCallSharp /> +91-789945454
              </div>
            </div>
            <div className="col-auto">
              <div>
                <IoMailSharp /> demo@demo.com
              </div>
            </div>
            <div className="col-auto">
              <div>
                <IoLogoWhatsapp /> +91-78445454
              </div>
            </div>
          </div>
        </div>
      </div>

      <header
        className={`header-area header-default sticky-header ${classOption} ${
          scroll > headerTop ? "sticky" : ""
        }`}
      >
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="header-action-area">
                <button className="btn-menu" onClick={handleShow}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <span className="menu-text">Menu</span>
              </div>
            </div>

            <div className="col-auto">
              <div className="header-logo-area">
                <Logo image={`${process.env.PUBLIC_URL}/img/logo.png`} />
              </div>
            </div>
            <div className="col">
              <div className="topNav">
                <div>
                  <ActiveLink href="/mobile" activeClassName="active-link">
                    <a>Mobile</a>
                  </ActiveLink>
                </div>
                <div>
                  <ActiveLink href="/laptop" activeClassName="active-link">
                    <a>Laptop</a>
                  </ActiveLink>
                </div>
                <div>
                  <ActiveLink href="/camera" activeClassName="active-link">
                    <a>Camera</a>
                  </ActiveLink>
                </div>
                <div>
                  <ActiveLink href="/accessories" activeClassName="active-link">
                    <a>Accessories</a>
                  </ActiveLink>
                </div>
                <div>
                  <ActiveLink href="/others" activeClassName="active-link">
                    <a>Others</a>
                  </ActiveLink>
                </div>

                {/* <div>
                  <ActiveLink href="/query" activeClassName="active-link">
                    <a>Send Your Queries ?</a>
                  </ActiveLink>
                </div> */}
              </div>
            </div>
            <div className="col-auto">
              <button className="cart-button" onClick={handleShowCart}>
                <GiShoppingBag />
                {cartItemsCount > 0 && <span>{cartItemsCount}</span>}
              </button>
            </div>
            <div className="col-auto header-profile">
              <Profile />
            </div>
          </div>
        </div>
      </header>
      <SideBarMenu show={show} handleClose={handleClose} />
      <SideBarCart show={showCart} handleClose={handleCloseCart} />
    </Fragment>
  );
};

Header.propTypes = {
  classOption: PropTypes.string,
};

Header.defaultProps = {
  classOption: "header-area header-default sticky-header",
};

export default Header;
