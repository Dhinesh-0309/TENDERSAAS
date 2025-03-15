import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Badge, Button, Spinner } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/TenderCard.css";

const TenderDetail = () => {
  const { id } = useParams();
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/api/tenders/${id}/`);
        setTender(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching tender details.");
        setLoading(false);
      }
    };
    fetchTender();
  }, [id]);

  return (
    <div className="tender-detail-page">
      <Header />
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <Link to="/tenders" className="back-link">
              &larr; Back to Tenders
            </Link>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="custom-spinner" />
            <p className="mt-3 loading-text">Loading tender details...</p>
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
        ) : !tender ? (
          <Card className="error-card p-4 text-center">
            <Card.Body>
              <i className="fas fa-file-excel error-icon"></i>
              <p className="error-message">No tender details found.</p>
              <Link to="/tenders" className="retry-button mt-3 btn">
                Browse Tenders
              </Link>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            <Col lg={12}>
              <Card className="detail-card">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap">
                    <h1 className="tender-title">{tender.title}</h1>
                    <Badge className={`status-badge status-${tender.status.toLowerCase()}`}>
                      {tender.status}
                    </Badge>
                  </div>
                  
                  <Row className="mb-4">
                    <Col md={6}>
                      <Card className="info-card mb-3">
                        <Card.Body>
                          <h5 className="info-section-title">Tender Information</h5>
                          <div className="info-grid">
                            <div className="info-item">
                              <span className="info-label">Sector:</span>
                              <span className="info-value">{tender.sector}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Type:</span>
                              <span className="info-value">{tender.tender_type}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Location:</span>
                              <span className="info-value">{tender.location}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Published by:</span>
                              <span className="info-value">{tender.published_by}</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="info-card mb-3">
                        <Card.Body>
                          <h5 className="info-section-title">Key Details</h5>
                          <div className="info-grid">
                            <div className="info-item">
                              <span className="info-label">Value:</span>
                              <span className="info-value value-highlight">${tender.tender_value}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Deadline:</span>
                              <span className="info-value deadline-highlight">{tender.deadline}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">ID:</span>
                              <span className="info-value">{tender.id}</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  
                  <Card className="description-card">
                    <Card.Body>
                      <h5 className="info-section-title mb-3">Description</h5>
                      <div className="description-content">
                        {tender.description}
                      </div>
                    </Card.Body>
                  </Card>
                  
                  <div className="action-buttons mt-4">
                    <Button className="apply-button">Apply for Tender</Button>
                    <Button variant="outline" className="save-button">Save for Later</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default TenderDetail;