import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is currently empty.</p>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {cartItems.map((item) => (
          <article key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />

            <div className="cart-details">
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>

              <div className="cart-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ${total}</h2>
      </div>
    </main>
  );
}
