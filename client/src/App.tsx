import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import WriteLetterPage from './pages/WriteLetterPage';
import PublicLettersPage from './pages/PublicLettersPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes without main layout */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Protected routes with main layout */}
      <Route element={<Layout />}>
        <Route index element={
          <ProtectedRoute>
            <WriteLetterPage />
          </ProtectedRoute>
        } />
        <Route path="public-letters" element={
          <ProtectedRoute>
            <PublicLettersPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
