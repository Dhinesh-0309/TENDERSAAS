import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import { FaSignOutAlt, FaClipboardList, FaComments, FaSearch, FaChartLine, FaUser } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Dashboard.css";
import axios from 'axios';


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [tenders, setTenders] = useState([
    { 
      id: 1, 
      title: "Cloud Infrastructure Upgrade", 
      industry: "IT", 
      deadline: "April 30, 2025",
      status: "Open",
      bidders: 7,
      budget: "$150,000 - $200,000",
      description: "Modernization of cloud infrastructure for a medium-sized financial institution."
    },
    { 
      id: 2, 
      title: "Cybersecurity Audit for Financial Sector", 
      industry: "Cybersecurity", 
      deadline: "May 15, 2025",
      status: "Open",
      bidders: 4,
      budget: "$80,000 - $120,000",
      description: "Comprehensive security assessment and compliance verification for banking services."
    },
    { 
      id: 3, 
      title: "Highway Expansion Project", 
      industry: "Construction", 
      deadline: "June 10, 2025",
      status: "Open",
      bidders: 12,
      budget: "$5,000,000 - $7,000,000",
      description: "Major infrastructure development project for regional transportation network."
    },
    { 
      id: 4, 
      title: "Healthcare Data Migration Services", 
      industry: "IT", 
      deadline: "May 5, 2025",
      status: "Open",
      bidders: 6,
      budget: "$90,000 - $150,000",
      description: "Secure transfer of patient records to new cloud-based medical information system."
    },
    { 
      id: 5, 
      title: "AI Implementation for Customer Service", 
      industry: "IT", 
      deadline: "May 20, 2025",
      status: "Open",
      bidders: 9,
      budget: "$200,000 - $350,000",
      description: "Development of AI-powered customer support tools with natural language processing."
    },
  ]);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/api/tenders/latest/");
        setTenders(response.data);
      } catch (error) {
        console.error("Error fetching tenders:", error);
      }
    };
    fetchTenders();
  }, []);

  const [recentActivity] = useState([
    { id: 1, type: "tender", message: "New tender posted in IT sector", time: "2 hours ago" },
    { id: 2, type: "forum", message: "Your post received 5 new replies", time: "Yesterday" },
    { id: 3, type: "tender", message: "Deadline extended for Cybersecurity Audit", time: "2 days ago" },
  ]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user_details"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const relevantTenders = tenders.filter(tender => 
    tender.industry === user?.industry && 
    (searchQuery === "" || tender.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="dashboard-page">
      <Header />
      <ToastContainer theme="dark" />
      
      <Container fluid className="dashboard-container py-4">
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="sidebar-container mb-4 mb-md-0">
            <Card className="sidebar-card h-100">
              <Card.Body className="p-3">
                <div className="user-profile text-center mb-4">
                  <div className="user-avatar">
                    <FaUser className="avatar-icon" />
                  </div>
                  <h5 className="user-name mt-3 mb-1">{user?.username || "User"}</h5>
                  <p className="user-company">{user?.company || user?.industry || "Company"}</p>
                </div>
                
                <div className="sidebar-menu">
                  <Button 
                    className="menu-item active d-flex align-items-center w-100 mb-2" 
                    onClick={() => navigate("/dashboard")}
                  >
                    <FaChartLine className="me-2" /> Dashboard
                  </Button>
                  <Button 
                    className="menu-item d-flex align-items-center w-100 mb-2" 
                    onClick={() => navigate("/tenders")}
                  >
                    <FaClipboardList className="me-2" /> All Tenders
                  </Button>
                  <Button 
                    className="menu-item d-flex align-items-center w-100 mb-2" 
                    onClick={() => navigate("/community")}
                  >
                    <FaComments className="me-2" /> Community Forum
                  </Button>
                  <Button 
                    className="menu-item logout d-flex align-items-center w-100" 
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Main Content */}
          <Col md={9} lg={10}>
            {/* Welcome Header */}
            <Card className="welcome-card mb-4">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col>
                    <h2 className="welcome-title">Welcome, {user?.username} 👋</h2>
                    <p className="welcome-subtitle">Explore tenders relevant to your industry.</p>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="search-container">
                      <FaSearch className="search-icon" />
                      <Form.Control
                        type="text"
                        placeholder="Search tenders..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            {/* Stats Cards */}
            <Row className="stats-row mb-4">
              <Col md={3} sm={6} className="mb-3 mb-md-0">
                <Card className="stat-card">
                  <Card.Body className="p-3">
                    <h3 className="stat-value">{relevantTenders.length}</h3>
                    <p className="stat-label">Relevant Tenders</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} sm={6} className="mb-3 mb-md-0">
                <Card className="stat-card">
                  <Card.Body className="p-3">
                    <h3 className="stat-value">2</h3>
                    <p className="stat-label">Active Bids</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} sm={6} className="mb-3 mb-md-0">
                <Card className="stat-card">
                  <Card.Body className="p-3">
                    <h3 className="stat-value">14</h3>
                    <p className="stat-label">Forum Activity</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} sm={6}>
                <Card className="stat-card">
                  <Card.Body className="p-3">
                    <h3 className="stat-value">3</h3>
                    <p className="stat-label">Days Since Last Bid</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            {/* Tabs */}
            <div className="dashboard-tabs mb-4">
              <Button 
                className={`tab-button ${activeTab === "recommended" ? "active" : ""}`}
                onClick={() => setActiveTab("recommended")}
              >
                Recommended Tenders
              </Button>
              <Button 
                className={`tab-button ${activeTab === "recent" ? "active" : ""}`}
                onClick={() => setActiveTab("recent")}
              >
                Recent Activity
              </Button>
            </div>
            
            {/* Recommended Tenders Tab */}
            {activeTab === "recommended" && (
              <div className="tenders-section">
                <h3 className="section-title mb-4">Tenders for {user?.industry || "Your Industry"}</h3>
                
                {relevantTenders.length > 0 ? (
                  <Row>
                    {relevantTenders.map((tender) => (
                      <Col lg={6} className="mb-4" key={tender.id}>
                        <Card className="tender-card">
                          <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <h4 className="tender-title">{tender.title}</h4>
                              <Badge className="status-badge">{tender.status}</Badge>
                            </div>
                            <p className="tender-description">{tender.description}</p>
                            <div className="tender-details">
                              <div className="detail-item">
                                <span className="detail-label">Industry:</span>
                                <span className="detail-value">{tender.industry}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Deadline:</span>
                                <span className="detail-value">{tender.deadline}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Bidders:</span>
                                <span className="detail-value">{tender.bidders}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Budget:</span>
                                <span className="detail-value">{tender.budget}</span>
                              </div>
                            </div>
                            <div className="tender-actions mt-3">
                              <Button className="action-button view-btn">View Details</Button>
                              <Button className="action-button apply-btn">Apply Now</Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Card className="empty-state-card">
                    <Card.Body className="p-4 text-center">
                      <FaClipboardList className="empty-icon mb-3" />
                      <h4>No tenders available for your industry.</h4>
                      <p className="mb-4">We'll notify you when relevant tenders are posted.</p>
                      <Button className="browse-button">Browse All Tenders</Button>
                    </Card.Body>
                  </Card>
                )}
              </div>
            )}
            
            {/* Recent Activity Tab */}
            {activeTab === "recent" && (
              <div className="activity-section">
                <h3 className="section-title mb-4">Recent Activity</h3>
                
                <Card className="activity-card">
                  <Card.Body className="p-0">
                    {recentActivity.map((activity) => (
                      <div className="activity-item" key={activity.id}>
                        <div className="activity-icon">
                          {activity.type === "tender" ? <FaClipboardList /> : <FaComments />}
                        </div>
                        <div className="activity-content">
                          <p className="activity-message">{activity.message}</p>
                          <span className="activity-time">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
                
                <Card className="community-card mt-4">
                  <Card.Body className="p-4">
                    <h3 className="card-title">Community Updates</h3>
                    <Row>
                      <Col md={6}>
                        <div className="community-update">
                          <h5>Latest Discussions</h5>
                          <p>Join the conversation on the latest procurement practices</p>
                          <Button className="text-button">View Forum →</Button>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="community-update">
                          <h5>Upcoming Webinar</h5>
                          <p>March 20: "Winning Government Tenders - Best Practices"</p>
                          <Button className="text-button">Register Now →</Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      
      <Footer />
    </div>
  );
};

export default Dashboard;