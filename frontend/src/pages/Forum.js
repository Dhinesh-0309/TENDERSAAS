import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Forum.css";

const Forum = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [commentText, setCommentText] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Load user details from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user_details"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // Fetch Forum Posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/forum/posts/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load forum posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Create New Post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/forum/posts/",
        {
          title,
          content,
          user: user?.id || 1,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setPosts([...posts, response.data]);
      setTitle("");
      setContent("");
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error);
      toast.error("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  // Like Post
  const handleLike = async (postId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/forum/posts/${postId}/like/`, {}, {});
      
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes_count: post.likes_count + 1 } : post
      ));
      toast.success("Post liked!");
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post.");
    }
  };

  // Add Comment
  const handleComment = async (postId) => {
    if (!commentText[postId]) return;

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/forum/posts/${postId}/comments/`,
        {
          text: commentText[postId],
          user: user?.id || 1,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...(post.comments || []), response.data] }
            : post
        )
      );

      setCommentText({ ...commentText, [postId]: "" });
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };

  // Search Filter
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="forum-page">
      <Header />
      <Container className="py-5">
        <ToastContainer theme="dark" />
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="forum-card mb-4">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="forum-title">Community Forum</h2>
                  <p className="forum-subtitle">Welcome, {user?.username || "User"}</p>
                </div>

                {/* Search Bar */}
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-input"
                  />
                </Form.Group>

                {/* Create Post Form */}
                <Form onSubmit={handleCreatePost} className="mb-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter post title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Post Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Share your thoughts..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="form-input"
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="forum-button w-100"
                    disabled={loading}
                  >
                    {loading ? "Posting..." : "Create Post"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Display Forum Posts */}
            <h3 className="forum-section-title mb-3">All Posts</h3>
            {loading && <p className="text-center text-muted">Loading posts...</p>}
            
            {!loading && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id} className="forum-post-card mb-3">
                  <Card.Body className="p-4">
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-content">{post.content}</p>
                    <p className="post-author">
                      <strong>Posted by:</strong> {post.username || "Unknown"}
                    </p>
                    <Button 
                      onClick={() => handleLike(post.id)}
                      className="like-button"
                    >
                      👍 {post.likes || 0}
                    </Button>

                    {/* Comment Section */}
                    <div className="comments-section mt-4">
                      <h5 className="comments-title">Comments</h5>
                      <div className="comments-container">
                        {post.comments && post.comments.length > 0 ? (
                          post.comments.map((comment, index) => (
                            <div key={index} className="comment-item">
                              <strong className="comment-author">{comment.username || "User"}</strong>
                              <p className="comment-text">{comment.text}</p>
                            </div>
                          ))
                        ) : (
                          <p className="no-comments-text">No comments yet.</p>
                        )}
                      </div>

                      <Form.Group className="mt-3">
                        <Form.Control
                          type="text"
                          placeholder="Write a comment..."
                          value={commentText[post.id] || ""}
                          onChange={(e) =>
                            setCommentText({ ...commentText, [post.id]: e.target.value })
                          }
                          className="form-input"
                        />
                      </Form.Group>
                      <Button 
                        onClick={() => handleComment(post.id)}
                        className="comment-button mt-2"
                      >
                        Post Comment
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : !loading && (
              <p className="text-center text-muted">No posts found.</p>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Forum;