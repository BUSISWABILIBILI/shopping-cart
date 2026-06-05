import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CartProvider, useCart } from "../context/CartContext";
import { CurrencyProvider } from "../context/CurrencyContext";
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

function renderCart(ui) {
  render(
    <MemoryRouter>
      <CurrencyProvider>
        <CartProvider>{ui}</CartProvider>
      </CurrencyProvider>
    </MemoryRouter>,
  );
}

describe("Cart", () => {
  test("shows empty cart message", () => {
    renderCart(<Cart />);

    expect(
      screen.getByText("Your cart is currently empty."),
    ).toBeInTheDocument();
  });

  test("displays cart item and updates quantity", async () => {
    const user = userEvent.setup();

    renderCart(<CartWithItem />);

    await user.click(screen.getByText("Add Test Product"));

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Total: $50.00")).toBeInTheDocument();

    await user.click(screen.getByText("+"));

    expect(screen.getByText("Total: $75.00")).toBeInTheDocument();
  });

  test("completes checkout and clears the cart", async () => {
    const user = userEvent.setup();

    renderCart(<CartWithItem />);

    await user.click(screen.getByText("Add Test Product"));
    expect(screen.getByText("Test Product")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /checkout/i }));

    expect(screen.getByText("Order confirmed")).toBeInTheDocument();
    expect(screen.getByText("Your cart has been cleared.")).toBeInTheDocument();
    expect(screen.queryByText("Test Product")).not.toBeInTheDocument();
  });

  test("displays cart totals in the selected currency", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem("biliStoreCurrency", "ZAR");

    renderCart(<CartWithItem />);

    await user.click(screen.getByText("Add Test Product"));

    expect(screen.getByText("Total: R925.00")).toBeInTheDocument();
  });
});
