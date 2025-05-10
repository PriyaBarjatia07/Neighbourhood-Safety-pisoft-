import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { message } from 'antd';
import  Navbar from "../components/navbar";
import  Footer from "../components/footer";
import "../Mapss.css";

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 28.6139,
  lng: 77.2090
};

const MapPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAhtSmObAYAyLpbCaOLetqfEHF_-luMN3A', // Replace with your actual API key
  });

  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/api/auth/getIncidents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      message.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className='background'>

      <Navbar/>
     

      {/* Map Section */}
      <section className="map-container">
        <h2>Safety Map</h2>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
          {/* Markers */}
          {reports.map((report, index) => {
            if (report.location) {
              const [latStr, lngStr] = report.location.split(",").map(val => val.trim());
              const lat = parseFloat(latStr);
              const lng = parseFloat(lngStr);

              if (!isNaN(lat) && !isNaN(lng)) {
                let iconUrl = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                if (report.severity === 'medium') {
                  iconUrl = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
                } else if (report.severity === 'high') {
                  iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                }

                return (
                  <Marker
                    key={index}
                    position={{ lat, lng }}
                    icon={{ url: iconUrl }}
                    onClick={() => setSelectedMarker({ ...report, lat, lng })}
                  />
                );
              }
            }
            return null;
          })}

          {/* InfoWindow */}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style={{ minWidth: "200px" }}>
                <p><strong>Name:</strong> {selectedMarker.anonymous ? "Anonymous" : selectedMarker.name || "N/A"}</p>
                <p><strong>Incident:</strong> {selectedMarker.incidentType}</p>
                <p>
                  <strong>Severity:</strong>{" "}
                  <span
                    style={{
                      color:
                        selectedMarker.severity === "high"
                          ? "red"
                          : selectedMarker.severity === "medium"
                          ? "orange"
                          : "green",
                      fontWeight: "bold"
                    }}
                  >
                    {selectedMarker.severity}
                  </span>
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </section>
      <Footer/>
    </div>
  );
};

export default MapPage;
