import { useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function handleQuantityChange(e) {
    const value = Number(e.target.value);
    setQuantity(value < 1 ? 1 : value);
  }

  function handleAddToCart() {
    addToCart(product, quantity);
    setQuantity(1);
  }

  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} />

      <div className="product-card-content">
        <h3>{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <div className="quantity-controls">
          <button onClick={decreaseQuantity}>-</button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button onClick={increaseQuantity}>+</button>
        </div>

        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
