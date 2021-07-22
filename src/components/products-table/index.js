import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCart } from "../../contexts/cart/use-cart";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";
import { CURRENCY } from "../../constant/currency";
import { Table } from "react-bootstrap";

const ProductsTable = ({ data }) => {
  console.log(data);

  const orderDate = (order_date) => {
    let date = new Date(order_date);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  return (
    <Table responsive>
      <thead>
        <tr>
          <th></th>
          <th>Product Image</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>Order Date</th>
          <th>Order Number</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            {item.ProductDetails.map((product) => (
              <>
                <td>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    height="80"
                    width="80"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
              </>
            ))}

            <td>
              {CURRENCY.INR}
              {item.TotalAmount}
            </td>
            <td>{orderDate(item.createdAt)}</td>
            <td>{item.OrderNumber}</td>
            <td
              style={{
                color: item.OrderStatus === "Delivered" ? "green" : "red",
              }}
            >
              {item.OrderStatus}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductsTable;
