import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountdownTimer from './shared/CountdownTimer';

const LetterArchive = () => {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, delivered, pending

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/letters/my');
      setLetters(response.data);
    } catch (error) {
      console.error('Error fetching letters:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLetters = letters.filter(letter => {
    if (filter === 'delivered') return letter.isDelivered;
    if (filter === 'pending') return !letter.isDelivered;
    return true;
  });

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg p-6">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Letters</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'pending'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-50'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('delivered')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'delivered'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-50'
            }`}
          >
            Delivered
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredLetters.map(letter => (
          <div
            key={letter._id}
            className={`bg-white rounded-lg shadow-md overflow-hidden ${letter.theme}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {letter.subject}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(letter.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    letter.isDelivered
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {letter.isDelivered ? 'Delivered' : 'Pending'}
                </span>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">{letter.message}</p>

              {letter.attachments.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Attachments
                  </h4>
                  <div className="flex space-x-2">
                    {letter.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center"
                      >
                        {attachment.type === 'image' ? (
                          <img
                            src={attachment.url}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!letter.isDelivered && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Time until delivery
                  </div>
                  <CountdownTimer deliveryDate={letter.deliveryDate} />
                </div>
              )}

              {letter.isPublic && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      {letter.likes.length}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {letter.comments.length}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LetterArchive; 