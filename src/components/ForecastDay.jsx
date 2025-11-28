import { Card, Col } from "react-bootstrap";
import { getWeatherIconUrl } from "../services/weatherAPI";

const ForecastDay = ({ forecast }) => {
  const { dt_txt, main, weather } = forecast;
  const weatherData = weather[0];

  // Formatta la data
  const date = new Date(dt_txt);
  const dayName = date.toLocaleDateString("it-IT", { weekday: "short" });
  const dayNumber = date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
  });
  const time = date.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Col xs={6} sm={4} md={3} lg={2}>
      <Card
        className="text-center h-100 forecast-card"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <Card.Body className="p-2 p-lg-2">
          <div className="small text-muted text-capitalize mb-1">{dayName}</div>
          <div className="small fw-semibold mb-1">{dayNumber}</div>
          <div className="small text-muted mb-2" style={{ fontSize: "0.7rem" }}>
            {time}
          </div>
          <img
            src={getWeatherIconUrl(weatherData.icon)}
            alt={weatherData.description}
            className="forecast-icon mb-1"
          />
          <div className="fw-bold fs-6 mb-1">{Math.round(main.temp)}°</div>
          <div
            className="small text-muted text-capitalize forecast-description"
            style={{ fontSize: "0.7rem" }}
          >
            {weatherData.description}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ForecastDay;
