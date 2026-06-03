import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        <span className="logo-mark" aria-hidden="true">
          B
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
