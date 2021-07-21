import { useForm } from "react-hook-form";
import React, { Fragment } from "react";

const AppointmentForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
    });


const onSubmit = async (data) => {
    console.log(data)

    try {
      const result = await fetch("/api/contact", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify(data)
      })
     const message = await result.json();
     console.log(message);
       
    } catch (error) {
        // toast error message. whatever you wish 
    }

  }




    // const onSubmit = (data) => console.log(data);
    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"                                                         
                                placeholder="First Name"
                                {...register('fname',{ required: "First Name is required" })}
                            />
                            {errors.fname && <p>{errors.fname.message}</p>}
                        </div>
                    </div>
                     <div className="col-md-3">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"                                                         
                                placeholder="Last Name"
                                {...register('lname',{ required: "Last Name is required" })}
                            />
                            {errors.lname && <p>{errors.lname.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                               
                                placeholder="Type your email address"
                                  {...register('email',{ required: "Email is required",pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "invalid email address",
                                    }})}
                               
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="tel"
                             
                                placeholder="Phone"
                                {...register('phone',{ required: "Phone is required" })}
                            />
                            {errors.phone && <p>{errors.phone.message}</p>}
                        </div>
                    </div>
                      <div className="col-md-12">
                        <div className="form-group">
                            <select
                                className="form-control"
                                // type="select"
                             
                                // placeholder="Subject"
                                {...register('subject',{ required: "Subject is required" })}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select>
                            {errors.subject && <p>{errors.subject.message}</p>}
                        </div>
                    </div>
                    {/* <div className="col-md-3">
                        <div className="form-group datepicker-group">
                            <label
                                htmlFor="datepicker"
                                className="form-label icon icofont-calendar"
                            >
                                <input
                                    className="form-control"
                                    id="datepicker"
                                    type="date"
                                    name="date"
                                    placeholder="Date"
                                    ref={register({
                                        required: "Date is required",
                                    })}
                                />
                            </label>
                            {errors.date && <p>{errors.date.message}</p>}
                        </div>
                    </div> */}
                    <div className="col-md-12">
                        <div className="form-group mb-0">
                            <textarea
                              
                                rows="7"
                                placeholder="Your message here..."
                                {...register('message',{ required: "Message is required" })}
                            ></textarea>
                            {errors.message && <p>{errors.message.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group mb-0">
                            <button className="btn btn-theme" type="submit">
                                Make an appointment
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

export default AppointmentForm;
