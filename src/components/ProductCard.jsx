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
      <div className="product-media">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <div className="product-card-content">
        <div className="product-card-top">
          <p className="product-category">{product.category}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>

        <h3>{product.title}</h3>

        <div
          className="quantity-controls"
          aria-label={`Choose quantity for ${product.title}`}
        >
          <button
            type="button"
            onClick={decreaseQuantity}
            aria-label={`Decrease quantity for ${product.title}`}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            aria-label={`Quantity for ${product.title}`}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button
            type="button"
            onClick={increaseQuantity}
            aria-label={`Increase quantity for ${product.title}`}
          >
            +
          </button>
        </div>

        <button type="button" className="add-cart-btn" onClick={handleAddToCart}>
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
