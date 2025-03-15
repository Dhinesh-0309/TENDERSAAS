import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import "../styles/Home.css";
import Header from "./Header";
import Footer from "./Footer";

function Home() {
  return (
    <div className="home-wrapper">
      <Header />
      <div className="hero-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center hero-content">
              <h1 className="hero-title">Welcome to TenderSaaS</h1>
              <p className="hero-subtitle">
                Affordable government tender information for SMEs & startups.
                Discover, discuss, and collaborate on tenders.
              </p>
              <div className="hero-buttons">
                <Button variant="primary" href="/signup" className="create-account-btn">
                  Create Account
                </Button>
                <Button variant="outline-light" href="/login" className="login-btn">
                  Login
                </Button>
              </div>
              <div className="hero-features">
                <div className="feature">
                  <div className="feature-icon">🔍</div>
                  <h3>Discover</h3>
                  <p>Find relevant tender opportunities</p>
                </div>
                <div className="feature">
                  <div className="feature-icon">💬</div>
                  <h3>Discuss</h3>
                  <p>Engage with a community of professionals</p>
                </div>
                <div className="feature">
                  <div className="feature-icon">🤝</div>
                  <h3>Collaborate</h3>
                  <p>Partner on tender applications</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Home;