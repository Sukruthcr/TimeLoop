import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import LetterArchive from './components/LetterArchive';
import CommunityForum from './components/CommunityForum';
import QuoteDisplay from './components/shared/QuoteDisplay';

function Navigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary animate-spin-slow hover:animate-pulse transition-all duration-300">⌛</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent animate-float hover:scale-105 transition-transform duration-300 ml-2">TimeLoop</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <>
                <span className="mr-4 text-gray-700">Welcome, {user.username}!</span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#1a2b4c] hover:bg-[#2a3b5c]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#1a2b4c] hover:bg-[#2a3b5c]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#1a2b4c]">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/archive"
                element={
                  <ProtectedRoute>
                    <LetterArchive />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forum"
                element={
                  <ProtectedRoute>
                    <CommunityForum />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 