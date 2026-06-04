import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const product = {
  id: 1,
  title: "Test Product",
  price: 49.99,
  category: "electronics",
  image: "test.jpg",
};

describe("ProductCard", () => {
  test("renders product details and quantity controls", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(1);

    await user.click(screen.getByText("+"));
    expect(input).toHaveValue(2);

    await user.click(screen.getByText("-"));
    expect(input).toHaveValue(1);
  });

  test("shows feedback after adding a product to the cart", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>,
    );

    await user.click(screen.getByText("+"));
    await user.click(screen.getByText("Add To Cart"));

    expect(screen.getByRole("status")).toHaveTextContent(
      "2 items added to cart",
    );
    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });
});
