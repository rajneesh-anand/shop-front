import React from "react";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
// import { useSession } from "next-auth/client";
// import Link from "next/link";

export default function AccountverifyPage() {
  // const [session] = useSession();
  // if (!session) {
  //   return (
  //     <Layout>
  //       <SEO
  //         title="Email Verification | KokeLiko "
  //         canonical={process.env.PUBLIC_URL + "/auth/verify-account"}
  //       />
  //       <div className="wrapper home-default-wrapper">
  //         <Header classOption="hb-border" />
  //         <div className="main-content">
  //           <div className="hv-center">
  //             <p>Please Sign in to view this page</p>
  //             <Link href="/auth/signin">
  //               <a>Sign In</a>
  //             </Link>
  //           </div>
  //         </div>
  //         <Footer />
  //       </div>
  //     </Layout>
  //   );
  // }
  return (
    <Layout>
      <SEO
        title="Email Verification | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/auth/verify-account"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="hv-center">
            <h3>Oops Something went wrong</h3>
            <h2>Your verification link expired</h2>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
