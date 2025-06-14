import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: []
  });

  const categories = [
    { id: 'general', name: 'General Discussion' },
    { id: 'experiences', name: 'Experiences' },
    { id: 'tips', name: 'Tips & Advice' },
    { id: 'questions', name: 'Questions' },
    { id: 'success-stories', name: 'Success Stories' }
  ];

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all'
        ? `/api/forum?page=${currentPage}`
        : `/api/forum/category/${selectedCategory}?page=${currentPage}`;
      
      const response = await axios.get(url);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forum', newPost);
      setPosts(prev => [response.data, ...prev]);
      setNewPost({
        title: '',
        content: '',
        category: 'general',
        tags: []
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`/api/forum/${postId}/like`);
      setPosts(prev =>
        prev.map(post =>
          post._id === postId ? response.data : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Community Forum
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Post title"
              value={newPost.title}
              onChange={e => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <textarea
              placeholder="Share your thoughts..."
              value={newPost.content}
              onChange={e => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              rows="4"
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <select
              value={newPost.category}
              onChange={e => setNewPost(prev => ({ ...prev, category: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-700 hover:bg-orange-50'
          }`}
        >
          All Posts
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {post.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <img
                    src={post.userId.profile?.avatar || '/default-avatar.png'}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">
                    {post.userId.username}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {categories.find(c => c.id === post.category)?.name}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{post.content}</p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button
                onClick={() => handleLike(post._id)}
                className="flex items-center space-x-1 hover:text-orange-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <span>{post.likes.length}</span>
              </button>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{post.comments.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentPage === page
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityForum; 