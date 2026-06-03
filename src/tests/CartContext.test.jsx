import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "../context/CartContext";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 20,
  category: "test",
  image: "test.jpg",
};

function TestComponent() {
  const { cartItems, cartCount, addToCart, updateQuantity, removeFromCart } =
    useCart();

  return (
    <div>
      <p>Cart Count: {cartCount}</p>
      <p>Items: {cartItems.length}</p>

      <button onClick={() => addToCart(mockProduct, 2)}>Add Product</button>
      <button onClick={() => updateQuantity(1, 5)}>Update Quantity</button>
      <button onClick={() => removeFromCart(1)}>Remove Product</button>
    </div>
  );
}

describe("CartContext", () => {
  test("adds, updates, and removes cart items", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    expect(screen.getByText("Cart Count: 0")).toBeInTheDocument();
    expect(screen.getByText("Items: 0")).toBeInTheDocument();

    await user.click(screen.getByText("Add Product"));
    expect(screen.getByText("Cart Count: 2")).toBeInTheDocument();
    expect(screen.getByText("Items: 1")).toBeInTheDocument();

    await user.click(screen.getByText("Update Quantity"));
    expect(screen.getByText("Cart Count: 5")).toBeInTheDocument();

    await user.click(screen.getByText("Remove Product"));
    expect(screen.getByText("Cart Count: 0")).toBeInTheDocument();
    expect(screen.getByText("Items: 0")).toBeInTheDocument();
  });
});
