import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-light via-purple-mid to-blue-light">
      <nav className="w-full bg-white/80 backdrop-blur-sm shadow-sm text-black">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary animate-spin-slow hover:animate-pulse transition-all duration-300">⌛</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent animate-float hover:scale-105 transition-transform duration-300 ml-2">TimeLoop</span>
              </Link>
              <div className="hidden md:flex space-x-1">
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg transition-colors text-gray-700 ${
                    location.pathname === '/' 
                      ? 'bg-primary/10' 
                      : 'hover:bg-primary/5'
                  }`}
                >
                  ✍️ Write a Letter
                </Link>
                <Link
                  to="/public-letters"
                  className={`px-4 py-2 rounded-lg transition-colors text-gray-700 ${
                    location.pathname === '/public-letters'
                      ? 'bg-primary/10'
                      : 'hover:bg-primary/5'
                  }`}
                >
                  📖 Read Public Letters
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-gray-700">
                Welcome, {user?.username}!
              </div>
              <button
                onClick={signOut}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>

      <footer className="w-full bg-white/80 backdrop-blur-sm text-black">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-center text-gray-600 text-sm">
              Write a letter to your future us. © 2025
            </p>
            <a 
              href="https://www.linkedin.com/in/sukruth-cr-7061a0257/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="font-medium">Connect with Sukruth CR</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
} 