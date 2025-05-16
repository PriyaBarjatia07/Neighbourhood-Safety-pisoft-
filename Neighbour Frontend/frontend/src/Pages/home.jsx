import React  from 'react';
import {NavLink} from 'react-router';
import "../index.css";
  import Awareness from "../assets/images/awareness.webp";
  
  import Community from "../assets/images/community.webp";
  import  Navbar from "../components/navbar";
  import  Footer from "../components/footer";
  
  import Map1 from "../assets/images/map1.jpg";

  import Reports from "../assets/images/reports.png";
 import Security from "../assets/images/security.webp";
  





const home = () => {
 
  return (
    <div className='background'>
   {/* <div className='main-content'> */}
    <Navbar/>
  
   <div className='main-content'>
   <div className="image">
  <header className="hero">
    <div className="hero-content">
      <h1>Stay Safe, Stay Informed</h1>
      <p>Track incidents, stay updated, and help create a safer neighborhood.</p>
      <div className="buttons">
        <NavLink to="/login" className="btn">Get Started</NavLink>
        
        
      </div>
    </div>
  </header>

 
  <section className="info">
    <h2>How It Works</h2>
    <div className="info-grid">
      <div className="info-box">
        <img src={Reports} alt="Report icon"/>
        <h3>Report Incidents</h3>
        <p>Quickly report any suspicious activities in your neighborhood.</p>
      </div>
      <div className="info-box">
        <img src= {Map1}alt="Map icon"/>
        <h3>Live Safety Map</h3>
        <p>Monitor crime trends and stay informed about local incidents.</p>
      </div>
      <div className="info-box">
        <img src={Awareness} alt="Alert icon"/>
        <h3>Real-Time Alerts</h3>
        <p>Receive instant notifications for emergencies and alerts.</p>
      </div>
    </div>
  </section>

  <section className="dashboard">
    <h2>Customize Your Safety Dashboard</h2>
    <p>Select the data you want to see on your dashboard.</p>
    <label><input type="checkbox" /> Crime Rate</label>
    <label><input type="checkbox"/> Emergency Contacts</label>
    <label><input type="checkbox" /> Live Alerts</label>
    <button className="btn">Update Dashboard</button>
  </section>
 
  <div className="safety">
  <section className="safety-tips">
    <h2>Safety Tips</h2>
    <ul>
      <li>🔒 Always lock doors and windows at night.</li>
      <li>🚶‍♂️ Walk in well-lit areas and avoid isolated places.</li>
       <li>📢 Report any suspicious activity immediately.</li> 
      <li>🎥 Install security cameras for added protection.</li>
    </ul>
  </section>
  
  </div>
  
    <section className="about">
      <div className="about-content">
        <h2>About Neighborhood Safety Dashboard</h2>
        <p>
          Our platform helps you stay informed about crime and safety in your neighborhood. 
          We provide real-time alerts, live crime maps, and data visualization to help 
          you make informed decisions for a safer community.
        </p>
        <div className="about-features">
          <div className="feature">
            <img src={Community} alt="Community"/>
            <h3>Community Driven</h3>
            <p>Reports are submitted by residents like you to ensure accurate local data.</p>
          </div>
          <div className="feature">
            <img src={Security} alt="Security"/>
            <h3>Reliable Data</h3>
            <p>We gather information from verified sources and law enforcement agencies.</p>
          </div>
          <div className="feature">
            <img src={Awareness} alt="Awareness"/>
            <h3>Stay Alert</h3>
            <p>Get instant notifications for safety alerts in your area.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  </div>
    
        
      
    <Footer/>


    </div>
  )
}

export default home;
