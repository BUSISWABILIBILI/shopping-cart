import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CartProvider, useCart } from "../context/CartContext";
import Cart from "../pages/Cart";

const product = {
  id: 1,
  title: "Test Product",
  price: 25,
  category: "test",
  image: "test.jpg",
};

function CartWithItem() {
  const { addToCart } = useCart();

  return (
    <>
      <button onClick={() => addToCart(product, 2)}>Add Test Product</button>
      <Cart />
    </>
  );
}

describe("Cart", () => {
  test("shows empty cart message", () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Cart />
        </CartProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Your cart is currently empty."),
    ).toBeInTheDocument();
  });

  test("displays cart item and updates quantity", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartProvider>
          <CartWithItem />
        </CartProvider>
      </MemoryRouter>,
    );

    await user.click(screen.getByText("Add Test Product"));

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Total: $50.00")).toBeInTheDocument();

    await user.click(screen.getByText("+"));

    expect(screen.getByText("Total: $75.00")).toBeInTheDocument();
  });
});
