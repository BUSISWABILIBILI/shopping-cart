import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCurrency } from "../context/CurrencyContext";
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
      <div className="skeleton-row skeleton-actions">
        <div className="skeleton-block skeleton-label compact" />
        <div className="skeleton-block skeleton-stepper wide" />
      </div>
      <div className="skeleton-block skeleton-button" />
      <div className="skeleton-block skeleton-feedback" />
    </article>
  );
}

function ShopStateIcon({ type }) {
  if (type === "error") {
    return (
      <div className="shop-state-icon error" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8v5m0 3h.01M10.3 4.9 3.4 17a2 2 0 0 0 1.7 3h13.8a2 2 0 0 0 1.7-3L13.7 4.9a2 2 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="shop-state-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M10.5 18a7.5 7.5 0 1 1 5.3-2.2L21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 10.5h5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("featured");
  const { currency, currencyOptions, setCurrency } = useCurrency();

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

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "all" ||
    sortOrder !== "featured";

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOrder("featured");
  }

  const loadProducts = useCallback(async () => {
    setStatus("loading");

    try {
      const data = await fetchProducts();
      setProducts(data);
      setStatus("success");
    } catch {
      setProducts([]);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    let isCurrent = true;

    async function loadInitialProducts() {
      try {
        const data = await fetchProducts();

        if (!isCurrent) {
          return;
        }

        setProducts(data);
        setStatus("success");
      } catch {
        if (!isCurrent) {
          return;
        }

        setProducts([]);
        setStatus("error");
      }
    }

    loadInitialProducts();

    return () => {
      isCurrent = false;
    };
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

        <section
          className="shop-controls shop-controls-loading"
          aria-hidden="true"
        >
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
    return (
      <main className="shop-page">
        <section className="shop-header">
          <div>
            <p className="shop-eyebrow">Shop Collection</p>
            <h1>Choose Your Favourite Products</h1>
          </div>
        </section>

        <section className="shop-state" role="alert">
          <ShopStateIcon type="error" />
          <p className="shop-state-kicker">Collection unavailable</p>
          <h2>We couldn't load the products</h2>
          <p>
            The store catalog did not respond. Check your connection and try
            again.
          </p>
          <button type="button" onClick={loadProducts}>
            Try Again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="shop-page">
      <section className="shop-header">
        <div>
          <p className="shop-eyebrow">Shop Collection</p>
          <h1>Choose Your Favourite Products</h1>
        </div>
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

        <div className="shop-control">
          <label htmlFor="product-currency">Currency</label>
          <select
            id="product-currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            {currencyOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {filteredProducts.length === 0 && (
        <section className="shop-state no-products" aria-live="polite">
          <ShopStateIcon />
          <p className="shop-state-kicker">No matches</p>
          <h2>No products found</h2>
          <p>
            Try a different search, choose another category, or reset the
            current filters.
          </p>
          {hasActiveFilters && (
            <button type="button" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
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
