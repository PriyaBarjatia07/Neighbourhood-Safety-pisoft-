import react from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes,Route } from "react-router";


import Home from "./Pages/home";
import Map from "./Pages/map";
import Report from "./Pages/report";
import Dashboard from "./Pages/dashboard";
import Register from "./Pages/register";
import Login from "./Pages/login";
import Background from "./assets/images/background.jpg";
import Alert from "./assets/images/alert.png";
import Awareness from "./assets/images/awareness.webp";
import Facebook from "./assets/images/facebook.png";
import Community from "./assets/images/community.webp";
import Instagram from "./assets/images/instagram.png";
import Linkedin from "./assets/images/linkedin.png";
import Logo from "./assets/images/logo.jpeg";
 import Map1 from "./assets/images/map1.jpg";
 import Maps from "./assets/images/maps.png";
import Upload from "./Pages/uploadFile";
import Users from "./Pages/Users";


 import Reports from "./assets/images/reports.png";
 import Security from "./assets/images/security.webp";
 import Twitter from "./assets/images/twitter.png";
 import User from "./assets/images/user.png";
import {GoogleOAuthProvider } from '@react-oauth/google';

 const GoogleWrapper=()=>(
  <GoogleOAuthProvider clientId="155243607559-3nqeucdg34b6j157aroosodhedejq55u.apps.googleusercontent.com">
    <Register/>
  </GoogleOAuthProvider>
 )
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
  <Routes>
    



    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    
    <Route path="/register" element={<GoogleWrapper/>}/>
    <Route path="/login" element={<Login/>}/>
     <Route path="/background" element={<Background/>}/> 
    <Route path="/map" element={<Map/>}/>
    <Route path="/uploadFile" element={<Upload/>}/>
    
    <Route path="/Users" element={<Users/>}/>
    <Route path="/report" element={<Report/>}/>
    <Route path="/alert" element={<Alert/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/> 
     <Route path="/linkedin" element={<Linkedin/>}/>
    <Route path="/instagram" element={<Instagram/>}/>
    <Route path="/facebook" element={<Facebook/>}/>
    <Route path="/community" element={<Community />}/>
    <Route path="/awareness" element={<Awareness/>}/> 
    
    <Route path="/logo" element={<Logo/>}/>
    <Route path="/map1" element={<Map1/>}/>
    <Route path="/maps" element={<Maps/>}/>
    <Route path="/reports" element={<Reports/>}/>
    <Route path="/security" element={<Security/>}/>
    <Route path="/twitter" element={<Twitter/>}/>
    <Route path="/user" element={<User/>}/>
    
  </Routes>
 </BrowserRouter>
);


