import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Table, Typography, notification } from "antd";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "../App.css";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const { Title } = Typography;

const Dashboard = () => {
  const [locationReports, setLocationReports] = useState({});
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5001/api/auth/getLocation", {
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          setLocationReports(response.data);
          setReports(response.data.allReports || []);
        } else {
          notification.error({
            message: "Error",
            description: "Failed to fetch reports.",
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        notification.error({
          message: "Error",
          description: "Something went wrong while fetching reports.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  
  const totalReports = reports.length;
  const severityCounts = reports.reduce(
    (acc, report) => ({
      ...acc,
      [report.severity || "Unknown"]: (acc[report.severity || "Unknown"] || 0) + 1,
    }),
    {}
  );

  const incidentTypeCounts = reports.reduce(
    (acc, report) => ({
      ...acc,
      [report.incidentType || "Unknown"]: (acc[report.incidentType || "Unknown"] || 0) + 1,
    }),
    {}
  );

  const barChartData = {
    labels: Object.keys(incidentTypeCounts),
    datasets: [
      {
        label: "Reports by Incident Type",
        data: Object.values(incidentTypeCounts),
        backgroundColor: ["#0077cc", "#ffcc00", "#ff4d4f", "#52c41a"],
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(severityCounts),
    datasets: [
      {
        label: "Reports by Severity",
        data: Object.values(severityCounts),
        backgroundColor: ["#52c41a", "#faad14", "#ff4d4f"],
      },
    ],
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "incidentType",
      key: "incidentType",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Anonymous",
      dataIndex: "anonymous",
      key: "anonymous",
      render: (val) => (val ? "Yes" : "No"),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => new Date(val).toLocaleString(),
    },
  ];

  return (
    <div className="dashboard-container">
      <Title level={2}>📊 Dashboard</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card title="Total Reports" className="metric-card">
            <Title level={3}>{locationReports?.totalReportsCount || 0}</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Theft Reports" className="metric-card">
            <Title level={3}>{locationReports?.allIncidentCounts?.theft || 0}</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Vandalism Reports" className="metric-card">
            <Title level={3}>{locationReports?.allIncidentCounts?.vandalism || 0}</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Other Reports" className="metric-card">
            <Title level={3}>{locationReports?.allIncidentCounts?.others || 0}</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Suspicious Reports" className="metric-card">
            <Title level={3}>{locationReports?.allIncidentCounts?.suspicious_activity || 0}</Title>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="Reports by Incident Type" className="chart-card">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Reports by Severity" className="chart-card">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card title="Recent Reports" className="table-card">
            <Table
              columns={columns}
              dataSource={locationReports?.allReports || []}
              rowKey="_id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
