import { Row } from "react-bootstrap";
import ForecastDay from "./ForecastDay";

const ForecastList = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Prendi solo le previsioni ogni 8 elementi (ogni 24 ore circa)
  const dailyForecasts = forecast.list
    .filter((_, index) => index % 8 === 0)
    .slice(0, 5);

  return (
    <div className="mb-2 forecast-section">
      <h3 className="h5 mb-2 mb-lg-3">Previsioni prossimi 5 giorni</h3>
      <Row className="g-2 g-lg-2">
        {dailyForecasts.map((item, index) => (
          <ForecastDay key={index} forecast={item} />
        ))}
      </Row>
    </div>
  );
};

export default ForecastList;
