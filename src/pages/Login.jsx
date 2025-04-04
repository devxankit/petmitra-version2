import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx"; // Use AuthContext for authentication

// SVG Icons
const MailIcon = () => (
  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const UserIcon = () => (
  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LockIcon = () => (
  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    userType: "individual",
    phoneNumber: "",
    organizationName: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login method from AuthContext

  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://petmitra-version2.onrender.com/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      login(res.data.token); // Use login method from AuthContext
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    if (formData.password !== formData.reEnterPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        reEnterPassword: formData.reEnterPassword,
        userType: formData.userType,
        phoneNumber: formData.phoneNumber,
        ...(formData.userType === "organization" && { organizationName: formData.organizationName }),
      };
      await axios.post("https://petmitra-version2.onrender.com/api/auth/signup", dataToSend);
      alert("Signup successful! Please login.");
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {isLogin ? (
          <div className="w-full max-w-md space-y-6 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome back</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="relative">
                <span className="absolute left-3 top-3"><MailIcon /></span>
                <input type="email" name="email" placeholder="Email address" className="w-full pl-10 pr-4 py-2 border rounded-lg" onChange={handleChange} required />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3"><LockIcon /></span>
                <input type="password" name="password" placeholder="Password" className="w-full pl-10 pr-4 py-2 border rounded-lg" onChange={handleChange} required />
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg">Sign In</button>
            </form>
            <p className="text-center text-sm">Don't have an account? <button onClick={() => setIsLogin(false)} className="text-blue-600">Sign up</button></p>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-6 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Create an account</h2>
            <form className="space-y-4" onSubmit={handleSignup}>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="relative">
                <span className="absolute left-3 top-3"><UserIcon /></span>
                <input type="text" name="name" placeholder="Full name" className="w-full pl-10 pr-4 py-2 border rounded-lg" onChange={handleChange} required />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3"><MailIcon /></span>
                <input type="email" name="email" placeholder="Email address" className="w-full pl-10 pr-4 py-2 border rounded-lg" onChange={handleChange} required />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3"><PhoneIcon /></span>
                <input type="tel" name="phoneNumber" placeholder="Phone Number" className="w-full pl-10 pr-4 py-2 border rounded-lg" onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="individual" className="flex items-center space-x-2">
                  <input id="individual" type="radio" name="userType" value="individual" checked={formData.userType === "individual"} onChange={handleChange} className="form-radio" />
                  <span>Individual</span>
                </label>
                <label htmlFor="organization" className="flex items-center space-x-2">
                  <input id="organization" type="radio" name="userType" value="organization" checked={formData.userType === "organization"} onChange={handleChange} className="form-radio" />
                  <span>Organization</span>
                </label>
                <label htmlFor="doctor" className="flex items-center space-x-2">
                  <input id="doctor" type="radio" name="userType" value="doctor" checked={formData.userType === "doctor"} onChange={handleChange} className="form-radio" />
                  <span>Doctor</span>
                </label>
              </div>
              {formData.userType === "organization" && (
                <div className="relative">
                  <span className="absolute left-3 top-3"><UserIcon /></span>
                  <input type="text" name="organizationName" placeholder="Name of Organization" className="w-full pl-10 pr-4 py-2 border rounded-lg" onChange={handleChange} required />
                </div>
              )}
              <div className="relative">
                <span className="absolute left-3 top-3"><LockIcon /></span>
                <input type="password" name="password" placeholder="Password" className="w-full pl-10 pr-4 py-2 border rounded-lg" onChange={handleChange} required />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3"><LockIcon /></span>
                <input type="password" name="reEnterPassword" placeholder="Re-enter Password" className="w-full pl-10 pr-4 py-2 border rounded-lg" onChange={handleChange} required />
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg">Sign Up</button>
            </form>
            <p className="text-center text-sm">Already have an account? <button onClick={() => setIsLogin(true)} className="text-blue-600">Sign in</button></p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;