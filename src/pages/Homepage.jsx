import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/weather/${city.trim()}`);
    }
  };

  return (
    <Container fluid className="py-3 py-md-5 py-lg-5 px-3 px-lg-5">
      <div className="homepage-container">
        <Row className="justify-content-center">
          <Col xs={12} sm={11} md={10} lg={9} xl={8} xxl={7}>
            <Card className="shadow-lg fade-in homepage-card">
              <Card.Body className="p-4 p-md-5 p-lg-6">
                <div className="text-center mb-4 mb-md-5 mb-lg-6">
                  <h1 className="display-4 homepage-title mb-3 mb-lg-4">
                    Mi devo portare l'ombrello?
                  </h1>
                  <p className="text-muted homepage-subtitle mb-0">
                    Scopri il meteo nella tua città e le previsioni dei prossimi
                    5 giorni
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4 mb-lg-5">
                    <Form.Label className="homepage-label">
                      Cerca una città
                    </Form.Label>
                    <div className="d-flex gap-2 gap-lg-3">
                      <Form.Control
                        type="text"
                        placeholder="es. Milano, Parigi, Tokyo..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        size="lg"
                        required
                        autoFocus
                        className="homepage-input"
                      />
                      <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        className="px-3 px-md-4 px-lg-5 homepage-search-btn"
                      >
                        <Search className="search-icon" />
                      </Button>
                    </div>
                  </Form.Group>
                </Form>

                <div className="mt-4 mt-lg-5">
                  <p className="text-muted mb-3 homepage-popular-label">
                    Città popolari:
                  </p>
                  <div className="d-flex flex-wrap gap-2 gap-lg-3">
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
