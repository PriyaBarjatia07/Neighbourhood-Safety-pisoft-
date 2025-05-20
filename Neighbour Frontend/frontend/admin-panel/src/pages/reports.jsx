import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin, message, Button, Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [form] = Form.useForm();

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

  const openEditModal = (report) => {
    
    setIsModalVisible(true);
    form.setFieldsValue(report);
  };

  const columns = [
    { title: "Type", dataIndex: "incidentType", key: "incidentType" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Severity", dataIndex: "severity", key: "severity" },
    { title: "Location", dataIndex: "location", key: "location" },
    
    { title: "Created At", dataIndex: "createdAt", key: "createdAt", render: (text) => new Date(text).toLocaleString() },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => openEditModal(record)}>View/Edit</Button>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Incident Reports</h2>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={reports} columns={columns} rowKey="_id" />
      )}

      <Modal
        title="Report Details"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          
        }}
        onOk={() => setIsModalVisible(false)}
        okText="Close"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="incidentType" label="Incident Type">
            <Input disabled />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} disabled />
          </Form.Item>
          <Form.Item name="severity" label="Severity">
            <Select disabled>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input disabled />
          </Form.Item>
          <Form.Item name="reportedBy" label="Reported By">
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Reports;
