import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await signUp({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      navigate('/'); // Navigate to home after successful signup
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.response?.data?.error || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-page-bg">
      <nav className="w-full bg-page-bg text-black">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary animate-spin-slow hover:animate-pulse transition-all duration-300">⌛</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent animate-float hover:scale-105 transition-transform duration-300 ml-2">TimeLoop</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Link
                to="/signin"
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="max-w-md w-full mx-4 space-y-8 p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-black">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-black/20 bg-black/10 placeholder-black/60 text-black focus:outline-none focus:ring-black/50 focus:border-black/50 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  minLength={3}
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-black/20 bg-black/10 placeholder-black/60 text-black focus:outline-none focus:ring-black/50 focus:border-black/50 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-black/20 bg-black/10 placeholder-black/60 text-black focus:outline-none focus:ring-black/50 focus:border-black/50 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                />
              </div>
              <div>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-black/20 bg-black/10 placeholder-black/60 text-black focus:outline-none focus:ring-black/50 focus:border-black/50 focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 