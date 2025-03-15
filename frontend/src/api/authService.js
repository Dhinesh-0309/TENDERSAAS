import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth/";

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}signup/`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Signup Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response.data);
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login/`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Login Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response.data);
    throw error.response.data;
  }
};
