import { useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { GeoAltFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import SearchAutocomplete from "../components/SearchAutocomplete";
import { getCityFromCoordinates } from "../services/weatherAPI";

const Homepage = () => {
  const navigate = useNavigate();
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);

  const handleGeolocation = () => {
    // Controlla se il browser supporta la geolocalizzazione
    if (!navigator.geolocation) {
      setGeoError("La geolocalizzazione non è supportata dal tuo browser");
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    // Richiedi la posizione dell'utente (richiede permessi)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Estrai latitudine e longitudine dalla posizione rilevata
          const { latitude, longitude } = position.coords;
          // Usa reverse geocoding per ottenere il nome della città
          const cityData = await getCityFromCoordinates(latitude, longitude);

          // Naviga alla pagina meteo passando sia il nome che le coordinate
          // (così la ricerca sarà precisa)
          navigate(
            `/weather/${encodeURIComponent(cityData.name)}?lat=${
              cityData.lat
            }&lon=${cityData.lon}`
          );
        } catch (error) {
          setGeoError("Impossibile determinare la tua posizione");
        } finally {
          setGeoLoading(false);
        }
      },
      (error) => {
        setGeoLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGeoError("Permesso di geolocalizzazione negato");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setGeoError("Posizione non disponibile");
        } else if (error.code === error.TIMEOUT) {
          setGeoError("Timeout della richiesta di geolocalizzazione");
        } else {
          setGeoError("Errore durante la geolocalizzazione");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleCitySelect = (cityData) => {
    // Se cityData è un oggetto con coordinate, passa lat/lon come query params
    if (typeof cityData === "object" && cityData.lat && cityData.lon) {
      navigate(
        `/weather/${encodeURIComponent(cityData.name)}?lat=${
          cityData.lat
        }&lon=${cityData.lon}`
      );
    } else {
      // Altrimenti usa solo il nome (per città popolari)
      navigate(`/weather/${cityData}`);
    }
  };

  return (
    <Container fluid className="py-2 py-md-3 py-lg-3 px-2 px-md-3 px-lg-4">
      <div className="homepage-container">
        <Row className="justify-content-center">
          <Col xs={12}>
            <Card className="shadow-lg fade-in homepage-card">
              <Card.Body className="p-3 p-md-4 p-lg-4">
                <div className="text-center mb-3 mb-md-4 mb-lg-4">
                  <h1 className="display-4 homepage-title mb-2 mb-lg-3">
                    Mi devo portare l'ombrello?
                  </h1>
                  <p className="text-muted homepage-subtitle mb-0">
                    Scopri il meteo nella tua città e le previsioni dei prossimi
                    5 giorni... o scrivi il tuo nome 😉
                  </p>
                </div>

                {geoError && (
                  <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setGeoError(null)}
                    className="mb-3"
                  >
                    {geoError}
                  </Alert>
                )}

                <div className="mb-3 mb-lg-4">
                  <Button
                    className="w-100 geolocation-btn"
                    onClick={handleGeolocation}
                    disabled={geoLoading}
                  >
                    <GeoAltFill className="me-2" />
                    {geoLoading
                      ? "Rilevamento posizione..."
                      : "Usa la mia posizione"}
                  </Button>
                </div>

                <SearchAutocomplete onCitySelect={handleCitySelect} />

                <div className="mt-3 mt-lg-4">
                  <p className="text-muted mb-2 homepage-popular-label">
                    Città popolari:
                  </p>
                  <div className="d-flex flex-wrap gap-2 gap-lg-2">
                    {[
                      "Milano",
                      "Roma",
                      "Parigi",
                      "Londra",
                      "Tokyo",
                      "New York",
                    ].map((popularCity) => (
                      <Button
                        key={popularCity}
                        variant="outline-secondary"
                        className="popular-city-btn"
                        onClick={() => navigate(`/weather/${popularCity}`)}
                      >
                        {popularCity}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Homepage;
