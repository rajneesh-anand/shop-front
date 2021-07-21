import PropTypes from "prop-types";
import { useCart } from "../../../contexts/cart/use-cart";
import { Counter } from "../../../components/counter";
import { useRouter } from "next/router";
import Link from "next/link";

const ProductCard = ({ data }) => {
  const { addItem, removeItem, getItem, isInCart, items } = useCart();
  const itemIndex = items.findIndex((item) => item.id === data.id);
  console.log(items[itemIndex]);

  const router = useRouter();
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
  const handleBuyNow = (e) => {
    e.stopPropagation();
    addItem(data);
    router.push("/checkout");
  };
  return (
    <div className="content">
      <img src={data.image} alt={data.name} />
      <p className="name">{data.name}</p>
      <p className="desc">{data.description}</p>
      <h6>${data.price}</h6>
      <div className="buy-now">
        <button className="buy-button" onClick={handleBuyNow}>
          Buy Now
        </button>
        {!isInCart(data.id) ? (
          <button className="buy-button" onClick={() => addItem(data)}>
            Add to Cart
          </button>
        ) : (
          // <Counter
          //   value={items[itemIndex].quantity}
          //   onIncrement={handleAddClick}
          //   onDecrement={handleRemoveClick}
          // />
          <button className="buy-button-added">Item Added</button>
        )}
      </div>

      <Link href={process.env.PUBLIC_URL + `/product/${data.id}/${data.slug}`}>
        <a className="blue-button">Detail</a>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object,
};

export default ProductCard;
