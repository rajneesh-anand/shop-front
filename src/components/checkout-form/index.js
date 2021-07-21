import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/client";
import { useCart } from "../../contexts/cart/use-cart";
import { stateOptions, countryOptions } from "../../constant/shipping";

// Paytm Node Integration

const Hiddenfrom = ({ formData }) => {
  return (
    <form
      id="redFrom"
      method="post"
      action={`https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${formData.mid}&orderId=${formData.orderId}`}
      name="paytm"
    >
      <input type="hidden" name="mid" value={formData.mid} />
      <input type="hidden" name="orderId" value={formData.orderId} />
      <input type="hidden" name="txnToken" value={formData.txnToken} />
    </form>
  );
};

// Paytm Node Integration End here

const CheckoutForm = () => {
  const router = useRouter();
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [orderSavedTodatabase, setOrderSavedToDatabase] = useState();
  const [total, setTotal] = useState();
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [session] = useSession();
  const { cartItemsCount, calculatePrice, items } = useCart();
  const [paytmData, setPaytmData] = useState({
    mid: "",
    orderId: "",
    txnToken: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    var amt = 0;
    var tax = 0;
    items.map((item) => {
      let itemAmount = item.quantity * item.price;
      let itemTax = itemAmount * (item.gst / 100);
      amt = amt + itemAmount;
      tax = tax + itemTax;
    });
    setTax(tax.toFixed(2));
    setTotal((amt + tax + shipping).toFixed(2));
  }, [items, shipping]);

  const findShippingCharge = (e) => {
    let stateName = e.target.value;
    if (stateName !== "Select State") {
      let obj = stateOptions.find((o) => o.value === stateName);
      setShipping(obj.shippingCharge);
    } else {
      setShipping(0);
    }
  };

  const handleFormSubmit = async (inputdata, e) => {
    e.preventDefault();
    setProcessingTo(true);
    try {
      const orderData = {
        name: inputdata.name,
        email: session.user.email,
        contact: inputdata.contact,
        address: {
          city: inputdata.city,
          line1: inputdata.address,
          state: inputdata.state,
          postal_code: inputdata.zip,
          country: inputdata.country,
        },
        total_products: cartItemsCount,
        amount: calculatePrice(),
        tax: tax,
        shipping: shipping,
        total_amount: total,
        product_details: items,
      };

      const order = await fetch("/api/paytm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const orderResponse = await order.json();
      console.log(orderResponse);
      setPaytmData({
        mid: "zWEMTK89662017572077",
        orderId: orderResponse.orderId,
        txnToken: orderResponse.txnToken,
      });
      document.getElementById("redFrom").submit();
    } catch (err) {
      console.log(err);
      setProcessingTo(false);
      setOrderSavedToDatabase("Payment Failed !");
    }
  };

  return (
    <>
      <form
        method="POST"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="payment-form"
      >
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <p>Shipping Details</p>
            <div className="row">
              <div className="col-sm-8 col-md-8 col-lg-8">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Your Full Name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Contact Number"
                    {...register("contact", {
                      required: "Contact Number is required",
                    })}
                  />
                  {errors.contact && <p>{errors.contact.message}</p>}
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Address"
                {...register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && <p>{errors.address.message}</p>}
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="City"
                    {...register("city", {
                      required: "City is required",
                    })}
                  />
                  {errors.city && <p>{errors.city.message}</p>}
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    id="zip"
                    type="text"
                    placeholder="Postal Code"
                    {...register("zip", {
                      required: "Pin Code is required",
                    })}
                  />
                  {errors.zip && <p>{errors.zip.message}</p>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <select
                    {...register("state", { required: true })}
                    className="form-select"
                    aria-label="Default select example"
                    onChange={findShippingCharge}
                  >
                    <option value="Select State">Select State</option>
                    {stateOptions.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <select
                    {...register("country", { required: true })}
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue="IN"
                  >
                    {countryOptions.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            {items.map((item) => (
              <div key={item.id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h6>{item.name}</h6>
                  <h4>{(item.quantity * item.price).toFixed(2)}</h4>
                </div>
                {item.gst > 0 && (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h6>TAX</h6>
                    <h4>
                      {(item.quantity * item.price * (item.gst / 100)).toFixed(
                        2
                      )}
                    </h4>
                  </div>
                )}
              </div>
            ))}
            {shipping > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h6>Shipping Charge</h6>
                <h4>{shipping.toFixed(2)}</h4>
              </div>
            )}
            {total > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h6>Total</h6>
                <h4>{total}</h4>
              </div>
            )}

            {orderSavedTodatabase ? (
              <div style={{ color: "red" }}>{orderSavedTodatabase}</div>
            ) : null}
            <div className="text-center">
              <button
                className="blue-button"
                type="submit"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `PAY`}
              </button>
            </div>
          </div>
        </div>
      </form>
      <Hiddenfrom formData={paytmData} />
    </>
  );
};

export default CheckoutForm;
