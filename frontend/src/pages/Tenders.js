import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Badge, Button, Spinner } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Tenders.css";

const Tenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/api/tenders/");
        setTenders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching tenders. Please try again.");
        setLoading(false);
      }
    };
    fetchTenders();
  }, []);

  return (
    <div className="tenders-page">
      <Header />
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h1 className="page-title">Available Tenders</h1>
            <p className="page-subtitle">Browse and find the right opportunities for your business</p>
          </Col>
        </Row>
        
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="custom-spinner" />
            <p className="mt-3 loading-text">Loading available tenders...</p>
          </div>
        ) : error ? (
          <Card className="error-card p-4 text-center">
            <Card.Body>
              <i className="fas fa-exclamation-circle error-icon"></i>
              <p className="error-message">{error}</p>
              <Button 
                className="retry-button mt-3" 
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {tenders.length > 0 ? (
              tenders.map((tender) => (
                <Col lg={6} className="mb-4" key={tender.id}>
                  <Card className="tender-card h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Card.Title className="tender-title">{tender.title}</Card.Title>
                        <Badge className={`status-badge status-${tender.status.toLowerCase()}`}>
                          {tender.status}
                        </Badge>
                      </div>
                      
                      <div className="tender-info mb-3">
                        <div className="info-item">
                          <span className="info-label">Type:</span>
                          <span className="info-value">{tender.tender_type}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Location:</span>
                          <span className="info-value">{tender.location}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Deadline:</span>
                          <span className="info-value deadline">{tender.deadline}</span>
                        </div>
                      </div>
                      
                      <Link to={`/tenders/${tender.id}`} className="view-details-btn">
                        View Details
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col xs={12}>
                <Card className="empty-card text-center p-5">
                  <Card.Body>
                    <i className="fas fa-file-invoice empty-icon"></i>
                    <p className="empty-message">No tenders available at the moment.</p>
                    <p className="empty-submessage">Check back soon for new opportunities</p>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Tenders;