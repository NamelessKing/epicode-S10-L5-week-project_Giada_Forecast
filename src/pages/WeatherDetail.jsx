import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Alert, Spinner, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import { getCurrentWeather, getForecast } from "../services/weatherAPI";

const WeatherDetail = () => {
  const { city } = useParams();
  const navigate = useNavigate();

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch parallelo di meteo attuale e previsioni
        const [currentWeather, forecastData] = await Promise.all([
          getCurrentWeather(city),
          getForecast(city),
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
  }, [city]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" className="mb-3" />
        <p className="text-muted">Caricamento dati meteo per {city}...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
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
    <Container fluid className="py-3 py-lg-5 px-3 px-lg-5">
      <div className="weather-detail-container">
        {/* Back button */}
        <Button
          variant="outline-secondary"
          className="mb-4"
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
