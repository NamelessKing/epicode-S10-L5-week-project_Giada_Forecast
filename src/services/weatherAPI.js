const API_KEY = "66fcf55012c8da8f0ec9e5b96b8b9078";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

/**
 * Fetch current weather for a city
 * @param {string|Object} cityOrCoords - City name or {lat, lon} object
 * @returns {Promise<Object>} Weather data
 */
export const getCurrentWeather = async (cityOrCoords) => {
  try {
    let url;
    if (
      typeof cityOrCoords === "object" &&
      cityOrCoords.lat &&
      cityOrCoords.lon
    ) {
      // Usa coordinate
      url = `${BASE_URL}/weather?lat=${cityOrCoords.lat}&lon=${cityOrCoords.lon}&appid=${API_KEY}&units=metric&lang=it`;
    } else {
      // Usa nome città
      url = `${BASE_URL}/weather?q=${cityOrCoords}&appid=${API_KEY}&units=metric&lang=it`;
    }

    const response = await fetch(url);

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
 * @param {string|Object} cityOrCoords - City name or {lat, lon} object
 * @returns {Promise<Object>} Forecast data
 */
export const getForecast = async (cityOrCoords) => {
  try {
    let url;
    if (
      typeof cityOrCoords === "object" &&
      cityOrCoords.lat &&
      cityOrCoords.lon
    ) {
      // Usa coordinate
      url = `${BASE_URL}/forecast?lat=${cityOrCoords.lat}&lon=${cityOrCoords.lon}&appid=${API_KEY}&units=metric&lang=it`;
    } else {
      // Usa nome città
      url = `${BASE_URL}/forecast?q=${cityOrCoords}&appid=${API_KEY}&units=metric&lang=it`;
    }

    const response = await fetch(url);

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

/**
 * Search cities by name (Geocoding API)
 * @param {string} query - City name to search
 * @returns {Promise<Array>} Array of matching cities
 */
export const searchCities = async (query) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Errore nella ricerca");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching cities:", error);
    return [];
  }
};

/**
 * Reverse geocoding - Get city name from coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} City data with name and coordinates
 */
export const getCityFromCoordinates = async (lat, lon) => {
  try {
    const response = await fetch(
      `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Impossibile determinare la posizione");
    }

    const data = await response.json();
    if (data.length === 0) {
      throw new Error("Nessuna città trovata per questa posizione");
    }

    const city = data[0];
    return {
      name: city.local_names?.it || city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state,
    };
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    throw error;
  }
};
