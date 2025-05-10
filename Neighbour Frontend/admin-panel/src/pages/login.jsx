import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";

const Login = ({ onLogin }) => {
  const onFinish = (values) => {
    const { username, password } = values;

    // Mock login logic
    if (
      (username === "admin" && password === "admin123") ||
      (username === "employee" && password === "emp123")
    ) {
      const role = username === "admin" ? "admin" : "employee";
      onLogin({ username, role });
      message.success("Login successful!");
    } else {
      message.error("Invalid username or password!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;

// import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
// const onFinish = values => {
//   console.log('Success:', values);
// };
// const onFinishFailed = errorInfo => {
//   console.log('Failed:', errorInfo);
// };
// const Login = () => (
//   <Form
//     name="basic"
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ remember: true }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="Username"
//       name="username"
//       rules={[{ required: true, message: 'Please input your username!' }]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[{ required: true, message: 'Please input your password!' }]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item name="remember" valuePropName="checked" label={null}>
//       <Checkbox>Remember me</Checkbox>
//     </Form.Item>

//     <Form.Item label={null}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );
// export default Login;