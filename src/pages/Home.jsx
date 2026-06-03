import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <p className="hero-tag">Modern Shopping Experience</p>

        <h1>
          Discover Amazing Products
          <br />
          At Amazing Prices
        </h1>

        <p>
          Shop electronics, fashion, jewellery, and more from our curated
          collection.
        </p>

        <Link to="/shop" className="shop-btn">
          Explore Products
        </Link>
      </section>
    </main>
  );
}
