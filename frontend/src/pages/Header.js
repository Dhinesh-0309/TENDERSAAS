import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "../styles/Header.css";

function Header() {
  return (
    <Navbar expand="lg" className="navbar-dark header">
      <Container>
        <Navbar.Brand href="/" className="brand">
          <span className="brand-highlight">Tender</span>SaaS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/tenders" className="nav-link">Tenders</Nav.Link>
            <Nav.Link href="/community" className="nav-link">Community</Nav.Link>
            <Nav.Link href="/about" className="nav-link">About</Nav.Link>
            <Nav.Link href="/pricing" className="nav-link">Pricing</Nav.Link>
          </Nav>
          <div className="header-actions">
            <Button variant="outline-light" size="sm" href="/login" className="login-btn-sm">
              Login
            </Button>
            <Button variant="primary" size="sm" href="/signup" className="signup-btn-sm">
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;