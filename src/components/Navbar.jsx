import { Container, Navbar as BSNavbar } from "react-bootstrap";
import { CloudRainFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <BSNavbar className="navbar" sticky="top">
      <Container fluid className="px-3 px-md-4">
        <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <CloudRainFill className="me-2" size={32} />
          <span className="fw-bold">Giada Forecast</span>
        </BSNavbar.Brand>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
