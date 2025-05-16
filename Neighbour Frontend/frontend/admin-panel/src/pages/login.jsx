// import React from "react";
// import { Button, Checkbox, Form, Input, message } from "antd";

// const Login = ({ onLogin }) => {
//   const onFinish = (values) => {
//     const { username, password } = values;

//     // Mock login logic
//     if (
//       (username === "admin" && password === "admin123") ||
//       (username === "employee" && password === "emp123")
//     ) {
//       const role = username === "admin" ? "admin" : "employee";
//       onLogin({ username, role });
//       message.success("Login successful!");
//     } else {
//       message.error("Invalid username or password!");
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (

    
//     <Form
//       name="basic"
//       labelCol={{ span: 8 }}
//       wrapperCol={{ span: 16 }}
//       style={{ maxWidth: 600 }}
//       initialValues={{ remember: true }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <Form.Item
//         label="Username"
//         name="username"
//         rules={[{ required: true, message: "Please input your username!" }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         label="Password"
//         name="password"
//         rules={[{ required: true, message: "Please input your password!" }]}
//       >
//         <Input.Password />
//       </Form.Item>

//       <Form.Item name="remember" valuePropName="checked" label={null}>
//         <Checkbox>Remember me</Checkbox>
//       </Form.Item>

//       <Form.Item label={null}>
//         <Button type="primary" htmlType="submit">
//           Login
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default Login;



// import React, { useState } from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Form, Input } from "antd";
// // import axiosInstance from "../../../src/axiosinstance";
// import { apiUrl } from "../../../config";
// import { useNavigate, NavLink } from "react-router";
// // import "react-toastify/dist/ReactToastify.css";
// // import "animate.css";
// // import { toast } from "react-toastify";
// import { Layout, Menu } from "antd";
// // import logo from "../assets/image.png";

// const { Header } = Layout;

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//  const onFinish = async (values) => {
//   try {
//     const response = await axiosInstance.post(
//      `${apiUrl}/api/auth/admin/login`,

//       values
//     );
//     console.log("success is...",response)

    
//     const data = response?.data;
//      // Validate response data
//       if (!data || typeof data !== "object") {
//         console.error("Invalid response data:", data);
//         toast.error("Invalid server response. Please try again.");
//         return;
//       }

//       // Log response for debugging
//       console.log("Response data:", data);

//     if (!data.success) {
//       console.log("not success")
//       // Backend responded with success: false
//       toast.error(data.message || "Login failed");
//       return;
//     }

//     const { jwtToken, role, email } = data;

//     if (role === "admin" || role === "user") {
//       toast.success(data.message);
//       localStorage.setItem("accessToken", jwtToken);
//       localStorage.setItem("role", role);
//       localStorage.setItem("userEmail", email);

//       setIsLoading(true);

//       setTimeout(() => {
//         setIsLoading(false);
//         navigate("/admin");
//       }, 1000);
//     } else {
//       // Unauthorized role (doctor/patient trying to login here)
//       toast.error("Access denied. Only admin and user roles are allowed.");
//     }
//   } catch (error) {
//     console.error("Login error:", error);

//       // Handle Axios errors
//       if (error.isAxiosError && error.response) {
//         const status = error.response.status;
//         const message = error.response.data?.message;

//         console.log("Error status:", status, "Message:", message);

//         if (status === 400) {
//           toast.error(message || "Admin not found. Please check your email.");
//         } else if (status === 401) {
//           toast.error(message || "Incorrect password. Please try again.");
//         } else if (status === 403) {
//           toast.error(message || "Access denied. This panel is only for admins.");
//         } else {
//           toast.error(message || "An unexpected error occurred. Please try again.");
//         }
//       } else {
//         // Handle non-Axios errors (e.g., network errors, TypeError)
//         console.error("Non-Axios error:", error);
//         toast.error(error.message || "An unexpected error occurred. Please try again.");
//       }
//   }
// };


//   return (
//     <div className="animate__animated animate__fadeInDown min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100">
//       {/* Navbar */}
//       <Header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "16px",
//           background: "#006d77",
//           height: "80px",
//           padding: "0 24px",
//         }}
//       >
//         <img
//           // src={logo}
//           alt="PlatterGo Logo"
//           style={{
//             height: "60px",
//             width: "60px",
//             borderRadius: 80,
//             objectFit: "fit",
//           }}
//         />
//         <h1
//           style={{
//             color: "#ffffff",
//             fontWeight: "bold",
//             margin: 0,
//             fontSize: "22px",
//           }}
//         >
//           Admin Panel
//         </h1>
//         <Menu
//           mode="horizontal"
//           items={[]}
//           style={{
//             flex: 1,
//             justifyContent: "end",
//             background: "#006d77",
//             color: "#ffffff",
//           }}
//         />
//       </Header>

//       {/* Login Form Section */}
//       <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
//         <div className="backdrop-blur-lg bg-white/30 shadow-2xl border border-white/50 rounded-3xl p-10 w-full max-w-md">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//             <p className="text-gray-600 text-sm">Login to continue</p>
//           </div>

//           <Form name="login" onFinish={onFinish} layout="vertical">
//             <Form.Item
//               name="email"
//               label={
//                 <span className="text-gray-700 font-medium">Email</span>
//               }
//               rules={[{ required: true, message: "Please input your email!" }]}
//             >
//               <Input
//                 size="large"
//                 prefix={<UserOutlined />}
//                 placeholder="you@example.com"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label={
//                 <span className="text-gray-700 font-medium">Password</span>
//               }
//               rules={[
//                 { required: true, message: "Please input your password!" },
//               ]}
//             >
//               <Input.Password
//                 size="large"
//                 prefix={<LockOutlined />}
//                 placeholder="••••••••"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 block
//                 type="primary"
//                 htmlType="submit"
//                 loading={isLoading}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-2 text-lg transition-all duration-200"
//               >
//                 Log in
//               </Button>
//             </Form.Item>

//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../index.css"; // or use './AdminLogin.css' if using a separate CSS file
import logo from "../assets/images/logo.jpeg";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace with real authentication
    if (email === "priyabarjatia1280@gmail.com" && password === "Kabir@2002") {
      alert("Login successful!");
      navigate("/admin");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="admin-navbar">
        <div className="admin-navbar-container">
          <img src={logo} alt="PlatterGo Logo" style={{ height: "50px", borderRadius: 80 }} />
          <h1 className="admin-logo">Neighborhood Safety Admin</h1>
         
        </div>
      </nav>

      {/* Login Form */}
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2 className="admin-login-title">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
