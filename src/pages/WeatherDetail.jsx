import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Alert, Spinner, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import GiadaEasterEgg from "../components/GiadaEasterEgg";
import { getCurrentWeather, getForecast } from "../services/weatherAPI";

const WeatherDetail = () => {
  const { city } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Easter egg: se la città è "Giada", mostra il componente speciale
  if (city && city.toLowerCase() === "giada") {
    return <GiadaEasterEgg />;
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Controlla se ci sono coordinate nei query params
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");

        let cityOrCoords;
        if (lat && lon) {
          // Usa coordinate per ricerca precisa
          cityOrCoords = { lat: parseFloat(lat), lon: parseFloat(lon) };
        } else {
          // Usa nome città
          cityOrCoords = city;
        }

        // Fetch parallelo di meteo attuale e previsioni
        const [currentWeather, forecastData] = await Promise.all([
          getCurrentWeather(cityOrCoords),
          getForecast(cityOrCoords),
        ]);

        setWeather(currentWeather);
        setForecast(forecastData);
      } catch (err) {
        setError(err.message || "Errore nel caricamento dei dati meteo");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city, searchParams]);

  if (loading) {
    return (
      <Container className="py-3 text-center">
        <Spinner animation="border" variant="primary" className="mb-2" />
        <p className="text-muted">Caricamento dati meteo per {city}...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-3">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Ops! Qualcosa è andato storto</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => navigate("/")}>
            Torna alla home
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-2 py-lg-3 px-3 px-lg-4">
      <div className="weather-detail-container">
        {/* Back button */}
        <Button
          variant="outline-secondary"
          className="mb-2 mb-lg-3"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="me-2" />
          Cerca un'altra città
        </Button>

        {/* Weather current */}
        <WeatherCard weather={weather} />

        {/* Forecast 5 days */}
        <ForecastList forecast={forecast} />
      </div>
    </Container>
  );
};

export default WeatherDetail;
