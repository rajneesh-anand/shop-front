import PropTypes from "prop-types";
import React from "react";
import prisma from "../../lib/prisma";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import ProductDetailsPage from "../../components/product-details";

const ProductPage = ({ data }) => {
  const result = JSON.parse(data);

  return (
    <Layout>
      <SEO
        title={result.name}
        canonical={`${process.env.PUBLIC_URL}/product/${result.id}/${result.slug}`}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="container">
          <ProductDetailsPage data={result} />
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

export async function getServerSideProps({ params, req, res }) {
  try {
    const { id } = params;

    const post = await prisma.product.findFirst({
      where: {
        AND: [
          {
            id: Number(id[0]),
            slug: id[1],
          },
        ],
      },
    });

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

export default ProductPage;
