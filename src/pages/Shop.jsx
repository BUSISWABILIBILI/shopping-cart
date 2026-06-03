import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/productsApi";
import "../styles/Shop.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    loadProducts();
  }, []);

  if (status === "loading") {
    return <p className="page-message">Loading products...</p>;
  }

  if (status === "error") {
    return <p className="page-message">Failed to load products.</p>;
  }

  return (
    <main className="shop-page">
      <section className="shop-header">
        <div>
          <p className="shop-eyebrow">Shop Collection</p>
          <h1>Choose Your Favourite Products</h1>
        </div>
        <p className="shop-meta">{products.length} products available</p>
      </section>

      <section className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
