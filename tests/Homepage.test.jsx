import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Homepage from "../src/pages/Homepage";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Homepage Component", () => {
  it("renders the main heading", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Mi devo portare l'ombrello/i)).toBeInTheDocument();
  });

  it("renders the search form with input and button", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/es. Milano, Parigi, Tokyo/i);
    const searchButton = screen.getByRole("button", { name: "" });

    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("navigates to weather page when form is submitted", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/es. Milano, Parigi, Tokyo/i);
    const form = input.closest("form");

    // Simula input utente
    fireEvent.change(input, { target: { value: "Milano" } });
    fireEvent.submit(form);

    // Verifica che navigate sia stato chiamato con il path corretto
    expect(mockNavigate).toHaveBeenCalledWith("/weather/Milano");
  });

  it("renders all popular city buttons", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: /Milano/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Roma/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Parigi/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Londra/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tokyo/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /New York/i })
    ).toBeInTheDocument();
  });

  it("navigates when clicking a popular city button", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const milanButton = screen.getByRole("button", { name: /Milano/i });
    fireEvent.click(milanButton);

    expect(mockNavigate).toHaveBeenCalledWith("/weather/Milano");
  });
});
