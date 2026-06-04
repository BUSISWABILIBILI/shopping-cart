import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");
  const feedbackTimeoutRef = useRef(null);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    return () => {
      window.clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

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
    setFeedback(
      `${quantity} ${quantity === 1 ? "item" : "items"} added to cart`,
    );
    setQuantity(1);
    window.clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = window.setTimeout(() => {
      setFeedback("");
    }, 2200);
  }

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <div className="product-card-content">
        <div className="product-card-top">
          <p className="product-category">{product.category}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>

        <h3>{product.title}</h3>

        <div className="product-card-actions">
          <div className="quantity-row">
            <span className="quantity-label">Qty</span>
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
          </div>

          <button
            type="button"
            className="add-cart-btn"
            onClick={handleAddToCart}
          >
            <svg
              className="add-cart-icon"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 5h2l1.2 7.4a2 2 0 0 0 2 1.6h4.7a2 2 0 0 0 2-1.6l.8-4.4H7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 17h.01M15 17h.01"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            Add To Cart
          </button>
        </div>

        <div className="product-feedback-slot" aria-live="polite">
          {feedback && (
            <p className="product-feedback" role="status">
              {feedback}
            </p>
          )}
        </div>
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
