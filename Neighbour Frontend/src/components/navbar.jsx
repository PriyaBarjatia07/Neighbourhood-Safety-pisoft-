import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Popconfirm, message } from 'antd';
import Logo from "../assets/images/logo.jpeg";
import "../index.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem("jwtToken"));
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("Username");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("email");

    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));

    message.success("You have been logged out.");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={Logo} alt="logo" />
        <div className="logo">Neighborhood Safety Dashboard</div>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/report">Report</NavLink></li>
        <li><NavLink to="/map">Safety Map</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        {isLoggedIn ? (
          <li>
            <Popconfirm
              title="Are you sure you want to logout?"
              onConfirm={handleLogout}
              okText="Yes"
              cancelText="No"
            >
              <button className="logout-button">Logout</button>
            </Popconfirm>
          </li>
        ) : (
          <li><NavLink to="/login">Login</NavLink></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


