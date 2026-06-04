import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import "../styles/Cart.css";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <main className="cart-page cart-page-empty">
        <section className="cart-empty-state">
          <p className="cart-eyebrow">Your Cart</p>
          <h1>Your Cart</h1>
          <p>Your cart is currently empty.</p>
          <Link to="/shop" className="continue-link">
            Start Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-header">
        <p className="cart-eyebrow">Your Cart</p>
        <h1>Your Cart</h1>
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
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-controls">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease quantity for ${item.title}`}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity for ${item.title}`}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-line-total">
                    {formatPrice(item.price * item.quantity)}
                  </p>
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
            <strong>{itemCount}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>Calculated at checkout</strong>
          </div>
          <h2>Total: {formatPrice(total)}</h2>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
          <Link to="/shop" className="continue-link">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
