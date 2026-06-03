import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        BiliStore
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/cart" className="cart-link">
          Cart
          <span className="cart-badge">{cartCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}
