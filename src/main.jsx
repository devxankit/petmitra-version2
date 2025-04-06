import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import About from './pages/About.jsx';
import Adopt from './pages/Adopt.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext.jsx'; // Import AuthProvider
import MobileBottomNav from './components/MobileBottomNav.jsx';
import HomePage2 from './components/HomePage2.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<App />} />
        <Route path="/home" element={<HomePage2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
    <MobileBottomNav />
  </BrowserRouter>
);