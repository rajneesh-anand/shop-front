import React from "react";
import { Counter } from "../counter";
import { CURRENCY } from "../../constant/currency";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap";

export const CartItem = ({ data, onDecrement, onIncrement, onRemove }) => {
  const { name, images, price, salePrice, quantity } = data;
  const displayPrice = salePrice ? salePrice : price;

  return (
    <div className="row cart-item">
      <div className="col-auto">
        <img src={images[0]} alt={name} height="78" width="70" />
      </div>
      <div className="col">
        <div className="row">
          <h6 className="product-name">{name}</h6>
        </div>
        <div className="row">
          <div className="col">
            <p className="price">
              {CURRENCY.INR} {price} X
            </p>
          </div>
          <div className="col">
            <Counter
              value={quantity}
              onDecrement={
                data.minimumQuantity >= data.quantity ? null : onDecrement
              }
              onIncrement={onIncrement}
              variant="smallHorizontal"
            />
          </div>
        </div>
      </div>
      <div className="col-auto">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="button-tooltip-2">Remove</Tooltip>}
        >
          <button className="close" onClick={onRemove}>
            X
          </button>
        </OverlayTrigger>
        <p className="price">
          {CURRENCY.INR} {quantity * price}
        </p>
      </div>
    </div>
  );
};
