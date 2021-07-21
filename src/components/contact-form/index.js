import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const ContactForm = () => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [mailMessage, setMailMessage] = useState("");
  const [message, setMessage] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
    if (message !== "") {
      toast.dark(message);
    }
  }, [message]);

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: mailMessage,
    };

    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      const res = await result.json();
      if (res.message === "success") {
        setMessage("Thank you for sending email , We will contact you shortly");
        reset();
        setMailMessage("");
      }
    } catch (error) {
      setMessage("Sorry, We didn't receive your email !");
    }
  };

  return (
    <Fragment>
      <form className="contact-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {message && (
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          )}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder=" Name "
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>

          <div className="col-md-4" data-aos="fade-up" data-aos-delay="600">
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Type your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>

          <div className="col-md-4" data-aos="fade-up" data-aos-delay="900">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder=" Subject"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && <p>{errors.subject.message}</p>}
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-up">
            <div className="form-group mb-0">
              {editorLoaded ? (
                <CKEditor
                  editor={ClassicEditor}
                  data={mailMessage}
                  onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "200px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                    const data = editor.getData();
                    setMailMessage(data);
                  }}
                />
              ) : (
                <p>editor..</p>
              )}
            </div>
          </div>
          <div
            className="col-md-12 text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="form-group mb-0">
              <button className="btn-submit" type="submit">
                Submit Message
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default ContactForm;
