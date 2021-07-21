import React from "react";
import ReactJWPlayer from "react-jw-player";
import Link from "next/link";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import prisma from "../../lib/prisma";

const MoviePlayerPage = ({ data }) => {
  const result = JSON.parse(data);
  const { slug, title, media, poster } = result;
  return result ? (
    <Layout>
      <SEO
        title={title}
        canonical={process.env.PUBLIC_URL + `/movie/${slug}`}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <ReactJWPlayer
              playerId="studionmovieonline"
              playerScript="https://cdn.jwplayer.com/libraries/QoEEgjta.js"
              file={media}
              image={poster}
            />
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  ) : (
    <Layout>
      <SEO title="Blog link broken" canonical={process.env.PUBLIC_URL} />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <p>Nothing Here ...</p>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params, req, res }) {
  try {
    const { id } = params;
    console.log(id);

    const post = await prisma.movie.findFirst({
      where: {
        slug: id,
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });
    console.log(post);
    return {
      props: { data: JSON.stringify(post) },
    };
  } catch (error) {
    console.log(error);
    res.statusCode = 404;
    return {
      props: {},
    };
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
export default MoviePlayerPage;
