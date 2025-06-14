import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Letter {
  id: string;
  subject: string;
  message: string;
  author: string;
  createdAt: string;
  deliveryDate: string;
}

export default function PublicLettersPage() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const [expandedLetter, setExpandedLetter] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicLetters = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/letters/public', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setLetters(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch public letters:', err);
        setError('Failed to load public letters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicLetters();
  }, [token]);

  const toggleLetter = (id: string) => {
    setExpandedLetter(expandedLetter === id ? null : id);
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Public Letters</h1>
          <p className="text-xl text-black/80">Loading letters...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Public Letters</h1>
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          Public Letters
        </h1>
        <p className="text-xl text-black/80">
          Read letters from others and get inspired 💫
        </p>
      </div>

      {letters.length === 0 ? (
        <div className="text-center text-black/80">
          No public letters available yet. Be the first to share your letter!
        </div>
      ) : (
        <div className="space-y-6">
          {letters.map((letter) => (
            <div
              key={letter.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-4"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-black">
                  {letter.subject}
                </h3>
                <p className="text-sm text-black/70">
                  Written by {letter.author} on {new Date(letter.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-black/70">
                  To be delivered on {new Date(letter.deliveryDate).toLocaleDateString()}
                </p>
              </div>
              
              <p className={`text-black/80 ${expandedLetter === letter.id ? '' : 'line-clamp-4'}`}>
                {letter.message}
              </p>

              <button
                onClick={() => toggleLetter(letter.id)}
                className="px-4 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 font-medium text-sm"
              >
                {expandedLetter === letter.id ? 'Show less' : 'Read more'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 