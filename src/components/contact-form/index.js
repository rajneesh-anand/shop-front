import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const message = await result.json();
      console.log(message);
    } catch (error) {
      // toast error message. whatever you wish
    }
  };

  return (
    <Fragment>
      <form
        className="contact-form-wrapper"
        action="/api/contact"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
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
              <textarea
                rows="7"
                placeholder="Your message here..."
                {...register("message", { required: "Message is required" })}
              ></textarea>
              {errors.message && <p>{errors.message.message}</p>}
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
