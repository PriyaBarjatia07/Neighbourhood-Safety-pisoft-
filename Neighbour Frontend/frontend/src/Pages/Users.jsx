import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const Users = () => {
const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      message.success("User deleted successfully");
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  return (
    <Table
      dataSource={users}
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

export default Users;
