import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { Button, Checkbox, Form, Input, notification, Flex, Spin, Modal } from 'antd';
import { NavLink } from 'react-router';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axiosInstance from "../../axiosInstance";
import LoginIllustration from '../assets/images/login.jpg';
import '../App.css';
import { apiUrl } from "../../config";

const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Forgot Password Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // OTP & Reset Password Modal
  const [isOTPModalVisible, setIsOTPModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`${apiUrl}/api/auth/login`, values);

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
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        openNotificationWithIcon("error", "Login Failed", error.response.data?.message || "Invalid credentials.");
      } else {
        openNotificationWithIcon("error", "Network Error", "Please check your connection.");
      }
    }
  };

  // First Modal
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    // setForgotEmail('');
  };

  const handleSendResetLink = async () => {
    if (!forgotEmail) {
      return openNotificationWithIcon("warning", "Missing Email", "Please enter your email.");
    }

    try {
      await axiosInstance.post(`${apiUrl}/api/auth/forgotPassword`, { email: forgotEmail });
      setIsModalVisible(false);
      setIsOTPModalVisible(true); // Open OTP modal
    } catch (error) {
      openNotificationWithIcon("error", "Error", "Failed to send OTP. Try again.");
    }
  };

  // Second Modal
  const handleOTPSubmit = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      return openNotificationWithIcon("warning", "Missing Fields", "Please fill all fields.");
    }

    if (newPassword !== confirmPassword) {
      return openNotificationWithIcon("error", "Password Mismatch", "New and confirm passwords must match.");
    }

    try {
      await axiosInstance.post(`${apiUrl}/api/auth/verifyPassword`, {
        email: forgotEmail,
        otp,
        newPassword,
        confirmPassword
      });
      openNotificationWithIcon("success", "Password Reset", "Password changed successfully.");
      setIsOTPModalVisible(false);
      // setOtp('');
      // setNewPassword('');
      // setConfirmPassword('');
    } catch (error) {
      openNotificationWithIcon("error", "Reset Failed", error.response?.data?.message || "Invalid OTP or expired.");
    }
  };

  return (
    <>
      {contextHolder}
      <div className='background'>
        <Navbar />
        <h1 className='heading'>Welcome Back</h1>
        <h3 className='heading2'>Enter Your E-mail and Password To Access Your Account</h3>
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
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
                      <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                      <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                      <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Button type="link" onClick={showModal}>Forgot password?</Button>
                      </Flex>
                    </Form.Item>

                    <Form.Item>
                      <Button block type="primary" htmlType="submit">Log in</Button>
                      <p style={{ marginTop: '10px' }}>or <NavLink to="/register">Sign Up!</NavLink></p>
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
        <Footer />
      </div>

      {/* First Modal: Enter Email */}
      <Modal
        title="Reset Your Password"
        visible={isModalVisible}
        onOk={handleSendResetLink}
        onCancel={handleCancel}
        okText="Send OTP"
      >
        <Input
          placeholder="Enter your email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
        />
      </Modal>

      {/* Second Modal: Enter OTP & New Password */}
      <Modal
        title="Verify OTP & Reset Password"
        visible={isOTPModalVisible}
        onOk={handleOTPSubmit}
        onCancel={() => setIsOTPModalVisible(false)}
        okText="Reset Password"
      >
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input.Password
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input.Password
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default Login;
