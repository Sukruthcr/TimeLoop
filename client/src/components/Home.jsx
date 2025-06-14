import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="relative">
      {/* Hero Section with Header */}
      <div className="relative bg-[#1a2b4c] h-[500px]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2b4c]/90 to-[#2a3b5c]/90"></div>
        </div>
        
        {/* Header Content */}
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Letters to Future Self
            </h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/archive"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-[#1a2b4c] bg-white hover:bg-blue-50"
              >
                Read Public Letters
              </Link>
              <a
                href="https://www.linkedin.com/in/sukruth-c-r-521b41246/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#2a3b5c] hover:bg-[#3a4b6c]"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
          
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Write letters to your future self, capture your thoughts, dreams, and aspirations. 
            Set a future date and let your words travel through time.
          </p>
          
          <div className="mt-10">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#1a2b4c] bg-white hover:bg-blue-50 md:text-lg"
            >
              Start Writing Your Future
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Features that make your journey special
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need to preserve your thoughts and memories for the future
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-[#1a2b4c]/10 rounded-lg p-6">
              <h3 className="text-lg font-medium text-[#1a2b4c]">Time Capsule</h3>
              <p className="mt-2 text-base text-[#2a3b5c]">
                Schedule your letters to be delivered at any future date you choose
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#1a2b4c]/10 rounded-lg p-6">
              <h3 className="text-lg font-medium text-[#1a2b4c]">Rich Media</h3>
              <p className="mt-2 text-base text-[#2a3b5c]">
                Attach photos and videos to make your letters more meaningful
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#1a2b4c]/10 rounded-lg p-6">
              <h3 className="text-lg font-medium text-[#1a2b4c]">Community</h3>
              <p className="mt-2 text-base text-[#2a3b5c]">
                Share and connect with others through public letters
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 