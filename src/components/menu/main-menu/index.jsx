import React from "react";
import Link from "next/link";

const MainMenu = () => {
  return (
    <nav>
      <ul className="main-menu">
        <li className="active">
          <Link href="/">
            <a className="main-menu-link">Home</a>
          </Link>
        </li>
        <li>
          <Link href={process.env.PUBLIC_URL + "/service"}>
            <a className="main-menu-link">Services</a>
          </Link>
          <ul className="sub-menu">
            <li>
              <Link href={process.env.PUBLIC_URL + "/service"}>
                <a className="sub-menu-link">Services</a>
              </Link>
            </li>
            <li>
              <Link href={process.env.PUBLIC_URL + "/service-details/1"}>
                <a className="sub-menu-link">Services details</a>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href={process.env.PUBLIC_URL + "/blog"}>
            <a className="main-menu-link">Blog</a>
          </Link>
          <ul className="sub-menu">
            <li>
              <Link href={process.env.PUBLIC_URL + "/blog"}>
                <a className="sub-menu-link">Services</a>
              </Link>
            </li>
            <li>
              <Link href={process.env.PUBLIC_URL + "/blog-details/1"}>
                <a className="sub-menu-link">Services</a>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href={process.env.PUBLIC_URL + "/about"}>
            <a className="main-menu-link">About</a>
          </Link>
        </li>
        <li>
          <Link href={process.env.PUBLIC_URL + "/contact"}>
            <a className="main-menu-link">Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
