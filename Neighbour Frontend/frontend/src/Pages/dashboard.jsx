import React, { useEffect, useRef, useState } from 'react';
import '../Dashboard.css';
import { Chart } from 'chart.js/auto';
import User from '../assets/images/user.png';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from 'axios';
import { Table } from 'antd'; 
import 'antd/dist/reset.css'; 

const Dashboard = () => {
  const [enter, setEnter] = useState('');
  const [locationData, setLocationData] = useState();
  const [searchInput, setSearchInput] = useState('');
  const [coords, setCoords] = useState(null);

  const pieRef = useRef(null);
  const pieChartRef = useRef(null); 

  
  useEffect(() => {
    const enterValue = localStorage.getItem("Username");
    setEnter(enterValue);
  }, []);

  
  const handleSearchLocation = async () => {
    if (!searchInput.trim()) {
      alert("Please enter a location");
      return;
    }

    try {
      const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
          q: searchInput,
          key: '34e403a256c144d8a5b4a912f55b19ea', 
          limit: 1
        }
      });

      const result = geoResponse.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry;
        setCoords({ latitude: lat, longitude: lng });
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location from geocoding API:", error);
    }
  };

  
  useEffect(() => {
    const fetchLocationData = async (lat, lng) => {
      try {
        const response = await axios.get('http://localhost:5001/api/auth/getLocation', {
          params: { lat, lng }
        });

        setLocationData(response.data);
      } catch (error) {
        console.error("Error fetching location data from backend:", error);
      }
    };

    if (coords) {
      fetchLocationData(coords.latitude, coords.longitude);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    }
  }, [coords]);


  useEffect(() => {
    if (!pieRef.current || !locationData || !locationData.incidentCounts) return;

    if (pieChartRef.current) {
      pieChartRef.current.destroy(); 
    }

    pieChartRef.current = new Chart(pieRef.current, {
      type: 'pie',
      data: {
        labels: ['Theft', 'Suspicious Activity', 'Others', 'Vandalism'],
        datasets: [{
          data: [
            locationData.incidentCounts.theft || 0,
            locationData.incidentCounts.suspicious_activity || 0,
            locationData.incidentCounts.others || 0,
            locationData.incidentCounts.vandalism || 0
          ],
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

    return () => {
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
      }
    };
  }, [locationData]);

  
  const columns = [
    {
      title: 'Type',
      dataIndex: 'incidentType',
      key: 'incidentType',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Anonymous',
      dataIndex: 'anonymous',
      key: 'anonymous',
      render: (val) => (val ? 'Yes' : 'No')
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val) => new Date(val).toLocaleString()
    }
  ];

  return (
    <div className="background">
      <Navbar />

      <div className="dashboard-container">
        <main className="main-content">
          <header className="dashboard-header">
            <div>
              <h1>Welcome, {enter}</h1>
              <p className='para'>Here’s what’s happening in your neighborhood today.</p>
            </div>
            <div className="user-info">
              <img src={User} alt="User" />
              <span>{enter}</span>
            </div>
          </header>

          
          <section className="location-search">
            <input
              type="text"
              placeholder="Enter a location....."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="location-input"
            />
            
          </section>
<button onClick={handleSearchLocation} className="location-button">
              Search Location
            </button>
          
          <section className="dashboard-stats">
            <div className="stat-card">
              <h3 className='head'>Nearby Reports</h3>
              <p>{locationData?.nearbyReportsCount ?? 0}</p>
            </div>
          </section>

          
          <section className="charts-section">
            <div className="chart-card">
              <h2>Crime Type Distribution</h2>
              <canvas ref={pieRef}></canvas>
            </div>
          </section>

          
          <section className="table-section">
            <h2 style={{ marginBottom: "10px" }}>Reported Incidents</h2>
            <Table
              columns={columns}
              dataSource={locationData?.nearbyReports || []}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              bordered
            />
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
