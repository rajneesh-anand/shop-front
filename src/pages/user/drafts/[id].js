import React, { useState, useEffect } from "react";
import prisma from "../../../lib/prisma";
import Link from "next/link";
import slugify from "slugify";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import dynamic from "next/dynamic";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { blogTagsOptions } from "../../../constant/blogs";
import { blogCategoryOptions } from "../../../constant/blogs";

// const SunEditor = dynamic(() => import("suneditor-react"), {
//   ssr: false,
//
// });

const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

import { useSession, getSession } from "next-auth/client";

function SinglePostForEdit({ post }) {
  const blogData = JSON.parse(post);
  console.log(blogData);

  const [data, setData] = useState({
    title: blogData.title,
    content: blogData.content,
  });
  const [selectedImage, setSelectedImage] = useState();
  const [html, setHtml] = useState("");
  const [message, setMessage] = useState("");
  const [session, loading] = useSession();
  const [category, setCategory] = useState(blogData.category);
  const [template, setTemplate] = useState(blogData.template);
  const [tags, setTags] = useState(blogData.tags);
  const [subCat, setSubCat] = useState(blogData.subCategories);

  const [isProcessing, setProcessingTo] = useState(false);
  const [isDrafting, setDraftingTo] = useState(false);

  const onTagSelect = (event) => {
    setTags(event);
  };
  const onCatSelect = (event) => {
    setSubCat(event);
  };

  const onTagRemove = (event) => {
    setTags(event);
  };
  const onCatRemove = (event) => {
    setSubCat(event);
  };

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const draftPost = async (e) => {
    e.preventDefault();
    if (data.title === "") {
      return;
    }
    setDraftingTo(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("title", data.title);
      formData.append("category", category);
      formData.append(
        "subCategories",
        subCat.length === 0
          ? JSON.stringify(blogData.subCategories)
          : JSON.stringify(subCat)
      );
      formData.append(
        "tags",
        tags.length === 0 ? JSON.stringify(blogData.tags) : JSON.stringify(tags)
      );
      formData.append("content", !html ? data.content : html);
      formData.append(
        "template",
        template === "" ? blogData.template : template
      );
      formData.append(
        "slug",
        slugify(data.title, {
          remove: /[*+~.()'"!:@,]/g,
          lower: true,
        })
      );
      formData.append("published", false);
      formData.append("author", session?.user?.email);

      const result = await fetch(
        `https://nodappserver.herokuapp.com/api/post/${blogData.id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const resultJson = await result.json();

      if (resultJson.msg === "success") {
        setDraftingTo(false);
        setMessage("Your Draft is updated successfully");
      }
    } catch (error) {
      setProcessingTo(false);
      console.error(error);
    }
  };

  const publishPost = async (e) => {
    e.preventDefault();
    if (data.title === "") {
      return;
    }
    setProcessingTo(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("title", data.title);
      formData.append("category", category);
      formData.append(
        "subCategories",
        subCat.length === 0
          ? JSON.stringify(blogData.subCategories)
          : JSON.stringify(subCat)
      );
      formData.append(
        "tags",
        tags.length === 0 ? JSON.stringify(blogData.tags) : JSON.stringify(tags)
      );
      formData.append("content", !html ? data.content : html);
      formData.append(
        "template",
        template === "" ? blogData.template : template
      );
      formData.append(
        "slug",
        slugify(data.title, {
          remove: /[*+~.()'"!:@,]/g,
          lower: true,
        })
      );
      formData.append("published", true);
      formData.append("author", session?.user?.email);

      const result = await fetch(
        ` https://nodappserver.herokuapp.com/api/post/${blogData.id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const resultJson = await result.json();
      console.log(resultJson);
      if (resultJson.msg === "success") {
        setMessage("Your Blog is updated successfully");
        setProcessingTo(false);
      }
    } catch (error) {
      console.error(error);
      setProcessingTo(false);
    }
  };

  return loading ? (
    <div className="hv-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : !session ? (
    <Layout>
      <SEO
        title="My Account | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/user/account"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="hv-center">
            <p>Please SignIn To Access Your Account </p>
            <Link href="/auth/signin">
              <a className="blue-button">Sign In</a>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  ) : (
    <Layout>
      <SEO
        title="Update Blog | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/user/newpost"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            {message === "" ? (
              <form>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="img-style">
                      <img
                        src={blogData.image}
                        alt={blogData.title}
                        height={180}
                      />
                      <div style={{ textAlign: "center" }}>
                        <input
                          accept=".jpg, .png, .jpeg"
                          onChange={handleChange}
                          type="file"
                          name="uploadfile"
                          id="img"
                          style={{ display: "none" }}
                        />
                        <label className="blog-thumbImage" htmlFor="img">
                          Upload Thumbnail Image
                        </label>
                      </div>
                    </div>

                    <div style={{ margin: "4px 0px" }}>
                      <label>Blog Template</label>
                      <select
                        onChange={(event) => setTemplate(event.target.value)}
                        value={template}
                        style={{ float: "right", width: 220 }}
                      >
                        <option value="template_with_headerimage">
                          Blog with Header Image
                        </option>
                        <option value="template_without_headerimage">
                          Blog without Header Image
                        </option>
                      </select>
                    </div>
                    <div style={{ marginBottom: "4px" }}>
                      <label>Blog Category</label>
                      <select
                        onChange={(event) => setCategory(event.target.value)}
                        value={category}
                        style={{ float: "right", width: 220 }}
                      >
                        <option value="yoga">Yoga</option>
                        <option value="meditation">Meditation</option>
                        <option value="ayurveda">Ayurveda</option>
                        <option value="travel">Travel</option>
                        <option value="tantra">Tantra</option>
                        <option value="spirituality">Spirituality</option>
                      </select>
                    </div>

                    <Multiselect
                      options={blogCategoryOptions}
                      selectedValues={blogData.subCategories}
                      onSelect={onCatSelect}
                      onRemove={onCatRemove}
                      placeholder="+ Add Sub Categories"
                      id="catOption"
                      isObject={false}
                      className="catDropdown"
                    />
                    <div className="text-center-black">
                      <p>SELECT BLOG TAGS</p>
                    </div>
                    <Multiselect
                      options={blogTagsOptions}
                      selectedValues={blogData.tags}
                      onSelect={onTagSelect}
                      onRemove={onTagRemove}
                      placeholder="+ Add Tags"
                      id="tagOption"
                      isObject={false}
                      className="tagDropdown"
                    />
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-8">
                    <div className="img-style">
                      <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={(e) =>
                          setData({ ...data, title: e.target.value })
                        }
                        placeholder="Blog Title ..."
                        required
                      />
                    </div>
                    <SunEditor
                      height="60vh"
                      setDefaultStyle="font-family: Arial; font-size: 16px;"
                      placeholder="Write your content here ...."
                      onChange={handleEditorChange}
                      defaultValue={data.content}
                      setOptions={{
                        buttonList: buttonList.complex,
                      }}
                      required
                    />
                    <div style={{ justifyContent: "flex-end" }}>
                      <button className="blue-button" onClick={draftPost}>
                        {isDrafting ? "Updating..." : `Draft`}
                      </button>
                      <button className="blue-button" onClick={publishPost}>
                        {isProcessing ? "Updating..." : `Update`}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="hv-center">
                <p>{message}</p>
                <div>
                  <Link href="/user/newpost">
                    <a className="blue-button">New Blog</a>
                  </Link>
                  <Link href="/">
                    <a className="blue-button">Goto Blogs Page</a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ params, req, res }) {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { post: JSON.stringify([]) } };
  }
  try {
    const { id } = params;
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    return {
      props: { post: JSON.stringify(post) },
    };
  } catch {
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

export default SinglePostForEdit;
