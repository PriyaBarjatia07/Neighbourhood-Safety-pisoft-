
import React, { useEffect, useRef } from 'react';
 import '../dashboard.css';
import { Chart } from 'chart.js/auto';
// import Logo from '../assets/images/logo.jpeg';
 import User from '../assets/images/user.png'

const Dashboard = () => {
  const pieRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const pieChart = new Chart(pieRef.current, {
      type: 'pie',
      data: {
        labels: ['Robbery', 'Assault', 'Theft', 'Vandalism'],
        datasets: [{
          data: [25, 15, 40, 20],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    const barChart = new Chart(barRef.current, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
          label: 'Incidents',
          data: [30, 45, 28, 60],
          backgroundColor: '#36a2eb'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      pieChart.destroy();
      barChart.destroy();
    };
  }, []);

  return (
    <div className="background">
    

      {/* Dashboard Content */}
      <div className="dashboard-container">
        <main className="main-content">
           <header className="dashboard-header">
            <div>
              <h1>Welcome, John Doe</h1>
              <p>Here’s what’s happening in your neighborhood today.</p>
            </div>
            <div className="user-info">
              <img src={User} alt="User" />
              <span>John Doe</span>
            </div>
          </header> 

          {/* Statistics */}
          <section className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Reports</h3>
              <p>125</p>
            </div>
            <div className="stat-card">
              <h3>Active Alerts</h3>
              <p>5</p>
            </div>
            <div className="stat-card">
              <h3>Resolved Cases</h3>
              <p>89</p>
            </div>
            <div className="stat-card">
              <h3>New Reports Today</h3>
              <p>7</p>
            </div>
          </section>

          {/* Charts */}
          <section className="charts-section">
            <div className="chart-card">
              <h2>Crime Type Distribution</h2>
              <canvas ref={pieRef}></canvas>
            </div>
            <div className="chart-card">
              <h2>Monthly Incident Report</h2>
              <canvas ref={barRef}></canvas>
            </div>
          </section>

          {/* Notifications and Tasks */}
          <section className="extra-sections">
            <div className="notifications">
              <h2>🔔 Notifications</h2>
              <ul>
                <li>🚨 Suspicious activity on Main Street <span>2 hours ago</span></li>
                <li>🚓 Police patrolling near Oak Avenue <span>4 hours ago</span></li>
              </ul>
            </div>

            <div className="tasks">
              <h2>📝 Tasks</h2>
              <ul>
                <li>Review reported incident submissions</li>
                <li>Update alert thresholds</li>
                <li>Check last 24h safety trends</li>
              </ul>
            </div>
          </section>

          {/* Latest Updates */}
          <section className="latest-crimes">
            <h2>📍 Latest Crime Updates</h2>
            <div className="crime-update">
              <p>🕵️ Robbery reported at Elm Street</p>
              <span>3 hours ago</span>
            </div>
            <div className="crime-update">
              <p>🔪 Assault incident near Central Park</p>
              <span>7 hours ago</span>
            </div>
            <div className="crime-update">
              <p>📦 Package theft near 5th Avenue</p>
              <span>10 hours ago</span>
            </div>
          </section>
          <section className="emergency-contacts">
  <h2>📞 Emergency Contacts</h2>
  <div className="contacts-grid">
    <div className="contact-card">
      <h3>🚓 Police</h3>
      <p>Call for any law enforcement emergency or crime report.</p>
      <a href="tel:100">📞 100</a>
    </div>
    <div className="contact-card">
      <h3>🚑 Ambulance</h3>
      <p>For medical emergencies and first aid assistance.</p>
      <a href="tel:101">📞 101</a>
    </div>
    <div className="contact-card">
      <h3>🔥 Fire Department</h3>
      <p>To report fire hazards or fire-related emergencies.</p>
      <a href="tel:102">📞 102</a>
    </div>
    <div className="contact-card">
      <h3>🏥 Nearby Hospital</h3>
      <p>Sunrise Medical Center</p>
      <a href="tel:+19876543210">📞 +1 (987) 654-3210</a>
    </div>
    <div className="contact-card">
      <h3>📍 Local Safety Office</h3>
      <p>For neighborhood safety and community issues.</p>
      <a href="tel:+11234567890">📞 +1 (123) 456-7890</a>
    </div>
  </div>

  <div className="emergency-tips">
    <h1>⚠️ What To Do in an Emergency</h1>
    <div className='emergency'>
    <ul>
      <li>Stay calm and assess the situation.</li>
      <li>Call the appropriate emergency service immediately.</li>
      <li>Provide accurate details like location and type of emergency.</li>
      <li>Keep emergency numbers saved on your phone.</li>
    </ul>
  </div>
  </div>
</section>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
