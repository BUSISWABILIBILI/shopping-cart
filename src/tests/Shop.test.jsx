import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "../context/CartContext";
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

describe("Shop", () => {
  beforeEach(() => {
    productsApi.fetchProducts.mockResolvedValue(mockProducts);
  });

  test("loads and displays products", async () => {
    render(
      <CartProvider>
        <Shop />
      </CartProvider>,
    );

    expect(screen.getByText("Loading products...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Laptop Bag")).toBeInTheDocument();
    });

    expect(screen.getByText("$30.00")).toBeInTheDocument();
    expect(screen.getByText("3 of 3 products shown")).toBeInTheDocument();
  });

  test("filters products by search and category", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <Shop />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Laptop Bag")).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText("Search"), "lamp");

    expect(screen.getByText("Desk Lamp")).toBeInTheDocument();
    expect(screen.queryByText("Laptop Bag")).not.toBeInTheDocument();
    expect(screen.getByText("1 of 3 products shown")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("Search"));
    await user.selectOptions(screen.getByLabelText("Category"), "clothing");

    expect(screen.getByText("Running Shoes")).toBeInTheDocument();
    expect(screen.queryByText("Desk Lamp")).not.toBeInTheDocument();
  });

  test("sorts products by price", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <Shop />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Laptop Bag")).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText("Sort"), "price-low");

    const productNames = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);

    expect(productNames).toEqual(["Desk Lamp", "Laptop Bag", "Running Shoes"]);
  });
});
