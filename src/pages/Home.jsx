import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";
import "../styles/Home.css";

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero" aria-labelledby="home-title">
        <img src={heroImage} alt="" className="hero-art" aria-hidden="true" />

        <div className="hero-content">
          <p className="hero-tag">Curated Everyday Finds</p>

          <h1 id="home-title">Shop products that fit your day</h1>

          <p className="hero-copy">
            Browse electronics, fashion, jewellery, and everyday essentials in
            one clean cart.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="shop-btn">
              Shop Now
            </Link>
            <Link to="/cart" className="cart-btn">
              View Cart
            </Link>
          </div>
        </div>
      </section>

      <section className="category-strip" aria-label="Featured categories">
        <article>
          <span>01</span>
          <h2>Electronics</h2>
          <p>Practical tech for work, travel, and home.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Style</h2>
          <p>Clean basics, finishing pieces, and daily wear.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Jewellery</h2>
          <p>Small details with a polished, personal finish.</p>
        </article>
      </section>
    </main>
  );
}
