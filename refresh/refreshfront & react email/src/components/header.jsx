import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Mahmoud Ali</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ fontSize: "19px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link style={{ fontSize: "19px" }}>
              <Link
                to="about"
                style={{ textDecoration: "none", color: "black" }}
              >
                About
              </Link>
            </Nav.Link>
            <Nav.Link style={{ fontSize: "19px" }}>
              <Link
                to="contact"
                style={{ textDecoration: "none", color: "black" }}
              >
                Contact
              </Link>
            </Nav.Link>
            <Nav.Link style={{ fontSize: "19px" }}>
              <Link
                to="dreams"
                style={{ textDecoration: "none", color: "black" }}
              >
                Dreams
              </Link>
            </Nav.Link>
            <Nav.Link style={{ fontSize: "19px" }}>
              <Link
                to="projects"
                style={{ textDecoration: "none", color: "black" }}
              >
                Projects
              </Link>
            </Nav.Link>
            <Nav.Link style={{ fontSize: "19px" }}>
              <Link
                to="skills"
                style={{ textDecoration: "none", color: "black" }}
              >
                Skills
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
