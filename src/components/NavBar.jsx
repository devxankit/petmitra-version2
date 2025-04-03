import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { PawPrint, Menu, X, LayoutDashboard } from "lucide-react";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative bg-indigo-100 p-2 rounded-xl overflow-hidden transition-all duration-300 group-hover:bg-indigo-200">
            <PawPrint className="h-6 w-6 text-indigo-600 relative z-10 transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-indigo-50 rounded-xl transform rotate-45 scale-0 transition-transform duration-500 group-hover:scale-100"></div>
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-indigo-700">
            Pet <span className="text-indigo-500">Mitra</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-800 hover:text-indigo-600 font-medium">Home</Link>
          <Link to="/about" className="text-gray-800 hover:text-indigo-600 font-medium">About</Link>
          <Link to="/Adopt" className="text-gray-800 hover:text-indigo-600 font-medium">Pet Adoption</Link>
          <Link to="/contact" className="text-gray-800 hover:text-indigo-600 font-medium">Contact</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-800 hover:text-indigo-600 font-medium flex items-center gap-1">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button onClick={logout} className='text-gray-800 font-semibold text-lg hover:text-indigo-600'>Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-gray-800 hover:text-indigo-600 font-medium">Login</Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-md text-gray-800 border border-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="px-2 py-2 font-medium hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="px-2 py-2 font-medium hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/Adopt" className="px-2 py-2 font-medium hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>Pet Adoption</Link>
            <Link to="/contact" className="px-2 py-2 font-medium hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-2 py-2 font-medium hover:bg-gray-100 rounded-md flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button onClick={logout} className='px-2 py-2 font-medium text-left w-full hover:bg-gray-100 rounded-md'>Logout</button>
              </>
            ) : (
              <Link to="/login" className="px-2 py-2 font-medium hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default NavBar;