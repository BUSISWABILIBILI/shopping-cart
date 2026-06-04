import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "../context/CartContext";
import { CurrencyProvider } from "../context/CurrencyContext";
import Shop from "../pages/Shop";
import * as productsApi from "../services/productsApi";

vi.mock("../services/productsApi");

const mockProducts = [
  {
    id: 1,
    title: "Laptop Bag",
    price: 30,
    category: "accessories",
    image: "bag.jpg",
  },
  {
    id: 2,
    title: "Running Shoes",
    price: 55,
    category: "clothing",
    image: "shoes.jpg",
  },
  {
    id: 3,
    title: "Desk Lamp",
    price: 20,
    category: "home",
    image: "lamp.jpg",
  },
];

function renderShop() {
  render(
    <CurrencyProvider>
      <CartProvider>
        <Shop />
      </CartProvider>
    </CurrencyProvider>,
  );
}

describe("Shop", () => {
  beforeEach(() => {
    productsApi.fetchProducts.mockResolvedValue(mockProducts);
  });

  test("loads and displays products", async () => {
    renderShop();

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-skeleton")).toHaveLength(8);

    await waitFor(() => {
      expect(screen.getByText("Laptop Bag")).toBeInTheDocument();
    });

    expect(screen.getByText("$30.00")).toBeInTheDocument();
  });

  test("filters products by search and category", async () => {
    const user = userEvent.setup();

    renderShop();

    await waitFor(() => {
      expect(screen.getByText("Laptop Bag")).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText("Search"), "lamp");

    expect(screen.getByText("Desk Lamp")).toBeInTheDocument();
    expect(screen.queryByText("Laptop Bag")).not.toBeInTheDocument();

    await user.clear(screen.getByLabelText("Search"));
    await user.selectOptions(screen.getByLabelText("Category"), "clothing");

    expect(screen.getByText("Running Shoes")).toBeInTheDocument();
    expect(screen.queryByText("Desk Lamp")).not.toBeInTheDocument();
  });

  test("sorts products by price", async () => {
    const user = userEvent.setup();

    renderShop();

    await waitFor(() => {
      expect(screen.getByText("Laptop Bag")).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText("Sort"), "price-low");

    const productNames = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);

    expect(productNames).toEqual(["Desk Lamp", "Laptop Bag", "Running Shoes"]);
  });

  test("changes displayed product currency", async () => {
    const user = userEvent.setup();

    renderShop();

    await waitFor(() => {
      expect(screen.getByText("Laptop Bag")).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText("Currency"), "EUR");

    expect(screen.getByText("€27.60")).toBeInTheDocument();
    expect(screen.queryByText("$30.00")).not.toBeInTheDocument();
  });
});
