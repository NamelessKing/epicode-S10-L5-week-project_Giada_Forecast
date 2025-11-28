import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ForecastList from "../src/components/ForecastList";

// Mock forecast data
const mockForecastData = {
  list: [
    {
      dt_txt: "2025-11-28 12:00:00",
      main: { temp: 15 },
      weather: [{ description: "nuvoloso", icon: "03d" }],
    },
    {
      dt_txt: "2025-11-29 12:00:00",
      main: { temp: 16 },
      weather: [{ description: "sereno", icon: "01d" }],
    },
    {
      dt_txt: "2025-11-30 12:00:00",
      main: { temp: 14 },
      weather: [{ description: "pioggia", icon: "10d" }],
    },
  ],
};

describe("ForecastList Component", () => {
  it("renders the forecast heading", () => {
    render(<ForecastList forecast={mockForecastData} />);

    expect(
      screen.getByText(/Previsioni prossimi 5 giorni/i)
    ).toBeInTheDocument();
  });

  it("renders forecast items", () => {
    render(<ForecastList forecast={mockForecastData} />);

    // Verifica presenza descrizioni meteo
    expect(screen.getByText(/nuvoloso/i)).toBeInTheDocument();
  });

  it("returns null when no forecast data is provided", () => {
    const { container } = render(<ForecastList forecast={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when forecast list is empty", () => {
    const { container } = render(<ForecastList forecast={{}} />);
    expect(container.firstChild).toBeNull();
  });
});
