import { useEffect, useState } from "react";
import { Alert, Button, Form, Input, message, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../assets/driftawaygaraze.png";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../bridge";

export default function Login() {
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let userSession: any = localStorage.getItem("session");
    userSession = JSON.parse(userSession);
    if (userSession) {
      navigateTo("/dashboard");
    }
  });

  const [cerdential, setCredential] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const [credentialError, setCredentialError] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    try {
      axiosInstance
        .post("/api/Auth/signin", cerdential)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          if (res?.data) {
            console.log("got here");
            localStorage.setItem("session", JSON.stringify(res?.data));
            navigateTo("/dashboard");
          }
          // message.error("Credential Not Matched.....");
        })
        .catch((err) => {
          setLoading(false);
          console.log("this is error");
          message.error("Credential Not Matched.....");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ background: "black" }}>
      <div style={{ marginTop: 200, marginLeft: 800 }}>
        <Form
          // style={{ maxWidth: 800 }}
          name="normal_login"
          className="login-form"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 8 }}
          onFinish={() => handleLogin()}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item wrapperCol={{ span: 20 }}>
            <img src={logo} alt="logo" style={{ width: 350 }} />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              status={credentialError ? "error" : undefined}
              value={cerdential.email}
              onChange={(text) => {
                setCredentialError(false);
                setCredential({ ...cerdential, email: text.target.value });
                // console.log(text.target.value);
              }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email Address"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              status={credentialError ? "error" : ""}
              value={cerdential.password}
              onChange={(text) => {
                setCredentialError(false);
                setCredential({ ...cerdential, password: text.target.value });
              }}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {credentialError ? (
            <Alert
              showIcon
              closable
              onClose={() => setCredentialError(false)}
              style={{ marginTop: 10, width: 340 }}
              message="Credential Invalid"
              type="error"
            />
          ) : undefined}

          <Form.Item>
            <Button
              style={{ width: 360 }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
