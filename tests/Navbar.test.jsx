import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../src/components/Navbar";

describe("Navbar Component", () => {
  it("renders the app title", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText(/Giada Forecast/i)).toBeInTheDocument();
  });

  it("has a link to homepage", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: /Giada Forecast/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the weather icon", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Verifica presenza SVG icon (CloudRainFill)
    const navbar = screen.getByText(/Giada Forecast/i).parentElement;
    expect(navbar).toBeInTheDocument();
  });
});
