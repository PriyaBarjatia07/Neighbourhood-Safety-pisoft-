import React, { useState } from "react";
import {
  
  Button,
  
  Spin,
  Form,
  Input,
  DatePicker,
  Select,
  
  notification,
} from "antd";

import axios from "axios"; 
import { useGoogleLogin } from "@react-oauth/google";
import "../register.css";
import  Navbar from "../components/navbar";
import  Footer from "../components/footer";
import { useNavigate } from "react-router";

const { Option } = Select;



const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isNavigating,setIsNavigating]=useState(false);
  const[api,contextHolder]=notification.useNotification();
const navigate =useNavigate();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("Form Values:", values);
    try {
      const response = await axios.post("http://localhost:5001/api/auth/register", values);

      if (response.data.success) {
        openNotificationWithIcon("success", "Registration Successful", "You have registered successfully! 🎉");
        setTimeout(() => {
          setLoading(false);
          navigate(response.data.redirectTo || "/login");
        }, 1500);
      } else {
        setLoading(false);
        openNotificationWithIcon("error", "Registration Failed", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Registration Error:", error);
      openNotificationWithIcon("error", "Registration Failed", error.response?.data?.message || "Server error, please try again later.");
    }
  };
     const handleNavigateToLogin=() =>{
       setIsNavigating(true);
     setTimeout(() =>{
        navigate("/login");

       },1500);
  
    }
    const responseGoogle = async (authResult) => {
      console.log("Google Auth Response:", authResult);
      try {
          if (authResult.code) {
              const res = axios.post(`http://localhost:5001/api/auth/google?code=${authResult.code}`);
              navigate("/dashboard");
              
              console.log("Response from backend:", res);
              const { email, name, image } = res.data.user;
              const token = res.data.token;
              const obj = { email, name, token, image };
              localStorage.setItem("user-info", JSON.stringify(obj));
          } else {
              throw new Error("Google authentication failed");
          }
      } catch (e) {
          console.log("Error while Google Login...", e);
      }
   
  };

  const googleLogin = useGoogleLogin({
      onSuccess: responseGoogle,
      onError: responseGoogle,
      flow: "auth-code",
  });

  return (
    <>
    
    {contextHolder}
    {isNavigating &&(
      <div className="full-page-loader">
        <Spin size ="large" tip="Redirecting to login...."/>
      </div>
    )}
    {!isNavigating &&(
      <>
      <div className='background'>
        <Navbar/>
    <h1 className="heading">Create Your Account</h1>
      <div className="register-container">
      
        <Spin spinning={loading} tip="Registering....">
        <Form
          form={form}
          name="register"
          onFinish={handleSubmit}
          style={{
            maxWidth: 600,
            margin: "50px auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <div>
            {/* <h1 className="text-2xl font-semibold text-center mb-4">Create Your Account</h1> */}

            {/* <h1>Create Your an Account</h1> */}
          <Form.Item name="email" label="E-mail" rules={[{ type: "email", required: true, message: "Enter a valid email!" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Enter your password!" }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item name="confirmPassword" label="Confirm Password" dependencies={["password"]} hasFeedback rules={[
            { required: true, message: "Confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return value === getFieldValue("password") ? Promise.resolve() : Promise.reject("Passwords do not match!");
              },
            }),
          ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item name="Username" label="Name" rules={[{ required: true, message: "Enter your name!", whitespace: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="residence" label="Residential Address" rules={[{ required: true, message: "Add your residence!",whitespace:true }]}>
                {/* {/* <Cascader  placeholder="Add your residence" showSearch />    */}
                <Input/> 
          </Form.Item>  

          <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Enter your phone number!" }]}>
            <Input />
          </Form.Item>


          <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: "Enter your date of birth!" }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="Select Date" />
          </Form.Item>

          <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Select gender!" }]}>
            <Select placeholder="Select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: "Select a role" }]}>
            <Select placeholder="Select a role">
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
              
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
            <p style={{ marginTop: "10px" }}>
              Already have an account? { " "}
              <Button type="link" onClick={handleNavigateToLogin}>
                Sign In
              </Button>
            </p>
          </Form.Item>
           <div className="divider">or</div>
<button onClick={googleLogin} className="google-button mb-4">
  <img src="https://developers.google.com/identity/images/g-logo.png" alt="G" />
  Continue with Google
</button>

          </div>
        </Form>
       
        </Spin>
      </div>
    </div>
      <Footer/>
      
    </>
            )}
            </>
  );
};

export default Register;

     