import React from "react";
import Link from "next/link";
import BlogContainer from "../../containers/blog/blog-grid";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const BlogsPage = ({ blogData }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const { type } = router.query;

  return blogData.data.length === 0 ? (
    <Layout>
      <SEO
        title={`${type} | KokeLiko`}
        canonical={`${process.env.PUBLIC_URL}/articles/${type}`}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="hv-center">
            <h6>There is nothing here ! Write &amp; Share your own blog</h6>
            {session ? (
              <Link href="/user/newpost">
                <a className="blue-button">Publish Your Blog</a>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <a className="blue-button">Sign In to publish your blog</a>
              </Link>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  ) : (
    <Layout>
      <SEO
        title={`${type} | KokeLiko`}
        canonical={`${process.env.PUBLIC_URL}/articles/${type}`}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <BlogContainer blogData={blogData} />
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query, params }) => {
  const { type } = params;

  // Fetch the first page as default
  const page = query.page || 1;
  let blogData = null;
  // Fetch data from external API
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/articles/${type}/?page=${page}`
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    blogData = await res.json();
    // console.log(blogData);
  } catch (err) {
    blogData = { error: { message: err.message } };
  }
  // Pass data to the page via props
  return { props: { blogData: blogData } };
};

export default BlogsPage;
