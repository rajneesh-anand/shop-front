import PropTypes from "prop-types";
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import { getClosest, getSiblings, slideToggle, slideUp } from "../../utils";

const HamburgerMenu = ({ show, onClose }) => {
  const [session] = useSession();
  const onClickHandler = (e) => {
    const target = e.currentTarget;
    const parentEl = target.parentElement;
    if (
      parentEl?.classList.contains("menu-toggle") ||
      target.classList.contains("menu-toggle")
    ) {
      const element = target.classList.contains("icon") ? parentEl : target;
      const parent = getClosest(element, "li");
      const childNodes = parent.childNodes;
      const parentSiblings = getSiblings(parent);
      parentSiblings.forEach((sibling) => {
        const sibChildNodes = sibling.childNodes;
        sibChildNodes.forEach((child) => {
          if (child.nodeName === "UL") {
            slideUp(child, 1000);
          }
        });
      });
      childNodes.forEach((child) => {
        if (child.nodeName === "UL") {
          slideToggle(child, 1000);
        }
      });
    }
  };
  return (
    <aside className={`off-canvas-wrapper ${show ? "active" : ""}`}>
      <div className="off-canvas-inner">
        <div className="off-canvas-overlay"></div>
        <div className="off-canvas-content">
          <div className="off-canvas-header">
            <div className="close-action">
              <button className="btn-close" onClick={onClose}>
                <i className="icon_close"></i>
              </button>
            </div>
          </div>

          <div className="off-canvas-item">
            {session && (
              <>
                <div className="text-center">
                  <img
                    src={session.user.image}
                    style={{
                      width: "60px",
                      borderRadius: "50%",
                      marginRight: 5,
                    }}
                  />
                </div>
                <div className="text-center">
                  <p>{session.user.name}</p>
                </div>
                <div className="text-center">
                  <Link href="/user/account">
                    <a className="anchor-button">My Account</a>
                  </Link>
                </div>
              </>
            )}
            <hr />
            <div className="asside-navigation-area">
              <ul className="asside-menu">
                <li className="item">
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                {/* <li className="dropdown-submenu">
                  <Link href="/portfolio">
                    <span>
                      <a>Portfolio</a>
                    </span>
                  </Link>
                  <span
                    className="menu-toggle"
                    onClick={onClickHandler}
                    aria-hidden="true"
                  ></span>
                  <ul className="dropdown-nav">
                    <li>
                      <Link href="/portfolio">
                        <a>Portfolio</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/portfolio-details/1">
                        <a>Portfolio Details</a>
                      </Link>
                    </li>
                  </ul>
                </li> */}
                <li>
                  <Link href="/about">
                    <a>About</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blogs">
                    <a>Blogs</a>
                  </Link>
                </li>
                <li>
                  <Link href="/movie">
                    <a>Movie</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a>Contact</a>
                  </Link>
                </li>
                <li>
                  <Link href="/shop">
                    <a>Shop</a>
                  </Link>
                </li>

                {!session ? (
                  <li>
                    <Link href="/auth/signin">
                      <a>SignIn</a>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link href="/photos">
                        <a>Photo Gallery</a>
                      </Link>
                    </li>
                    <li>
                      <button className="signout" onClick={() => signOut()}>
                        Sign Out
                      </button>
                    </li>
                  </>
                )}

                {/* <li className="dropdown-submenu">
                  <NavLink to={process.env.PUBLIC_URL + "/blog"}>
                    <span>Blog</span>
                  </NavLink>
                  <span
                    className="menu-toggle"
                    onClick={onClickHandler}
                    aria-hidden="true"
                  ></span>
                  <ul className="dropdown-nav">
                    <li>
                      <NavLink to={process.env.PUBLIC_URL + "/blog"}>
                        Blog Grid
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={process.env.PUBLIC_URL + "/blog-details/1"}>
                        Blog Details
                      </NavLink>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="off-canvas-footer"></div>
        </div>
      </div>
    </aside>
  );
};

HamburgerMenu.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default HamburgerMenu;
