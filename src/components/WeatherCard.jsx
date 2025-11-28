import { Card, Row, Col } from "react-bootstrap";
import {
  Thermometer,
  Droplet,
  Wind,
  Eye,
  ArrowUp,
  ArrowDown,
} from "react-bootstrap-icons";
import { getWeatherIconUrl } from "../services/weatherAPI";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { main, weather: weatherInfo, wind, visibility, name, sys } = weather;
  const weatherData = weatherInfo[0];

  return (
    <Card className="shadow-lg mb-2 mb-lg-2 weather-card-main">
      <Card.Body className="p-2 p-md-2 p-lg-2">
        {/* Header con città */}
        <div className="text-center mb-1 mb-lg-2">
          <h2 className="h5 mb-0">
            {name}, {sys.country}
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
            Condizioni attuali
          </p>
        </div>

        {/* Temperatura principale e icona */}
        <div className="text-center mb-1 mb-lg-2">
          <img
            src={getWeatherIconUrl(weatherData.icon)}
            alt={weatherData.description}
            className="weather-icon"
          />
          <div className="d-flex align-items-center justify-content-center gap-1">
            <h1 className="display-3 mb-0 fw-bold">{Math.round(main.temp)}°</h1>
          </div>
          <p className="text-capitalize fs-6 text-muted mb-0">
            {weatherData.description}
          </p>
        </div>

        {/* Dettagli meteo in griglia */}
        <Row className="g-2 g-lg-2 mt-1">
          <Col xs={6} md={3}>
            <div
              className="text-center p-2 rounded weather-stat-card"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <Thermometer size={18} className="mb-1 text-muted" />
              <div className="small text-muted" style={{ fontSize: "0.7rem" }}>
                Percepita
              </div>
              <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                {Math.round(main.feels_like)}°
              </div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div
              className="text-center p-2 rounded weather-stat-card"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <Droplet size={18} className="mb-1 text-muted" />
              <div className="small text-muted" style={{ fontSize: "0.7rem" }}>
                Umidità
              </div>
              <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                {main.humidity}%
              </div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div
              className="text-center p-2 rounded weather-stat-card"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <Wind size={18} className="mb-1 text-muted" />
              <div className="small text-muted" style={{ fontSize: "0.7rem" }}>
                Vento
              </div>
              <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                {Math.round(wind.speed)} km/h
              </div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div
              className="text-center p-2 rounded weather-stat-card"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <Eye size={18} className="mb-1 text-muted" />
              <div className="small text-muted" style={{ fontSize: "0.7rem" }}>
                Visibilità
              </div>
              <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                {(visibility / 1000).toFixed(1)} km
              </div>
            </div>
          </Col>
        </Row>

        {/* Min/Max temperatura */}
        <div
          className="d-flex justify-content-center gap-3 mt-2 pt-2"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="d-flex align-items-center gap-1">
            <ArrowDown size={16} className="text-primary" />
            <span className="text-muted" style={{ fontSize: "0.75rem" }}>
              Min:
            </span>
            <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
              {Math.round(main.temp_min)}°
            </span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <ArrowUp size={16} className="text-danger" />
            <span className="text-muted" style={{ fontSize: "0.75rem" }}>
              Max:
            </span>
            <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
              {Math.round(main.temp_max)}°
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
