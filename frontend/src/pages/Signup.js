import React, { useState } from "react";
import { signup } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signup(formData);
      localStorage.setItem("user_details", JSON.stringify(data.user)); // ✅ Save user details
      toast.success("Signup successful! Redirecting...");
      setTimeout(() => navigate("/personal-details"), 2000);
    } catch (error) {
      toast.error(error.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Header />
      <Container className="py-5">
        <ToastContainer theme="dark" />
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="signup-card">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="signup-title">Create Your Account</h2>
                  <p className="signup-subtitle">Join our community of tender professionals</p>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="username" 
                      className="form-input"
                      placeholder="Choose a username"
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email" 
                      className="form-input"
                      placeholder="Enter your email address"
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="password" 
                      className="form-input"
                      placeholder="Create a secure password"
                      onChange={handleChange} 
                      required 
                    />
                    <Form.Text className="text-muted password-hint">
                      Password should be at least 8 characters long
                    </Form.Text>
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    className="signup-button w-100"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Sign Up"}
                  </Button>

                  <div className="text-center mt-4">
                    <p className="login-link">
                      Already have an account? <a href="/login">Log in</a>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="features-section mt-4">
              <div className="feature-item">
                <div className="feature-icon">🔍</div>
                <div className="feature-text">Discover relevant tender opportunities</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <div className="feature-text">Collaborate with other professionals</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div className="feature-text">Track your tender applications</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Signup;