import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useSession } from "next-auth/client";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { useCart } from "../../contexts/cart/use-cart";
import CheckoutForm from "../../components/checkout-form";
import Message from "../../components/message";
import parse from "urlencoded-body-parser";
import prisma from "../../lib/prisma";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItemsCount } = useCart();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push("/auth/signin");
      }
    }
  }, [session, loading]);

  return loading ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    session && (
      <Layout>
        <SEO
          title="Checkout | KokeLiko "
          canonical={process.env.PUBLIC_URL + "/checkout"}
        />
        <div className="wrapper">
          <Header classOption="hb-border" />
          <div className="container">
            {cartItemsCount > 0 ? (
              <CheckoutForm />
            ) : (
              <Message
                title="Your shopping cart is empty , Add products in your cart"
                btnText="Add Product"
                url="/"
              />
            )}
          </div>
          <Footer />
        </div>
      </Layout>
    )
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const data = await parse(req);
  console.log(data);

  if (data.STATUS === "TXN_SUCCESS") {
    await prisma.orders.updateMany({
      where: { OrderNumber: data.ORDERID },
      data: {
        PaymentStatus: data.STATUS,
        PaymentID: data.TXNID,
      },
    });

    return {
      redirect: {
        destination: `/payment/status?oid=${
          data.ORDERID
        }&status=${data.STATUS.toLowerCase()}`,
        statusCode: 301,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default CheckoutPage;
