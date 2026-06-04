import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        <span className="logo-mark" aria-hidden="true">
          <svg
            className="logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
        </span>
        <span>BiliStore</span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/cart" className="cart-link">
          Cart ({cartCount})
        </NavLink>
      </nav>
    </header>
  );
}
