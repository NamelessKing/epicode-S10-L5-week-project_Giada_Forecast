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
    <Card className="shadow-lg mb-4 weather-card-main">
      <Card.Body className="p-3 p-md-4 p-lg-5">
        {/* Header con città */}
        <div className="text-center mb-4 mb-lg-5">
          <h2 className="h3 h2-lg mb-1">
            {name}, {sys.country}
          </h2>
          <p className="text-muted mb-0">Condizioni attuali</p>
        </div>

        {/* Temperatura principale e icona */}
        <div className="text-center mb-4 mb-lg-5">
          <img
            src={getWeatherIconUrl(weatherData.icon)}
            alt={weatherData.description}
            className="weather-icon"
          />
          <div className="d-flex align-items-center justify-content-center gap-2">
            <h1 className="display-1 mb-0 fw-bold">{Math.round(main.temp)}°</h1>
          </div>
          <p className="text-capitalize fs-4 fs-lg-3 text-muted mb-0">
            {weatherData.description}
          </p>
        </div>

        {/* Dettagli meteo in griglia */}
        <Row className="g-3 g-lg-4 mt-3">
          <Col xs={6} md={3}>
            <div
              className="text-center p-3 p-lg-4 rounded weather-stat-card"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <Thermometer size={24} className="mb-2 text-muted" />
              <div className="small text-muted">Percepita</div>
              <div className="fw-bold">{Math.round(main.feels_like)}°</div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div
              className="text-center p-3 rounded"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <Droplet size={24} className="mb-2 text-muted" />
              <div className="small text-muted">Umidità</div>
              <div className="fw-bold">{main.humidity}%</div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div
              className="text-center p-3 rounded"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <Wind size={24} className="mb-2 text-muted" />
              <div className="small text-muted">Vento</div>
              <div className="fw-bold">{Math.round(wind.speed)} km/h</div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div
              className="text-center p-3 rounded"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <Eye size={24} className="mb-2 text-muted" />
              <div className="small text-muted">Visibilità</div>
              <div className="fw-bold">{(visibility / 1000).toFixed(1)} km</div>
            </div>
          </Col>
        </Row>

        {/* Min/Max temperatura */}
        <div
          className="d-flex justify-content-center gap-4 mt-4 pt-3"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="d-flex align-items-center gap-2">
            <ArrowDown size={20} className="text-primary" />
            <span className="text-muted small">Min:</span>
            <span className="fw-bold">{Math.round(main.temp_min)}°</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <ArrowUp size={20} className="text-danger" />
            <span className="text-muted small">Max:</span>
            <span className="fw-bold">{Math.round(main.temp_max)}°</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
