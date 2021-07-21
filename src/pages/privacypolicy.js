import React from "react";
import SEO from "../components/seo";
import { sitePrivacyPolicy } from "../constant/privacy-policy";
import styled from "styled-components";
import { Link, Element } from "react-scroll";
import Sticky from "react-stickynode";

const StyledLink = styled(Link)(
  {
    "&.active, :hover": {
      color: "teal",
    },
  },
  {
    fontSize: 14,
    textDecoration: "none",
    padding: "10px 0",
    display: "block",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
    cursor: "pointer",
  }
);

const PrivacyPolicyPage = () => {
  const { title, date, content } = sitePrivacyPolicy;
  const menuItems = [];
  content.forEach((item) => {
    menuItems.push(item.title);
  });
  return (
    <>
      <SEO
        title="Privacy Policy | KokeLiko"
        canonical={`${process.env.PUBLIC_URL}/privacypolicy`}
      />
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="row">
              <div>
                <p>{title}</p>
                <p>{`Last update: ${date}`}</p>
              </div>
            </div>
            <Sticky top={100} innerZ="1">
              <div
                style={{
                  backgroundColor: ["#fff", "transparent"],
                  padding: ["1rem", 0],
                }}
              >
                {menuItems.map((item) => (
                  <StyledLink
                    key={item}
                    activeClass="active"
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-276}
                    duration={500}
                  >
                    {item}
                  </StyledLink>
                ))}
              </div>
            </Sticky>
          </div>
          <div className="col-8">
            <div
              style={{
                p: {
                  fontSize: "base",
                  color: "text.medium",
                  marginBottom: 20,
                  padding: ["1rem", 0],
                },
                lineHeight: 1.8,
              }}
            >
              {content.map((item, idx) => {
                return (
                  <Element
                    name={item.title}
                    style={{ paddingBottom: 40 }}
                    key={idx}
                  >
                    <h2>{item.title}</h2>
                    <div
                      className="html-content"
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  </Element>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
