import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCart } from "../../contexts/cart/use-cart";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";
import { CURRENCY } from "../../constant/currency";

const ProductCard = ({ data }) => {
  const router = useRouter();
  const { addItem, removeItemFromCart, isInCart, items } = useCart();
  const itemIndex = items.findIndex((item) => item.id === data.id);

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addItem(data);
    router.push("/checkout");
  };
  return (
    <div className="product-card">
      <div className="badge">
        {data.discount > 0 && <p>{data.discount}% Off</p>}
      </div>
      <div className="product-thumb">
        <img src={data.images[0]} alt={data.name} />
      </div>
      <div className="product-details">
        <div className="product-name">
          <Link
            href={process.env.PUBLIC_URL + `/product/${data.id}/${data.slug}`}
          >
            <a>{data.name}</a>
          </Link>
        </div>
        <div className="product-desc">
          <Link
            href={process.env.PUBLIC_URL + `/product/${data.id}/${data.slug}`}
          >
            <a>{data.description}</a>
          </Link>
        </div>
        <div className="product-qnty">
          <p>Min - {data.minimumQuantity} Pcs</p>
        </div>
        <div className="product-details-bottom">
          <div className="product-price">
            {JSON.parse(data.price) > JSON.parse(data.sellingPrice) && (
              <small>
                {CURRENCY.INR} {data.price}
              </small>
            )}
            {CURRENCY.INR} {data.sellingPrice} / Pcs
          </div>
          <div>
            {!isInCart(data.id) ? (
              <button className="addTocart" onClick={() => addItem(data)}>
                Add to Cart
              </button>
            ) : (
              // <FaCartPlus onClick={() => addItem(data)} />
              <button
                className="added"
                onClick={() => removeItemFromCart(data)}
              >
                Added
              </button>
              // <FaShoppingCart onClick={() => removeItemFromCart(data)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object,
};

export default ProductCard;
