import React, { useState, useEffect } from "react";
import { signIn, getCsrfToken, getSession, useSession } from "next-auth/client";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import Loading from "../../components/loading";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

export default function SignIn({ csrfToken }) {
  const [email, setEmail] = useState("");
  const [session, loading] = useSession();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("email", { email: email });
  };

  // useEffect(() => {
  //   if (session) {
  //     router.push(window.localStorage.getItem("callback-origin"));
  //   }
  // }, [session]);

  return loading ? (
    <Loading />
  ) : (
    !session && (
      <Layout>
        <SEO
          title="Sign In | KokeLiko"
          canonical={`${process.env.PUBLIC_URL}/auth/signin`}
        />
        <div className="wrapper">
          <Header classOption="hb-border" />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-6">
                <div className="signBlock">
                  <div className="commonStyle">
                    <p>SignIn KokeLiko</p>
                  </div>

                  <div className="commonStyle">
                    <button
                      className="google"
                      onClick={() =>
                        signIn("google", {
                          callbackUrl: "http://localhost:3000",
                        })
                      }
                    >
                      <AiFillGoogleCircle />
                      Login with Google
                    </button>
                  </div>

                  <div className="commonStyle">
                    <button
                      className="facebook"
                      onClick={() =>
                        signIn("facebook", {
                          callbackUrl: "https://kokeliko.vercel.app",
                        })
                      }
                    >
                      <FaFacebook />
                      Login with Facebook
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <input
                      name="csrfToken"
                      type="hidden"
                      defaultValue={csrfToken}
                    />
                    <div className="commonStyle">
                      <input
                        type="email"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email !"
                        value={email}
                      />
                    </div>
                    <div className="commonStyle">
                      <button className="email" type="submit">
                        Login With Email
                      </button>
                    </div>
                  </form>
                  <div className="text-center">
                    <p>
                      By Login, you agree to KokeLiko
                      <a
                        href={process.env.PUBLIC_URL + "/termsofuse"}
                        target="_blank"
                      >
                        {" "}
                        Terms of Service{" "}
                      </a>
                      and
                      <a
                        href={process.env.PUBLIC_URL + "/privacypolicy"}
                        target="_blank"
                      >
                        {" "}
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    )
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  // const session = await getSession(context);
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/user/account",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: { csrfToken },
  };
}
