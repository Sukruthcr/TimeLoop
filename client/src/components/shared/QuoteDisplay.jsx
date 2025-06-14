import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteDisplay = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/quotes/random');
      setQuote(response.data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const handleLike = async () => {
    try {
      await axios.post(`/api/quotes/${quote._id}/like`);
      setQuote(prev => ({ ...prev, likes: prev.likes + 1 }));
    } catch (error) {
      console.error('Error liking quote:', error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return quote ? (
    <div className="bg-white rounded-lg shadow-md p-6 my-4">
      <blockquote className="text-lg italic text-gray-700 mb-4">
        "{quote.text}"
      </blockquote>
      <div className="flex justify-between items-center">
        <cite className="text-sm text-gray-600">— {quote.author}</cite>
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span>{quote.likes}</span>
        </button>
      </div>
      <div className="mt-2">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {quote.category}
        </span>
      </div>
    </div>
  ) : null;
};

export default QuoteDisplay; 