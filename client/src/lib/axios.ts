import axios from 'axios';

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5001/api'
      : 'https://timeloop-zbq9.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance; 