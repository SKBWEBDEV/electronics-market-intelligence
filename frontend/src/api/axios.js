import axios from "axios";

const api = axios.create({
  baseURL: "https://electronics-market-intelligence.onrender.com"
});

export default api;