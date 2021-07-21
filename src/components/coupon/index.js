import React, { useState } from "react";

import { CouponBoxWrapper, Error } from "./Coupon-Style";

const Coupon = ({
  disabled,

  errorMsgFixed = false,
  ...props
}) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const handleApplyCoupon = async () => {
    setError("Invalid Coupon Code !");
  };
  const handleOnChange = (e) => {
    setCode(e.currentTarget.value);
  };
  return (
    <>
      <CouponBoxWrapper>
        <input
          onChange={handleOnChange}
          value={code}
          placeholder="Coupon Code"
        />
        <button onClick={handleApplyCoupon} padding="0 30px">
          Apply
        </button>
      </CouponBoxWrapper>
      {error && <Error errorMsgFixed={errorMsgFixed}>{error}</Error>}
    </>
  );
};

export default Coupon;
