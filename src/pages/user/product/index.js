import React, { useState, useRef, useEffect } from "react";
import slugify from "slugify";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import { useSession } from "next-auth/client";
import Loading from "../../../components/loading";
import {
  MessageBox,
  MessageTitle,
  AnchorButton,
} from "../../../components/messagebox";
import Link from "next/link";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import {
  productSubCategoryOptions,
  productCategoryOptions,
} from "../../../constant/product";
import { auto } from "@popperjs/core";

const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

const Product = () => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [selectedImage, setSelectedImage] = useState();
  const [isProcessing, setProcessingTo] = useState(false);
  const [message, setMessage] = useState();
  const [session, loading] = useSession();
  const [subCat, setSubCat] = useState([]);
  const [usage, setUsage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push("/auth/signin");
      }
    }
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, [session, loading]);

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setMessage(null);
  };
  const subCatSelectedValues = ["Yoga"];

  const onCatSelect = (event) => {
    setSubCat(event);
  };

  const onCatRemove = (event) => {
    setSubCat(event);
  };

  const onSubmit = async (data, e) => {
    if (!selectedImage) {
      return;
    }
    setProcessingTo(true);
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("product_name", data.product);
    formData.append("mrp_price", data.price);
    formData.append("selling_price", data.sprice);
    formData.append(
      "discount",
      ((data.price - data.sprice) / data.price) * 100
    );
    formData.append("gst", data.gst);
    formData.append("description", data.productdesc);
    formData.append("size", data.size);
    formData.append("weight", data.weight);
    formData.append("minimum_quantity", data.minqty);
    formData.append("category", data.category);
    formData.append(
      "sub_category",
      subCat.length === 0
        ? JSON.stringify(subCatSelectedValues)
        : JSON.stringify(subCat)
    );
    formData.append("stock", data.stock === "No" ? false : true);
    formData.append("usage", usage);
    formData.append(
      "slug",
      slugify(data.product, {
        remove: /[*+~.()'"!:@,]/g,
        lower: true,
      })
    );

    try {
      const result = await fetch("http://localhost:8080/api/product", {
        method: "POST",
        body: formData,
      });
      const resultJson = await result.json();

      if (resultJson.msg === "success") {
        setProcessingTo(false);
        setMessage("Product uploaded successfully");
      }
    } catch (error) {
      console.log(error);
      setProcessingTo(false);
      setMessage(error);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    session && (
      <Layout>
        <SEO
          title="Add Product | Gulshan "
          canonical={process.env.PUBLIC_URL + "/user/product"}
        />
        <div className="wrapper">
          <Header classOption="hb-border" />
          <div className="container">
            {message ? (
              <MessageBox>
                <MessageTitle>{message}</MessageTitle>
                <Link href="/user/product">
                  <AnchorButton>Add New Product</AnchorButton>
                </Link>
              </MessageBox>
            ) : (
              <form
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                className="product-form"
              >
                <div className="row">
                  <div className="col-md-4 col-lg-4">
                    <div className="text-center-black">
                      <p>SELECT PRODUCT IMAGE</p>
                    </div>
                    <div className="img-style">
                      <img
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : null
                        }
                        alt={selectedImage ? selectedImage.name : null}
                      />
                      <div style={{ marginTop: 10 }}>
                        <input
                          accept=".jpg, .png, .jpeg"
                          onChange={handleChange}
                          type="file"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8 col-lg-8">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>Product Name</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Product Name"
                            {...register("product", {
                              required: "Product Name is required",
                            })}
                          />
                          {errors.product && <p>{errors.product.message}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <label>Product Description</label>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Product Description"
                            {...register("productdesc", {
                              required: "Product Description is required",
                            })}
                          />
                          {errors.productdesc && (
                            <p>{errors.productdesc.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label>Size (L X B X H)</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Product Size ( L x B x H)"
                            {...register("size")}
                          />
                          {errors.size && <p>{errors.size.message}</p>}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Weight (Grams)</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Unit Weight - Grams"
                            {...register("weight", {
                              pattern: {
                                value: /^([\d]{0,6})(\.[\d]{1,2})?$/,
                                message: "Accept only decimal numbers",
                              },
                            })}
                          />
                          {errors.weight && <p>{errors.weight.message}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label>Maximum Retail Price</label>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Unit Price"
                            {...register("price", {
                              required: "MRP Price is required",
                              pattern: {
                                value: /^([\d]{0,6})(\.[\d]{1,2})?$/,
                                message: "Accept only decimal numbers",
                              },
                            })}
                          />
                          {errors.price && <p>{errors.price.message}</p>}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Your Selling Price</label>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Unit Price"
                            {...register("sprice", {
                              required: "Selling price is required",
                              pattern: {
                                value: /^([\d]{0,6})(\.[\d]{1,2})?$/,
                                message: "Accept only decimal numbers",
                              },
                            })}
                          />
                          {errors.sprice && <p>{errors.sprice.message}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label>Minimum Quantity</label>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Minimum Quantity"
                            {...register("minqty", {
                              required: "Minimum Qnty is required",
                              pattern: {
                                value: /^([1-9]\d{0,5})*$/,
                                message: "Accept number greater than 0",
                              },
                            })}
                          />
                          {errors.minqty && <p>{errors.minqty.message}</p>}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>In Stock ?</label>
                        <div className="form-group">
                          <select
                            {...register("stock")}
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="Stock Available"
                          >
                            <option value="Stock Available">
                              Stock Available
                            </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Product Category</label>
                        <div className="form-group">
                          <select
                            {...register("category", { required: true })}
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="Mobile"
                          >
                            {productCategoryOptions.map((item, i) => (
                              <option key={i} value={item.value}>
                                {item.text}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Product Sub Category</label>
                        <div className="form-group">
                          <Multiselect
                            options={productSubCategoryOptions}
                            selectedValues={subCatSelectedValues}
                            onSelect={onCatSelect}
                            onRemove={onCatRemove}
                            placeholder="+ Add Sub Category"
                            id="catOption"
                            isObject={false}
                            className="catDrowpdown"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <label>GST Rate</label>
                        <div className="form-group">
                          <select
                            {...register("gst")}
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue="18"
                          >
                            <option value="18">18 %</option>
                            <option value="3">3 %</option>
                            <option value="5">5 %</option>
                            <option value="12">12 %</option>
                            <option value="18">18 %</option>
                            <option value="28">28 %</option>
                            <option value="0">Exempted</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label>Product Usage</label>
                        {editorLoaded ? (
                          <CKEditor
                            editor={ClassicEditor}
                            data={usage}
                            onReady={(editor) => {
                              editor.editing.view.change((writer) => {
                                writer.setStyle(
                                  "height",
                                  "160px",
                                  editor.editing.view.document.getRoot()
                                );
                              });
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setUsage(data);
                            }}
                          />
                        ) : (
                          <p>editor..</p>
                        )}
                      </div>
                    </div>

                    <div className="text-center" style={{ margin: 8 }}>
                      <button className="blue-button" type="submit">
                        {isProcessing ? "Uploading..." : `Upload`}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
          <Footer />
        </div>
      </Layout>
    )
  );
};

export default Product;
