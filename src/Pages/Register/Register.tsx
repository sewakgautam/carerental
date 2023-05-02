import { Button, Form, Input } from "antd";
import { useState } from "react";
import { axiosInstance } from "../../bridge";

export default function Register() {
  const [credential, setCredential] = useState<{
    email?: string;
    password?: string;
    fullName?: string;
    roles?: string;
    address?: string;
  }>({ roles: "customer" });

  const handleRegister = () => {
    axiosInstance
      .post("/api/Auth/signup", credential)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ background: "black" }}>
      <div style={{ marginTop: 200, marginLeft: 500 }}>
        <Form
          // style={{ maxWidth: 800 }}
          name="normal_login"
          className="login-form"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 8 }}
          onFinish={() => handleRegister()}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* <Form.Item wrapperCol={{ span: 20 }}>
          <img src={logo} alt="logo" style={{ width: 350 }} />
        </Form.Item> */}

          <Form.Item
            name="Name"
            label="Full Name"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              // status={credentialError ? "error" : undefined}
              value={credential.email}
              onChange={(text) => {
                // setCredentialError(false);
                setCredential({ ...credential, fullName: text.target.value });
                // console.log(text.target.value);
              }}
              // prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Your Fullname"
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              // status={credentialError ? "error" : undefined}
              value={credential.email}
              onChange={(text) => {
                // setCredentialError(false);
                setCredential({ ...credential, address: text.target.value });
                // console.log(text.target.value);
              }}
              // prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Your Address"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              // status={credentialError ? "error" : undefined}
              // value={cerdential.email}
              // onChange={(text) => {
              //   setCredentialError(false);
              //   setCredential({ ...cerdential, email: text.target.value });
              //   // console.log(text.target.value);
              // }}
              // prefix={<UserOutlined className="site-form-item-icon" />}
              type="address"
              placeholder="Your Fullname"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              // status={credentialError ? "error" : ""}
              // value={cerdential.password}
              // onChange={(text) => {
              //   setCredentialError(false);
              //   setCredential({ ...cerdential, password: text.target.value });
              // }}
              // prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Confirm Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              // status={credentialError ? "error" : ""}
              // value={cerdential.password}
              // onChange={(text) => {
              //   setCredentialError(false);
              //   setCredential({ ...cerdential, password: text.target.value });
              // }}
              // prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginLeft: 300 }}>
            <Button
              style={{ width: 450 }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
