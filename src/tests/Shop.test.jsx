import { render, screen, waitFor } from "@testing-library/react";
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
];

describe("Shop", () => {
  test("loads and displays products", async () => {
    productsApi.fetchProducts.mockResolvedValue(mockProducts);

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
  });
});
