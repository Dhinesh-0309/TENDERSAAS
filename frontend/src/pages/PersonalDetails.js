import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/PersonalDetails.css";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    full_name: "",
    startup_name: "",
    industry: "",
    funding_stage: "",
    location: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/user/save-details/", details, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("user_details", JSON.stringify(details));
      toast.success("Profile updated successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Error saving details. Skipping errors...");
      localStorage.setItem("user_details", JSON.stringify(details));
      toast.info("Profile saved locally. Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="personal-details-page">
      <Header />
      <Container className="py-5">
        <ToastContainer theme="dark" />
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="details-card">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="details-title">Complete Your Profile</h2>
                  <p className="details-subtitle">Help us personalize your TenderSaaS experience</p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="full_name"
                      className="form-input"
                      placeholder="Enter your full name"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Startup Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="startup_name"
                      className="form-input"
                      placeholder="Enter your startup name"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Industry</Form.Label>
                    <Form.Control
                      type="text"
                      name="industry"
                      className="form-input"
                      placeholder="e.g. FinTech, Healthcare, E-commerce"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Funding Stage</Form.Label>
                    <Form.Control
                      type="text"
                      name="funding_stage"
                      className="form-input"
                      placeholder="e.g. Pre-seed, Seed, Series A"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      className="form-input"
                      placeholder="City, Country"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Button
                    type="submit"
                    className="details-button w-100"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save & Proceed"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default PersonalDetails;