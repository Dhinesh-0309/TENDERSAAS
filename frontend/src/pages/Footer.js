import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="footer-section">
            <h5 className="footer-title">TenderSaaS</h5>
            <p className="footer-description">
              A comprehensive ecosystem for businesses to discover, collaborate, and engage in the world of tenders.
            </p>
          </Col>
          <Col md={2} className="footer-section">
            <h5 className="footer-title">Platform</h5>
            <ul className="footer-links">
              <li><a href="/tenders">Tenders</a></li>
              <li><a href="/community">Community</a></li>
              <li><a href="/partners">Partners</a></li>
              <li><a href="/pricing">Pricing</a></li>
            </ul>
          </Col>
          <Col md={2} className="footer-section">
            <h5 className="footer-title">Resources</h5>
            <ul className="footer-links">
              <li><a href="/blog">Blog</a></li>
              <li><a href="/guides">Guides</a></li>
              <li><a href="/webinars">Webinars</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </Col>
          <Col md={2} className="footer-section">
            <h5 className="footer-title">Company</h5>
            <ul className="footer-links">
              <li><a href="/about">About</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/press">Press</a></li>
            </ul>
          </Col>
          <Col md={2} className="footer-section">
            <h5 className="footer-title">Legal</h5>
            <ul className="footer-links">
              <li><a href="/terms">Terms</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/cookies">Cookies</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="footer-bottom">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} TenderSaaS. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;