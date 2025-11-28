import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WeatherCard from "../src/components/WeatherCard";

// Mock dei dati meteo
const mockWeatherData = {
  name: "Milano",
  sys: {
    country: "IT",
  },
  main: {
    temp: 15.5,
    feels_like: 14.2,
    temp_min: 12,
    temp_max: 18,
    humidity: 65,
  },
  weather: [
    {
      description: "cielo sereno",
      icon: "01d",
    },
  ],
  wind: {
    speed: 3.5,
  },
  visibility: 10000,
};

describe("WeatherCard Component", () => {
  it("renders weather data correctly", () => {
    render(<WeatherCard weather={mockWeatherData} />);

    // Verifica nome città e paese
    expect(screen.getByText(/Milano, IT/i)).toBeInTheDocument();

    // Verifica temperatura (arrotondata)
    expect(screen.getByText(/16°/)).toBeInTheDocument();

    // Verifica descrizione meteo
    expect(screen.getByText(/cielo sereno/i)).toBeInTheDocument();
  });

  it("displays all weather details", () => {
    render(<WeatherCard weather={mockWeatherData} />);

    // Verifica temperatura percepita (arrotondata)
    expect(screen.getByText(/14°/)).toBeInTheDocument();

    // Verifica umidità
    expect(screen.getByText(/65%/)).toBeInTheDocument();

    // Verifica vento (arrotondato)
    expect(screen.getByText(/4 km\/h/i)).toBeInTheDocument();

    // Verifica visibilità
    expect(screen.getByText(/10.0 km/i)).toBeInTheDocument();
  });

  it("displays min and max temperatures", () => {
    render(<WeatherCard weather={mockWeatherData} />);

    // Verifica min/max
    expect(screen.getByText(/12°/)).toBeInTheDocument();
    expect(screen.getByText(/18°/)).toBeInTheDocument();
  });

  it("renders weather icon", () => {
    render(<WeatherCard weather={mockWeatherData} />);

    const icon = screen.getByAltText(/cielo sereno/i);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", expect.stringContaining("01d"));
  });

  it("returns null when no weather data is provided", () => {
    const { container } = render(<WeatherCard weather={null} />);
    expect(container.firstChild).toBeNull();
  });
});
