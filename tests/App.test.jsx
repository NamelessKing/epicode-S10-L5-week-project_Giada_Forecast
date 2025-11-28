import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  it("renders the heading", () => {
    render(<App />);
    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });

  it("renders the count button", () => {
    render(<App />);
    expect(
      screen.getByRole("button", { name: /count is 0/i })
    ).toBeInTheDocument();
  });
});
