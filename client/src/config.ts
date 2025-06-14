export const config = {
  API_URL: import.meta.env.PROD
    ? 'https://your-backend-url.com'  // You'll replace this with your actual backend URL
    : 'http://localhost:5001',
}; 