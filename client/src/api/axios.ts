import axios from 'axios';

const api = axios.create({
  // Use the backend URL from environment variable if provided, otherwise fall back to relative "/api" path
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 