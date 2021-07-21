import React, { useEffect } from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import SEO from "../../components/seo";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import prisma from "../../lib/prisma";
import Table from "react-bootstrap/Table";
import { useCart } from "../../contexts/cart/use-cart";
import { useRouter } from "next/router";
import Message from "../../components/message";
import { CURRENCY } from "../../constant/currency";

const Success = ({ data }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const orderData = data ? JSON.parse(data) : null;
  const ProductDetails = orderData ? orderData.ProductDetails : null;
  const { clearCart } = useCart();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push("/auth/signin");
      } else {
        clearCart();
      }
    }
  }, [session, loading]);

  return loading ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    session && (
      <Layout>
        <SEO
          title="Payment | KokeLiko "
          canonical={process.env.PUBLIC_URL + "/status"}
        />
        <div className="wrapper">
          <Header classOption="hb-border" />
          <div className="container">
            {orderData ? (
              <>
                <div className="row" style={{ textAlign: "center" }}>
                  <p>Thank you for placing an order.</p>
                </div>
                <div className="row">
                  <Table>
                    <thead>
                      <tr>
                        <th></th>

                        <th>Image</th>
                        <th>Order Number</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ProductDetails.map((product, i) => (
                        <tr key={product.id}>
                          <td>{i + 1}</td>

                          <td>
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              height="104"
                            />
                          </td>
                          <td>{orderData.OrderNumber}</td>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>
                            {CURRENCY.INR}
                            {product.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="row" style={{ textAlign: "right" }}>
                  <h6>
                    Total Amount = {CURRENCY.INR} {orderData.TotalAmount}
                  </h6>
                </div>
                <div className="row" style={{ textAlign: "center" }}>
                  <div>
                    <Link href="/">
                      <a className="blue-button">Buy More</a>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <Message
                title="Payment Failed !"
                btnText="Try Again"
                url="/checkout"
              />
            )}
          </div>
          <Footer />
        </div>
      </Layout>
    )
  );

  // return loading ? (
  //   <div className="hv-center">
  //     <div className="spinner-border text-primary" role="status">
  //       <span className="sr-only">Loading...</span>
  //     </div>
  //   </div>
  // ) : !session ? (
  //   <Layout>
  //     <SEO
  //       title="Payment Success | KokeLiko "
  //       canonical={process.env.PUBLIC_URL + "/payment/success"}
  //     />
  //     <div className="wrapper">
  //       <Header classOption="hb-border" />
  //       <div className="main-content">
  //         <div className="hv-center">
  //           <p>Please Sign In to view this page </p>
  //           <Link href="/auth/signin">
  //             <a className="blue-button">Sign In</a>
  //           </Link>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   </Layout>
  // ) : (
  //   <Layout>
  //     <SEO
  //       title="Payment Success | KokeLiko "
  //       canonical={process.env.PUBLIC_URL + "/payment/success"}
  //     />
  //     <div className="wrapper home-default-wrapper">
  //       <Header classOption="hb-border" />
  //       <div className="main-content">
  //         <div className="container">
  //           <div className="row" style={{ textAlign: "center" }}>
  //             <p>
  //               Thank you for placing an order, your order number =
  //               {orderData.OrderNumber}
  //             </p>
  //           </div>

  //           <div className="row">
  //             <Table striped>
  //               <thead>
  //                 <tr>
  //                   <th></th>
  //                   <th>Image</th>
  //                   <th>Product Name</th>
  //                   <th>Quantity</th>
  //                   <th>Amount</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {ProductDetails.map((product, i) => (
  //                   <tr key={product.id}>
  //                     <td>{i + 1}</td>
  //                     <td>
  //                       <img src={product.image} alt={product.name} />
  //                     </td>
  //                     <td>{product.name}</td>
  //                     <td>{product.quantity}</td>
  //                     <td>{product.price}</td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </Table>
  //           </div>
  //           <div className="row" style={{ textAlign: "right" }}>
  //             <h6>Total Amount = {orderData.TotalAmount}</h6>
  //           </div>
  //           <div className="row" style={{ textAlign: "center" }}>
  //             <div>
  //               <Link href="/shop">
  //                 <a className="blue-button">Buy More</a>
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   </Layout>
  // );
};

export async function getServerSideProps(context) {
  try {
    const { oid, status } = context.query;

    if (status === "txn_success") {
      const result = await prisma.orders.findFirst({
        where: {
          OrderNumber: oid,
        },
      });
      return {
        props: { data: JSON.stringify(result) },
      };
    } else {
      return {
        props: { data: {} },
      };
    }
  } catch (error) {
    console.log(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

export default Success;
