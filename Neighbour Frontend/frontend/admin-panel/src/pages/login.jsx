


import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../index.css"; 
import logo from "../assets/images/logo.jpeg";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    
    if (email === "priyabarjatia1280@gmail.com" && password === "Kabir@2002") {
      alert("Login successful!");
      navigate("/admin");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <>
      
      <nav className="admin-navbar">
        <div className="admin-navbar-container">
          <img src={logo} alt="PlatterGo Logo" style={{ height: "50px", borderRadius: 80 }} />
          <h1 className="admin-logo">Neighborhood Safety Admin</h1>
         
        </div>
      </nav>

      
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2 className="admin-login-title">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
