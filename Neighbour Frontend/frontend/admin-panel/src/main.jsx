import react from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes,Route } from "react-router";


import Admin from "./pages/admin";
import Login from "./pages/login";
 import Dashboard from "./pages/dashboard";
 import Users from "./pages/users";
 import Reports from "./pages/reports";
 

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
  <Routes>
    
    <Route path="/" element={<Login/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/login" element={<Login/>}/>  
        <Route path="*" element={<Login/>}/> 
      <Route path="/dashboard" element={<Dashboard/>}/> 
      <Route path="/users" element={<Users/>}/>  
      <Route path="/reports" element={<Reports/>}/> 
       
  </Routes>
 </BrowserRouter>
);
