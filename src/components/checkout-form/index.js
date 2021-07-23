import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/client";
import { useCart } from "../../contexts/cart/use-cart";
import { stateOptions, countryOptions } from "../../constant/shipping";
import { CURRENCY } from "../../constant/currency";
import Card from "react-bootstrap/Card";
// Paytm Node Integration

const Hiddenfrom = ({ formData }) => {
  return (
    <form
      id="redFrom"
      method="post"
      action={`https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${formData.mid}&orderId=${formData.orderId}`}
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
        mid: "WJjFco25285429194621",
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
          <div className="col-sm-8 col-md-8 col-lg-8 ">
            <Card>
              <Card.Body>
                <Card.Subtitle className="mb-2 ">
                  Shipping Address
                </Card.Subtitle>

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
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Accepts only numbers",
                          },
                        })}
                      />
                      {errors.contact && <p>{errors.contact.message}</p>}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
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
                  </div>
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
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <Card>
              <Card.Body>
                <Card.Subtitle className="mb-2">Order Details</Card.Subtitle>

                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      width: "100%",
                      borderTop: "1px solid #ddd",
                      paddingTop: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h6>{item.name}</h6>
                      <h6>
                        {CURRENCY.INR}
                        {(item.quantity * item.price).toFixed(2)}
                      </h6>
                    </div>
                    {item.gst > 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <h6>Gst @ {item.gst} %</h6>
                        <h6>
                          {CURRENCY.INR}
                          {(
                            item.quantity *
                            item.price *
                            (item.gst / 100)
                          ).toFixed(2)}
                        </h6>
                      </div>
                    )}
                  </div>
                ))}
                {shipping > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 8,
                      borderTop: "1px solid #ddd",
                      paddingTop: 8,
                      width: "100%",
                    }}
                  >
                    <h6>Shipping Charge</h6>
                    <h6>
                      {CURRENCY.INR}
                      {shipping.toFixed(2)}
                    </h6>
                  </div>
                )}

                {total > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 8,
                      borderTop: "1px solid #ddd",
                      paddingTop: 8,
                      width: "100%",
                    }}
                  >
                    <h6>Total Amount</h6>
                    <h6>
                      {CURRENCY.INR}
                      {total}
                    </h6>
                  </div>
                )}

                <div
                  className="text-center"
                  style={{
                    marginTop: 8,
                    borderTop: "1px solid #ddd",
                    paddingTop: 8,
                    width: "100%",
                  }}
                >
                  <button
                    className="blue-button"
                    type="submit"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : ` Place Order `}
                  </button>
                </div>
              </Card.Body>
            </Card>

            {orderSavedTodatabase ? (
              <div style={{ color: "red" }}>{orderSavedTodatabase}</div>
            ) : null}
          </div>
        </div>
      </form>
      <Hiddenfrom formData={paytmData} />
    </>
  );
};

export default CheckoutForm;
