import { Link } from "react-router-dom";
import heroImage from "../assets/images/online-clothing-store.png";
import "../styles/Home.css";

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero" aria-labelledby="home-title">
        <img
          className="hero-image"
          src={heroImage}
          alt=""
          aria-hidden="true"
        />

        <div className="hero-content">
          <p className="hero-tag">Curated Everyday Finds</p>

          <h1 id="home-title">Find your next everyday favorite</h1>

          <p className="hero-copy">
            Discover fresh wardrobe pieces, practical tech, polished jewellery,
            and home essentials in one clean cart.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="shop-btn">
              Shop Now
              <svg
                className="action-icon"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 10h11m-4-5 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link to="/cart" className="cart-btn">
              <svg
                className="action-icon"
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
              View Cart
            </Link>
          </div>

          <ul className="hero-highlights" aria-label="Store highlights">
            <li>Fresh arrivals</li>
            <li>Easy checkout</li>
            <li>Curated picks</li>
          </ul>
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
