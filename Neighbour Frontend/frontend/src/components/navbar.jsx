

// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router';
// import { Popconfirm, message } from 'antd';
// import Logo from "../assets/images/logo.jpeg";
// import "../index.css";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleAuthChange = () => {
//       setIsLoggedIn(!!localStorage.getItem("jwtToken"));
//     };

//     window.addEventListener("authChange", handleAuthChange);
//     return () => {
//       window.removeEventListener("authChange", handleAuthChange);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("jwtToken");
//     localStorage.removeItem("Username");
//     localStorage.removeItem("userId");
//     sessionStorage.removeItem("email");

//     setIsLoggedIn(false);
//     window.dispatchEvent(new Event("authChange"));
//     message.success("You have been logged out.");
//     navigate("/login");
//   };

//   return (
//     <header className="navbar">
//       <div className="logo-container">
//         <img src={Logo} alt="logo" />
//         <div className="logo">Neighborhood Safety Dashboard</div>
//         <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
//           ☰
//         </div>
//       </div>

//       <nav className={`nav-links ${isOpen ? "open" : ""}`}>
//         <ul>
//           <li><NavLink to="/home" onClick={() => setIsOpen(false)}>Home</NavLink></li>
//           <li><NavLink to="/report" onClick={() => setIsOpen(false)}>Report</NavLink></li>
//           <li><NavLink to="/map" onClick={() => setIsOpen(false)}>Safety Map</NavLink></li>
//           <li><NavLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</NavLink></li>
//           {isLoggedIn ? (
//             <li>
//               <Popconfirm
//                 title="Are you sure you want to logout?"
//                 onConfirm={() => {
//                   setIsOpen(false);
//                   handleLogout();
//                 }}
//                 okText="Yes"
//                 cancelText="No"
//               >
//                 <button className="logout-button">Logout</button>
//               </Popconfirm>
//             </li>
//           ) : (
//             <li><NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink></li>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Popconfirm, message } from 'antd';
import Logo from "../assets/images/logo.jpeg";
import "../index.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("jwtToken"));
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
    <header className="navbar">
      <div className="logo-container">
        <img src={Logo} alt="logo" />
        <div className="logo">Neighborhood Safety Dashboard</div>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </div>

      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <ul>
          <li><NavLink to="/home" onClick={() => setIsOpen(false)}>Home</NavLink></li>

          {isLoggedIn ? (
            <>
              <li><NavLink to="/report" onClick={() => setIsOpen(false)}>Report</NavLink></li>
              <li><NavLink to="/map" onClick={() => setIsOpen(false)}>Safety Map</NavLink></li>
              <li><NavLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</NavLink></li>
              <li>
                <Popconfirm
                  title="Are you sure you want to logout?"
                  onConfirm={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="logout-button">Logout</button>
                </Popconfirm>
              </li>
            </>
          ) : (
            <li><NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
