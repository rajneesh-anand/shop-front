import React, { useState } from "react";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import { useSession } from "next-auth/client";
import Link from "next/link";
import dynamic from "next/dynamic";
const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

const UploadPage = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [message, setMessage] = useState();
  const [session, loading] = useSession();
  const [tags, setTags] = useState([]);

  const options = [
    "featured",
    "new added",
    "nature",
    "landscape",
    "people",
    "city",
  ];
  const selectedValues = ["new added"];

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setMessage(null);
  };

  const onSelect = (event) => {
    setTags(event);
  };

  const onRemove = (event) => {
    setTags(event);

    // selectedValues.push(event.target.value);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      return;
    }
    if (tags.length === 0) {
      setTags(["new added"]);
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", session.user.name);
    formData.append("excerpt", "Nature People Fashion Sea");
    formData.append("categories", JSON.stringify(tags));

    const result = await fetch(
      "https://nodappserver.herokuapp.com/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const resultJson = await result.json();
    if (resultJson.msg === "success") {
      setSelectedImage(null);
      setMessage("Image uploaded successfully");
    }
  };

  if (!loading && !session) {
    return (
      <React.Fragment>
        <Layout>
          <SEO
            title="Upload | KokeLiko "
            canonical={process.env.PUBLIC_URL + "/upload"}
          />
          <div className="wrapper home-default-wrapper">
            <Header />

            <div className="main-content">
              <div className="text-center-black">
                <p>Please Sign In to upload photos </p>
                <Link href="/auth/signin">
                  <a>Sign In</a>
                </Link>
              </div>
            </div>
            <Footer />
          </div>
        </Layout>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Layout>
        <SEO title="KokeLiko | Upload" />
        <div className="wrapper home-default-wrapper">
          <Header />

          <div className="main-content">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-md-6">
                  <div className="text-center">
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : null
                      }
                      alt={selectedImage ? selectedImage.name : null}
                      width={250}
                      height={280}
                    />
                    <form>
                      <div style={{ marginTop: 10 }}>
                        <input
                          accept=".jpg, .png, .jpeg"
                          onChange={handleChange}
                          type="file"
                        />
                      </div>
                    </form>

                    <div>
                      {message && (
                        <div>
                          <p style={{ color: "green" }}>{message}</p>
                          <Link href="/photos">
                            <a style={{ border: "solid 1px teal", padding: 6 }}>
                              Goto Photo Gallery
                            </a>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6">
                  <div className="text-center">
                    <Multiselect
                      options={options} // Options to display in the dropdown
                      selectedValues={selectedValues} // Preselected value to persist in dropdown
                      onSelect={onSelect} // Function will trigger on select event
                      onRemove={onRemove} // Function will trigger on remove event
                      placeholder="+ Add Tags"
                      isObject={false}
                    />
                    <div className="text-center">
                      <button type="button" onClick={handleImageUpload}>
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default UploadPage;
