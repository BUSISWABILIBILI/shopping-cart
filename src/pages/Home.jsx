import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <h1>Welcome to BiliStore</h1>

        <p>Discover premium products at unbeatable prices.</p>

        <Link to="/shop" className="shop-btn">
          Start Shopping
        </Link>
      </section>
    </main>
  );
}
