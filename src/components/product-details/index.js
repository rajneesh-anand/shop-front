import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import htmr from "htmr";
import { useCart } from "../../contexts/cart/use-cart";
import { Counter } from "../counter";
import Link from "next/link";

const ProductDetailsPage = ({ data }) => {
  const { addItem, isInCart, items, removeItem } = useCart();
  const itemIndex = items.findIndex((item) => item.id === data.id);
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    if (data.minimumQuantity >= items[itemIndex].quantity) {
      return;
    }
    removeItem(data);
  };

  console.log(items);
  return (
    <>
      <div className="row">
        <div className="col-md-4 col-sm-4 col-xl-4 text-center">
          <img
            src={data.images[0]}
            alt={data.name}
            height="320"
            style={{ paddingTop: 16 }}
          />
        </div>
        <div className="col-md-8 col-sm-8 col-xl-8">
          <div>
            <h6 style={{ padding: 8, fontSize: 20 }}>{data.name}</h6>
          </div>

          <Table style={{ borderColor: "white" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid #ddd",
                    width: "200px",
                  }}
                >
                  Price
                </td>
                <td>{data.price} / Pcs</td>
              </tr>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid #ddd",
                    width: "200px",
                  }}
                >
                  Minimum Quantity
                </td>
                <td>{data.minimumQuantity} Pcs</td>
              </tr>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid #ddd",
                    width: "200px",
                  }}
                >
                  Dimensions (L x B x H) Cm
                </td>
                <td>{data.size} Cm</td>
              </tr>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid #ddd",
                    width: "200px",
                  }}
                >
                  Weight (grams)
                </td>
                <td>{data.weight} Grams</td>
              </tr>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid #ddd",
                    width: "200px",
                  }}
                >
                  Product Details
                </td>
                <td>{data.description} Grams</td>
              </tr>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid #ddd",
                    width: "200px",
                  }}
                >
                  Product Usage
                </td>
                <td> {htmr(data.usage)}</td>
              </tr>
            </tbody>
          </Table>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              borderTop: "1px solid #ddd",
            }}
          >
            {!isInCart(data.id) ? (
              <div>
                <button className="blue-button" onClick={() => addItem(data)}>
                  Add to Cart
                </button>
              </div>
            ) : (
              <Counter
                value={items[itemIndex].quantity}
                onIncrement={handleAddClick}
                onDecrement={handleRemoveClick}
              />
            )}
            <div>
              <Link href="/checkout">
                <a className="buy-button">Buy Now</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <Tabs
          defaultActiveKey="shipping"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="shipping" title="Shipping &amp; Delivery">
            <p>Home</p>
          </Tab>
          <Tab eventKey="return" title="Return &amp; cancellation">
            <p>Profile</p>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default ProductDetailsPage;
