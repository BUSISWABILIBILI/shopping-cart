import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import "../styles/Cart.css";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal;
  const itemLabel = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;

  function handleCheckout() {
    clearCart();
    setCheckoutComplete(true);
  }

  if (checkoutComplete) {
    return (
      <main className="cart-page cart-page-empty">
        <section className="cart-empty-state cart-success-state" role="status">
          <div className="cart-empty-icon cart-success-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="m5 12 4 4L19 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="cart-eyebrow">Checkout Complete</p>
          <h1>Order confirmed</h1>
          <p>Your cart has been cleared.</p>
          <p className="empty-cart-copy">
            Thanks for shopping with BiliStore.
          </p>
          <Link to="/shop" className="empty-shop-link">
            Continue Shopping
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 10h11m-4-5 5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </section>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="cart-page cart-page-empty">
        <section className="cart-empty-state">
          <div className="cart-empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 6h2l1.6 9.2a2 2 0 0 0 2 1.8h6.8a2 2 0 0 0 2-1.7L20.5 9H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 20h.01M18 20h.01"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="cart-eyebrow">Your Cart</p>
          <h1>Your cart is waiting</h1>
          <p>Your cart is currently empty.</p>
          <p className="empty-cart-copy">
            Add products from the shop and they will appear here with quantities,
            item totals, and checkout details ready to review.
          </p>
          <Link to="/shop" className="empty-shop-link">
            Browse Products
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 10h11m-4-5 5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-header">
        <div>
          <p className="cart-eyebrow">Your Cart</p>
          <h1>Review your cart</h1>
        </div>
        <p className="cart-count-pill">{itemLabel}</p>
      </section>

      <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {cartItems.map((item) => (
            <article key={item.id} className="cart-item">
              <div className="cart-item-media">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="cart-details">
                <div>
                  <p className="cart-item-category">{item.category}</p>
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">
                    {formatPrice(item.price)} each
                  </p>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-quantity-block">
                    <span className="cart-quantity-label">Quantity</span>
                    <div className="cart-controls">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label={`Decrease quantity for ${item.title}`}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity for ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-line-total">
                    <span>Item total</span>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary" aria-label="Cart summary">
          <p className="summary-label">Order Summary</p>
          <div className="summary-row">
            <span>Items</span>
            <strong>{itemLabel}</strong>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>Calculated at checkout</strong>
          </div>
          <div className="summary-total">
            <span>Estimated total</span>
            <h2>Total: {formatPrice(total)}</h2>
          </div>
          <button type="button" className="checkout-btn" onClick={handleCheckout}>
            Checkout
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 10h11m-4-5 5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link to="/shop" className="continue-link">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
