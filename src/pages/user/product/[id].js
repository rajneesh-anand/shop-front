import React, { useState, useRef, useEffect } from "react";
import slugify from "slugify";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import { useSession, getSession } from "next-auth/client";
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

const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

const ProductEdit = ({ post }) => {
  const productData = JSON.parse(post);

  const data = {
    gst: productData.gst,
    stock: productData.inStock ? "Yes" : "No",
    usage: productData.usage,
    category: productData.category,
  };
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [selectedImage, setSelectedImage] = useState();
  const [isProcessing, setProcessingTo] = useState(false);
  const [message, setMessage] = useState();
  const [session, loading] = useSession();
  const [subCat, setSubCat] = useState(productData.subCategories);
  const [usage, setUsage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
    setValue("product", productData.name);
    setValue("productdesc", productData.description);
    setValue("size", productData.size);
    setValue("weight", productData.weight);
    setValue("price", productData.price);
    setValue("sprice", productData.sellingPrice);
    setValue("minqty", productData.minimumQuantity);
  }, []);

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
      const result = await fetch(
        `http://localhost:8080/api/product/${productData.id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const resultJson = await result.json();

      if (resultJson.msg === "success") {
        setProcessingTo(false);
        setMessage("Product updated successfully");
      }
    } catch (error) {
      console.log(error);
      setProcessingTo(false);
      setMessage(error);
    }
  };

  return loading ? (
    <Loading />
  ) : !session ? (
    <Layout>
      <SEO
        title="Product | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/user/product"}
      />
      <div className="wrapper">
        <Header />
        <MessageBox>
          <MessageTitle>Kindly Sign In to upload the product</MessageTitle>
          <Link href="/auth/signin">
            <AnchorButton>Sign In</AnchorButton>
          </Link>
        </MessageBox>
        <Footer />
      </div>
    </Layout>
  ) : (
    <Layout>
      <SEO
        title="Product | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/user/product"}
      />
      <div className="wrapper">
        <Header />
        <div className="container">
          {message ? (
            <MessageBox>
              <MessageTitle color="green">{message}</MessageTitle>
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
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <div className="text-center-black">
                    <p>SELECT PRODUCT IMAGE</p>
                  </div>
                  <div className="img-style">
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : productData.image
                      }
                      alt={productData.name}
                      height={280}
                    />
                    <div style={{ marginTop: 10 }}>
                      <input
                        accept=".jpg, .png, .jpeg"
                        onChange={handleChange}
                        type="file"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-8">
                  <div className="form-group">
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
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Product Description"
                      {...register("productdesc", {
                        required: "Product Description is required",
                      })}
                    />
                    {errors.productdesc && <p>{errors.productdesc.message}</p>}
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
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
                    <div className="col-5">
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
                    <div className="col-5">
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

                    <div className="col-2">
                      <label>GST Rate</label>
                      <div className="form-group">
                        <select
                          {...register("gst")}
                          className="form-select"
                          aria-label="Default select example"
                          defaultValue={data.gst}
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
                    <div className="col-6">
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
                      <div className="form-group">
                        <select
                          {...register("stock")}
                          className="form-select"
                          aria-label="Default select example"
                          defaultValue={data.stock}
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
                      <label>Category</label>
                      <div className="form-group">
                        <select
                          {...register("category", { required: true })}
                          className="form-select"
                          aria-label="Default select example"
                          defaultValue={data.category}
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
                      <label>Sub Category</label>
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
                    <div className="col">
                      <label>Product Usage</label>
                      <div className="form-group">
                        {editorLoaded ? (
                          <CKEditor
                            editor={ClassicEditor}
                            data={data.usage}
                            onReady={(editor) => {
                              console.log("Editor is ready to use!", editor);
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
                  </div>

                  <div className="text-center">
                    <button className="blue-button" type="submit">
                      {isProcessing ? "Updating..." : `Update`}
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
  );
};

export async function getServerSideProps({ params, req, res }) {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { post: JSON.stringify([]) } };
  }
  try {
    const { id } = params;
    const post = await prisma.product.findFirst({
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

export default ProductEdit;
