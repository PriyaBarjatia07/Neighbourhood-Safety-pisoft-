
import React, { useState } from "react";
import {
  
  DashboardOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  FileAddOutlined,
  
} from "@ant-design/icons";
import { Layout, Menu, theme, Modal } from "antd";
import { useNavigate } from "react-router";
import logo from "../assets/images/logo.jpeg";
import "../admin.css"
import Users from "./users";
import Report from "./reports";
import Dashboard from "./dashboard";

const { Content, Sider } = Layout;

const Admin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [activeSection, setActiveSection] = useState ("login");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsModalVisible(true);
  };

  const handleConfirmSignOut = () => {
    setIsModalVisible(false);
    navigate("/login");
  };

  const handleCancelSignOut = () => {
    setIsModalVisible(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return <Users />;
      case "dashboard":
        return <Dashboard />;
      case "reports":
        return <Report />;
      default:
        return <h1>WELCOME TO ADMIN PANEL</h1>;
    }
  };

  return (
    <Layout>
      {/* <Header style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img src={logo} alt="PlatterGo Logo" style={{ height: "50px", borderRadius: 80 }} />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[{ label: "User", icon: <UserOutlined />, key: "user" }]}
          style={{ flex: 1, minWidth: 0, justifyContent: "end" }}
        />
      </Header> */}
        <nav className="admin-navbar">
              <div className="admin-navbar-container">
                <img src={logo} alt="PlatterGo Logo" style={{ height: "50px", borderRadius: 80 }} />
                <h1 className="admin-logo">Neighborhood Safety Admin</h1>
               
              </div>
            </nav>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            onClick={({ key }) => {
              if (key === "/signout") {
                handleSignOut();
              } else {
                setActiveSection(key);
              }
            }}
            selectedKeys={[activeSection]}
            items={[
              { label: "Dashboard", key: "dashboard", icon: <DashboardOutlined /> },
              { label: "Users", key: "users", icon: <FileAddOutlined /> },
              { label: "Reports", key: "reports", icon: <UnorderedListOutlined /> },
              
              { label: "Sign Out", key: "/signout", icon: <LogoutOutlined />, danger: true },
            ]}
          />
        </Sider>

        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderSection()}
        </Content>
      </Layout>

      <Modal
        title="Confirm Sign Out"
        open={isModalVisible}
        onOk={handleConfirmSignOut}
        onCancel={handleCancelSignOut}
        okText="Yes"
        cancelText="No"
      >
        <p>Do you want to sign out?</p>
      </Modal>
    </Layout>
  );
};

export default Admin;