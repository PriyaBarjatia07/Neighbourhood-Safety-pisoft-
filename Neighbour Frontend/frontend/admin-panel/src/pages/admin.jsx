

// import React, { useState } from "react";
// import {
//   UserOutlined,
//   DashboardOutlined,
//   UnorderedListOutlined,
//   LogoutOutlined,
//   FileAddOutlined,
//   LoginOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, theme } from "antd";
// import logo from "../assets/images/logo.jpeg";
// import Login from "./login";
// import Users from "./users";
// import Report from "./reports";
// import Dashboard from "./dashboard"; // Import Users component

// const { Header, Content, Sider } = Layout;

// const Admin = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const [activeSection, setActiveSection] = useState("login"); // Track selected section

//   const renderSection = () => {
//     switch (activeSection) {
//       // case "login":
//       //   return <Login />;
//       case "users":
//         return <Users />;
//       case "dashboard":
//         return <Dashboard/>; // Placeholder for dashboard
//       case "reports":
//         return <Report />;
//       //   return <h2>Doctors Section (To be implemented)</h2>;
//        default:
//          return <h2>Select a section</h2>;
//     }
//   };

//   return (
//     <Layout>
//       <Header style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//         <img src={logo} alt="PlatterGo Logo" style={{ height: "50px", borderRadius: 80 }} />
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           items={[{ label: "User", icon: <UserOutlined />, key: "user" }]}
//           style={{ flex: 1, minWidth: 0, justifyContent: "end" }}
//         />
//       </Header>

//       <Layout>
//         <Sider width={200} style={{ background: colorBgContainer }}>
//           <Menu
//             mode="inline"
//             onClick={({ key }) => {
//               if (key === "/signout") {
//                 // handle sign out logic here
//               } else {
//                 setActiveSection(key);
//               }
//             }}
//             selectedKeys={[activeSection]}
//             items={[
//               // { label: "Login", key: "login", icon: <LoginOutlined /> },
//               { label: "Dashboard", key: "dashboard", icon: <DashboardOutlined /> },
//               { label: "Users", key: "users", icon: <FileAddOutlined /> },
//               { label: "Reports", key: "reports", icon: <UnorderedListOutlined /> },
              
//               { label: "Settings", key: "settings", icon: <UnorderedListOutlined /> },
//               { label: "Sign Out", key: "/signout", icon: <LogoutOutlined />, danger: true },
//             ]}
//           />
//         </Sider>

//         <Content
//           style={{
//             padding: 24,
//             margin: 0,
//             minHeight: 280,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           {renderSection()}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Admin;
import React, { useState } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  FileAddOutlined,
  // LoginOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Modal } from "antd";
import { useNavigate } from "react-router";
import logo from "../assets/images/logo.jpeg";
// import Login from "./login";
import Users from "./users";
import Report from "./reports";
import Dashboard from "./dashboard";

const { Header, Content, Sider } = Layout;

const Admin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [activeSection, setActiveSection] = useState("login");
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
        return <h2>Select a section</h2>;
    }
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img src={logo} alt="PlatterGo Logo" style={{ height: "50px", borderRadius: 80 }} />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[{ label: "User", icon: <UserOutlined />, key: "user" }]}
          style={{ flex: 1, minWidth: 0, justifyContent: "end" }}
        />
      </Header>

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
              { label: "Settings", key: "settings", icon: <UnorderedListOutlined /> },
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