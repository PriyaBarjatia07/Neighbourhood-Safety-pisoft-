import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router";
import  Navbar from "../components/navbar";
import  Footer from "../components/footer";
import "../Reportss.css";
import "../navbar.css";
import "../footer.css";

const Report = () => {
  const [formData, setFormData] = useState({
    incidentType: "",
    description: "",
    severity: "",
    location: "",
    lat: null,
    lng: null,
    media: [],
    anonymous: false
  });

  const [api] = notification.useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const role = sessionStorage.getItem("role");

  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const mediaBase64 = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await toBase64(file);
      mediaBase64.push(base64);
    }

    setFormData((prev) => ({
      ...prev,
      media: mediaBase64
    }));
  };

  const  handlePickLocation = () => {
    setShowMap(true);
  };

  useEffect(() => {
    if (showMap && window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.2090 },
        zoom: 13
      });

      map.addListener("click", (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        markerRef.current = new window.google.maps.Marker({
          position: { lat, lng },
          map: map
        });

        setFormData((prev) => ({
          ...prev,
          location: `${lat}, ${lng}`,
          lat,
          lng
        }));

        setShowMap(false);
      });
    }
  }, [showMap]);

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/report",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        openNotificationWithIcon("success", "Report Registered", "Your report was submitted successfully!");
        setTimeout(() => {
          setLoading(false);
          navigate(response.data.redirectTo || "/home");
        }, 1500);

        setFormData({
          incidentType: "",
          description: "",
          severity: "",
          location: "",
          lat: null,
          lng: null,
          media: [],
          anonymous: false
        });
      } else {
        notification.error({
          message: "Error",
          description: "Failed to submit report."
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      notification.error({
        message: "Error",
        description: "Something went wrong."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <Navbar/>

      <section className="report-container">
        <h2>📝 Report an Incident</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Incident Type:</label>
            <select name="incidentType" value={formData.incidentType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="theft">Theft</option>
              <option value="vandalism">Vandalism</option>
              <option value="suspicious">Suspicious Activity</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Severity Level:</label>
            <select name="severity" value={formData.severity} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location (lat, lng):</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              readOnly
              placeholder="Click 'Pick Location' and select on map"
              required
            />
            
    
            
          </div>
<button className= "location" type="button" onClick={handlePickLocation}>📍 Pick Location</button>
          {showMap && (
            <div style={modalStyles}>
              <div ref={mapRef} style={mapStyles}></div>
              <button onClick={() => setShowMap(false)} style={{ marginTop: "10px" }}>
                Cancel
              </button>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="media">Upload Media:</label>
            <input type="file" id="media" name="media" accept="image/*,video/*" multiple onChange={handleFileChange} />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} />
              Report Anonymously
            </label>
          </div>

          <div className="form-group">
            <button className="location" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </section>
      <Footer/>
    </div>
  );
};

export default Report;

const modalStyles = {
  position: "fixed",
  top: "10%",
  left: "10%",
  width: "80%",
  height: "80%",
  backgroundColor: "#fff",
  zIndex: 1000,
  padding: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
   animation: "fadeIn 0.3s ease-in"
};

const mapStyles = {
  width: "100%",
  height: "90%"
};
