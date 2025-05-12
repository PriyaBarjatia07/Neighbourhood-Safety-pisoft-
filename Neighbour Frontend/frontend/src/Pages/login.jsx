


import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { Button, Checkbox, Form, Input, notification, Flex, Spin } from 'antd';
import { NavLink } from 'react-router';
import  Navbar from "../components/navbar";
import  Footer from "../components/footer";
import axiosInstance from "../../axiosInstance";
import LoginIllustration from '../assets/images/login.jpg';
import '../App.css';
import { apiUrl } from "../../config";

const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [isNavigating, setIsNavigating] = useState(false);
  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    console.log("Success:", values);
    
    try {
        const response = await axiosInstance.post(`${apiUrl}/api/auth/login`, values);
        console.log("API Response:", response);

        if (response) {
            openNotificationWithIcon("success", "Login Successful", "You have successfully logged in! 🎉");
            localStorage.setItem("Username", response.data.Username);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("jwtToken", response.data.jwtToken);
            window.dispatchEvent(new Event("authChange"));
            setTimeout(() => {
                setLoading(false);
                navigate("/home");
            }, 1500);
        } else {
            setLoading(false);
            openNotificationWithIcon("error", "Login Failed", response.data.message || "Invalid email or password.");
        }
    } catch (error) {
        setLoading(false);
        console.error("Login failed:", error);

        if (error.response) {
            console.error("Error Response Data:", error.response.data);
            openNotificationWithIcon("error", "Login Failed", error.response.data?.message || "User is not registered. Please Register.");
        }  else {
            console.error("Axios Error:", error.message);
            openNotificationWithIcon("error", "Network Error", "Unable to connect. Please check your internet.");
        }
    };
  };
 
  // const handleNavigateToRegister=() =>{
  //   setIsNavigating(true);
  // setTimeout(() =>{
  //    navigate("/register");

  //   },1500);

//  }
  return (
    <>
      {contextHolder}

     
      <div className='background'>
        <Navbar/>
        <div className="login-page-container">
          <div className="login-wrapper">
            <div className="login-container">
              <div className='login'>
                <Spin spinning={loading} tip="Loading....">
                  <Form
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360, padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="email"
                      rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                      <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                      <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="#">Forgot password?</a>
                      </Flex>
                    </Form.Item>

                    <Form.Item>
                      <Button block type="primary" htmlType="submit">Log in</Button>
                      <p style={{ marginTop: '10px' }}>or <NavLink to="/register">Register now!</NavLink></p>
                    </Form.Item>
                  </Form>
                </Spin>
              </div>
            </div>
            <div className="login-illustration">
              <img src={LoginIllustration} alt="Login Illustration" />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
      </>
      
    
  );
};

export default Login;
