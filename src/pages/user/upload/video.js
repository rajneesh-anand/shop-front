import React, { useState } from "react";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import { useSession } from "next-auth/client";
import Link from "next/link";
import slugify from "slugify";
import dynamic from "next/dynamic";
const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

const UploadVideo = () => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedMedia, setSelectedMedia] = useState();
  const [message, setMessage] = useState();
  const [title, setTitle] = useState();
  const [duration, setDuration] = useState();
  const [session, loading] = useSession();
  const [cat, setCats] = useState([]);

  const options = ["Horror", "Drama", "Romance", "Comedy", "Thriller"];
  const selectedValues = ["Drama"];

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setMessage(null);
  };

  const handleMediaChange = (event) => {
    setSelectedMedia(event.target.files[0]);
    setMessage(null);
  };

  const onSelect = (event) => {
    setCats(event);
  };

  const onRemove = (event) => {
    setCats(event);
  };

  const handleVideoUpload = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      return;
    }

    setProcessingTo(true);
    const formData = new FormData();
    formData.append("poster", selectedImage);
    formData.append("title", title);
    formData.append("time", duration);
    formData.append("media", selectedMedia);
    formData.append(
      "categories",
      cat.length === 0 ? JSON.stringify(selectedValues) : JSON.stringify(cat)
    );
    formData.append(
      "slug",
      slugify(title, {
        remove: /[*+~.()'"!:@,]/g,
        lower: true,
      })
    );
    formData.append("status", true);
    formData.append("author", session?.user?.email);
    //"https://nodappserver.herokuapp.com/api/awsupload";
    // "http://localhost:8080/api/awsupload",
    const result = await fetch(
      "https://nodappserver.herokuapp.com/api/awsupload",
      {
        method: "POST",
        body: formData,
      }
    );
    const resultJson = await result.json();
    if (resultJson.msg === "success") {
      setMessage("Movie uploaded successfully");
      setProcessingTo(false);
      event.target.reset();
    }
  };

  return loading ? (
    <div className="hv-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : !session ? (
    <React.Fragment>
      <Layout>
        <SEO
          title="Video Upload | KokeLiko "
          canonical={process.env.PUBLIC_URL + "/user/video"}
        />
        <div className="wrapper home-default-wrapper">
          <Header />
          <div className="main-content">
            <div className="hv-center">
              <p>Please Sign In to upload Videos</p>
              <Link href="/auth/signin">
                <a className="blue-button"> Sign In</a>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Layout>
        <SEO
          title="Video Upload | KokeLiko "
          canonical={process.env.PUBLIC_URL + "/user/video"}
        />
        <div className="wrapper home-default-wrapper">
          <Header />
          <div className="main-content">
            <div className="container">
              <form onSubmit={handleVideoUpload}>
                <div className="row">
                  <div className="col-sm-4 col-md-4">
                    <div className="text-center movie">
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
                      <div className="poster-file">
                        <label htmlFor="poster">Pick Poster Image</label>
                        <input
                          type="file"
                          id="poster"
                          required
                          accept=".jpg, .png, .jpeg"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-8 col-md-8 movie">
                    <div className="movie-file">
                      <label htmlFor="movie">
                        Pick Movie File (.mp4 / .avi )
                      </label>
                      <input
                        type="file"
                        id="movie"
                        required
                        onChange={handleMediaChange}
                      />
                    </div>
                    <div>
                      <input
                        id="title"
                        type="text"
                        required
                        placeholder="Name of the Movie"
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        id="duration"
                        type="text"
                        placeholder="Running time (example : 1 hour 30 min)"
                        required
                        onChange={(event) => setDuration(event.target.value)}
                      />
                    </div>
                    <div>
                      <Multiselect
                        options={options}
                        selectedValues={selectedValues}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        placeholder="+ Add Category"
                        isObject={false}
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="blue-button">
                        {isProcessing ? "Uploading..." : `Upload`}
                      </button>
                    </div>
                    {message && (
                      <div className="text-center">
                        <p style={{ color: "green" }}>{message}</p>
                        <Link href="/movie">
                          <a style={{ border: "solid 1px teal", padding: 6 }}>
                            Goto Movie Gallery
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default UploadVideo;
