import React, { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(formData);
      if (data.access) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("user_details", JSON.stringify(data.user));
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error("Invalid login credentials.");
      }
    } catch (error) {
      toast.error("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <Header />
      <Container className="py-5">
        <ToastContainer theme="dark" />
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="login-card">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="login-title">Welcome Back</h2>
                  <p className="login-subtitle">Access your TenderSaaS account</p>
                </div>
                
                <Form onSubmit={handleSubmit}>
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
                      placeholder="Enter your password"
                      onChange={handleChange} 
                      required 
                    />
                    <div className="d-flex justify-content-end mt-2">
                      <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    </div>
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    className="login-button w-100"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>

                  <div className="text-center mt-4">
                    <p className="signup-link">
                      Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                  </div>
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

export default Login;