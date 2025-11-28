import { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { ArrowLeft, HeartFill, StarFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "../styles/GiadaEasterEgg.css";

const GiadaEasterEgg = () => {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState([]);
  const [messageIndex, setMessageIndex] = useState(0);

  // Frasi romantiche che cambiano
  const romanticMessages = [
    "Zio billi! ☀️",
    "La Principessa delle Navi è qui 🚢",
    "Lattina di Pepsie approved 🥤",
    "Mini Giada, maxi energia! ⚡",
    "Cuoricino mode: ON 💛",
  ];

  // Animazione cuori che cadono: crea un nuovo cuore ogni 400ms
  useEffect(() => {
    const interval = setInterval(() => {
      // Crea un cuore con posizione, durata e dimensione casuali
      const newHeart = {
        id: Date.now() + Math.random(), // ID unico
        left: Math.random() * 100, // Posizione orizzontale casuale (0-100%)
        animationDuration: 3 + Math.random() * 2, // Durata tra 3 e 5 secondi
        size: 20 + Math.random() * 20, // Dimensione tra 20 e 40px
      };
      setHearts((prev) => [...prev, newHeart]);

      // Rimuovi il cuore dopo 5 secondi per evitare sovraccarico di memoria
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 5000);
    }, 400); // Nuovo cuore ogni 400ms

    // Cleanup: ferma l'intervallo quando il componente viene smontato
    return () => clearInterval(interval);
  }, []);

  // Rotazione messaggi: cambia il messaggio visualizzato ogni 4 secondi
  useEffect(() => {
    const interval = setInterval(() => {
      // Passa al prossimo messaggio, ripartendo da 0 quando arriva alla fine
      // L'operatore % (modulo) fa ripartire il conteggio da zero
      setMessageIndex((prev) => (prev + 1) % romanticMessages.length);
    }, 4000); // Cambia ogni 4 secondi

    // Cleanup: ferma l'intervallo quando il componente viene smontato
    return () => clearInterval(interval);
  }, [romanticMessages.length]);

  // Dati meteo personalizzati
  const specialWeather = {
    name: "Ship Princess",
    sys: { country: "❤️" },
    main: {
      temp: 25,
      feels_like: 25,
      temp_min: 23,
      temp_max: 27,
      humidity: 100,
    },
    weather: [
      {
        description: romanticMessages[messageIndex],
        icon: "01d", // sole
      },
    ],
    wind: { speed: 0 },
    visibility: 10000,
  };

  // Previsioni sempre soleggiate con messaggi speciali
  const today = new Date();
  const specialForecast = {
    list: [
      {
        dt_txt: today.toISOString(),
        main: { temp: 25 },
        weather: [{ description: "Zio billi mode", icon: "01d" }],
      },
      {
        dt_txt: new Date(today.getTime() + 86400000).toISOString(),
        main: { temp: 26 },
        weather: [{ description: "Lattina di Pepsie", icon: "01d" }],
      },
      {
        dt_txt: new Date(today.getTime() + 172800000).toISOString(),
        main: { temp: 24 },
        weather: [{ description: "Principessa vibes", icon: "01d" }],
      },
      {
        dt_txt: new Date(today.getTime() + 259200000).toISOString(),
        main: { temp: 27 },
        weather: [{ description: "Mini Giada energy", icon: "01d" }],
      },
      {
        dt_txt: new Date(today.getTime() + 345600000).toISOString(),
        main: { temp: 25 },
        weather: [{ description: "Cuoricino mode", icon: "01d" }],
      },
    ],
  };

  return (
    <div className="giada-easter-egg">
      {/* Cuori animati */}
      <div className="hearts-container">
        {hearts.map((heart) => (
          <HeartFill
            key={heart.id}
            className="falling-heart"
            style={{
              left: `${heart.left}%`,
              animationDuration: `${heart.animationDuration}s`,
              fontSize: `${heart.size}px`,
            }}
          />
        ))}
      </div>

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

          {/* Messaggio speciale iniziale */}
          <Card
            className="shadow-lg mb-3 special-message-card"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "white",
            }}
          >
            <Card.Body className="text-center p-4">
              <StarFill className="mb-2" size={40} />
              <h3 className="mb-2">Zio Billy! Hai scoperto l'Easter Egg! 🎁</h3>
              <p className="mb-0 fs-5">Principessa delle navi👑</p>
            </Card.Body>
          </Card>

          {/* Weather Card Personalizzata */}
          <Card
            className="shadow-lg mb-2 mb-lg-2 weather-card-special"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              border: "none",
              color: "white",
            }}
          >
            <Card.Body className="p-2 p-md-2 p-lg-2">
              {/* Header */}
              <div className="text-center mb-1 mb-lg-2">
                <h2 className="h5 mb-0">
                  {specialWeather.name} {specialWeather.sys.country}
                </h2>
                <p className="mb-0" style={{ fontSize: "0.75rem" }}>
                  Ahhhhh dio....
                </p>
              </div>

              {/* Temperatura e icona */}
              <div className="text-center mb-1 mb-lg-2">
                <div className="special-sun mb-2">☀️</div>
                <div className="d-flex align-items-center justify-content-center gap-1">
                  <h1 className="display-3 mb-0 fw-bold">25°</h1>
                </div>
                <p className="fs-6 mb-0 special-description">
                  {romanticMessages[messageIndex]}
                </p>
              </div>

              {/* Statistiche personalizzate */}
              <Row className="g-2 g-lg-2 mt-1">
                <Col xs={6} md={3}>
                  <div
                    className="text-center p-2 rounded"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="mb-1">🚢</div>
                    <div
                      className="small"
                      style={{ fontSize: "0.7rem", opacity: 0.9 }}
                    >
                      Status Nave
                    </div>
                    <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                      Principessa
                    </div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div
                    className="text-center p-2 rounded"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="mb-1">🥤</div>
                    <div
                      className="small"
                      style={{ fontSize: "0.7rem", opacity: 0.9 }}
                    >
                      Pepsie Level
                    </div>
                    <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                      Lattina
                    </div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div
                    className="text-center p-2 rounded"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="mb-1">⚡</div>
                    <div
                      className="small"
                      style={{ fontSize: "0.7rem", opacity: 0.9 }}
                    >
                      Energia
                    </div>
                    <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                      Mini Giada
                    </div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div
                    className="text-center p-2 rounded"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="mb-1">💛</div>
                    <div
                      className="small"
                      style={{ fontSize: "0.7rem", opacity: 0.9 }}
                    >
                      Mood
                    </div>
                    <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                      Cuoricino
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Min/Max */}
              <div
                className="d-flex justify-content-center gap-3 mt-2 pt-2"
                style={{ borderTop: "1px solid rgba(255, 255, 255, 0.3)" }}
              >
                <div className="d-flex align-items-center gap-1">
                  <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>
                    Vibes:
                  </span>
                  <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
                    Top ✨
                  </span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>
                    Mood:
                  </span>
                  <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
                    Zio Billi 🎮
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Previsioni speciali */}
          <div className="mb-2 forecast-section">
            <h3 className="h5 mb-2 mb-lg-3 text-white">
              Previsioni prossimi giorni 🌈
            </h3>
            <Row className="g-2 g-lg-2">
              {specialForecast.list.map((item, index) => {
                const date = new Date(item.dt_txt);
                const dayName = date.toLocaleDateString("it-IT", {
                  weekday: "short",
                });
                const dayNumber = date.toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "short",
                });

                return (
                  <Col key={index} xs={6} sm={4} md={3} lg={2}>
                    <Card
                      className="text-center h-100 special-forecast-card"
                      style={{
                        background:
                          "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                        border: "none",
                      }}
                    >
                      <Card.Body className="p-2 p-lg-2">
                        <div className="small text-dark text-capitalize mb-1">
                          {dayName}
                        </div>
                        <div className="small fw-semibold mb-1">
                          {dayNumber}
                        </div>
                        <div
                          className="special-sun-small mb-1"
                          style={{ fontSize: "2rem" }}
                        >
                          ☀️
                        </div>
                        <div className="fw-bold fs-6 mb-1">
                          {item.main.temp}°
                        </div>
                        <div
                          className="small text-dark text-capitalize"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {item.weather[0].description}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>

          {/* Messaggio finale */}
          <Card
            className="shadow-lg mt-3 text-center"
            style={{
              background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
              border: "none",
            }}
          >
            <Card.Body className="p-4">
              <p className="mb-0 fs-5" style={{ color: "#333" }}>
                Made with love ❤️
              </p>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default GiadaEasterEgg;
