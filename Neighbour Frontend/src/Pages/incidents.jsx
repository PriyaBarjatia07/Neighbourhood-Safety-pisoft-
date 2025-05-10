import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const Incidents = () => {
const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/incidents").then((res) => {
      setIncidents(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/incidents/${id}`);
      setIncidents(incidents.filter((incident) => incident._id !== id));
      message.success("User deleted successfully");
    } catch (error) {
      message.error("Failed to delete user",error);
    }
  };

  return (
    <Table
      dataSource={incidents}
      columns={[
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        {
          title: "Action",
          dataIndex: "_id",
          render: (id) => <Button danger onClick={() => handleDelete(id)}>Delete</Button>,
        },
      ]}
    />
  );
};

export default Incidents;