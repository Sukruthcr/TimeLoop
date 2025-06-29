import axios from 'axios';

const api = axios.create({
  // baseURL: '/api', // Optional: use relative paths
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 