import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  test("renders navigation links", () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Navbar />
        </CartProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("BiliStore")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Cart with 0 items" }),
    ).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
