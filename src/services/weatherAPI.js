const API_KEY = "66fcf55012c8da8f0ec9e5b96b8b9078";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetch current weather for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`
    );

    if (!response.ok) {
      throw new Error("Città non trovata");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

/**
 * Fetch 5-day forecast for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Forecast data
 */
export const getForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=it`
    );

    if (!response.ok) {
      throw new Error("Città non trovata");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};

/**
 * Get weather icon URL
 * @param {string} iconCode - Icon code from API
 * @returns {string} Icon URL
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
