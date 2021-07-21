import React, { useState } from "react";
import Link from "next/link";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import OffcanvasTitle from "react-bootstrap/OffcanvasTitle";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CartItem } from "./CartItem";
import { useCart } from "../../contexts/cart/use-cart";
import { MdRemoveShoppingCart } from "react-icons/md";
import { CURRENCY } from "../../constant/currency";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

const SideBarCart = ({ show, handleClose }) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice,
    getItem,
  } = useCart();

  const [hasCoupon, setCoupon] = useState(false);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className="cart-sidebar"
    >
      <OffcanvasHeader className="cart-header">
        <OffcanvasTitle>Shopping Cart</OffcanvasTitle>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Close</Tooltip>}
        >
          <button onClick={handleClose}>X</button>
        </OverlayTrigger>
      </OffcanvasHeader>

      <OffcanvasBody>
        {!!cartItemsCount ? (
          items.map((item) => (
            <div key={item.id}>
              <CartItem
                onIncrement={() => addItem(item)}
                onDecrement={() => removeItem(item)}
                onRemove={() => removeItemFromCart(item)}
                data={item}
              />
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <MdRemoveShoppingCart
              style={{ height: 64, width: 64, color: "grey" }}
            />
            <p>Your cart is empty , Please Add products in your cart.</p>
            <Link href="/shop">
              <a className="blue-button">Add Product</a>
            </Link>
          </div>
        )}

        {cartItemsCount !== 0 && (
          <>
            <div className="checkout-footer">
              <h6>Sub Total</h6>
              <h6>
                {CURRENCY.INR} {calculatePrice()}
              </h6>
            </div>
            <div className="text-center">
              <Link href="/checkout">
                <a className="checkout-button">CHECKOUT</a>
              </Link>
            </div>
          </>
        )}
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default SideBarCart;
