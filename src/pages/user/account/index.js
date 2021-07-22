import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/client";
import Link from "next/link";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import ProductsTable from "../../../components/products-table";
import Loading from "../../../components/loading";
import { useRouter } from "next/router";
import Message from "../../../components/message";
import prisma from "../../../lib/prisma";

const Account = ({ orderData }) => {
  const data = JSON.parse(orderData).length != 0 ? JSON.parse(orderData) : null;
  const router = useRouter();

  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push("/auth/signin");
      }
    }
  }, [session, loading]);

  return loading ? (
    <Loading />
  ) : (
    session && (
      <Layout>
        <SEO
          title="My Account | KokeLiko "
          canonical={process.env.PUBLIC_URL + "/user/account"}
        />
        <div className="wrapper">
          <Header classOption="hb-border" />
          <div className="container">
            <div
              className="row"
              style={{
                marginTop: 40,
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              <h6>Your Orders List</h6>
            </div>
            <div className="row" style={{ marginTop: 40 }}>
              <div className="col-lg-12 col-md-12 ">
                {data ? (
                  <ProductsTable data={data} />
                ) : (
                  <Message
                    title="You have placed no order !"
                    url="/"
                    btnText="Place an Order"
                  />
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    )
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const orders = await prisma.orders.findMany({
    where: {
      customer: { email: session.user.email },
    },
    include: {
      customer: {
        select: { name: true },
      },
    },
  });

  return {
    props: {
      orderData:
        orders.length != 0 ? JSON.stringify(orders) : JSON.stringify([]),
    },
  };
};

export default Account;
