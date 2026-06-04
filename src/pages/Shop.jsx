import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/productsApi";
import "../styles/Shop.css";

const SKELETON_CARD_COUNT = 8;

function formatCategory(category) {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ProductSkeleton() {
  return (
    <article className="product-skeleton" data-testid="product-skeleton">
      <div className="skeleton-block skeleton-media" />
      <div className="skeleton-row">
        <div className="skeleton-block skeleton-pill" />
        <div className="skeleton-block skeleton-price" />
      </div>
      <div className="skeleton-block skeleton-title" />
      <div className="skeleton-block skeleton-title short" />
      <div className="skeleton-row controls">
        <div className="skeleton-block skeleton-stepper" />
        <div className="skeleton-block skeleton-stepper wide" />
        <div className="skeleton-block skeleton-stepper" />
      </div>
      <div className="skeleton-block skeleton-button" />
    </article>
  );
}

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("featured");

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch =
          !normalizedSearch ||
          product.title.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch);

        return matchesCategory && matchesSearch;
      })
      .sort((firstProduct, secondProduct) => {
        if (sortOrder === "price-low") {
          return firstProduct.price - secondProduct.price;
        }

        if (sortOrder === "price-high") {
          return secondProduct.price - firstProduct.price;
        }

        if (sortOrder === "name") {
          return firstProduct.title.localeCompare(secondProduct.title);
        }

        return firstProduct.id - secondProduct.id;
      });
  }, [products, searchTerm, selectedCategory, sortOrder]);

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
    return (
      <main className="shop-page" aria-busy="true">
        <section className="shop-header">
          <div>
            <p className="shop-eyebrow">Shop Collection</p>
            <h1>Choose Your Favourite Products</h1>
          </div>
          <p className="shop-meta" role="status">
            Loading products...
          </p>
        </section>

        <section className="shop-controls shop-controls-loading" aria-hidden="true">
          <div className="shop-control">
            <div className="skeleton-block skeleton-label" />
            <div className="skeleton-block skeleton-input" />
          </div>
          <div className="shop-control">
            <div className="skeleton-block skeleton-label" />
            <div className="skeleton-block skeleton-input" />
          </div>
          <div className="shop-control">
            <div className="skeleton-block skeleton-label" />
            <div className="skeleton-block skeleton-input" />
          </div>
        </section>

        <section className="product-grid" aria-hidden="true">
          {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </section>
      </main>
    );
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
        <p className="shop-meta">
          {filteredProducts.length} of {products.length} products shown
        </p>
      </section>

      <section className="shop-controls" aria-label="Product filters">
        <div className="shop-control shop-search">
          <label htmlFor="product-search">Search</label>
          <input
            id="product-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products"
          />
        </div>

        <div className="shop-control">
          <label htmlFor="product-category">Category</label>
          <select
            id="product-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {formatCategory(category)}
              </option>
            ))}
          </select>
        </div>

        <div className="shop-control">
          <label htmlFor="product-sort">Sort</label>
          <select
            id="product-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </section>

      {filteredProducts.length === 0 && (
        <section className="no-products" aria-live="polite">
          <h2>No products found</h2>
          <p>Try a different search or category.</p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSortOrder("featured");
            }}
          >
            Clear Filters
          </button>
        </section>
      )}

      <section className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
