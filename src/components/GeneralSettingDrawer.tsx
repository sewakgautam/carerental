import { Button, Form, Input } from "antd";
import { useState } from "react";
import { axiosInstance } from "../bridge";

export default function GeneralDrawer() {
  const [passwords, setPasswords] = useState<{
    newPassword?: string;
    currentPassword?: string;
  }>({});

  const userAuthorization: any = localStorage.getItem("session");
  const sessionData = JSON.parse(userAuthorization);

  const changePasswords = () => {
    axiosInstance
      .post("/api/Auth/change-password", passwords, {
        headers: {
          Authorization: `Bearer ${sessionData?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // if(res.data)
    });
  };

  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 40 }}
        layout="horizontal"
        onValuesChange={(t) => {
          console.log(t);
        }}
        style={{ maxWidth: 700 }}
      >
        <Form.Item label="Current Password">
          <Input
            value={passwords?.currentPassword}
            onChange={(t) => {
              setPasswords({ ...passwords, currentPassword: t.target.value });
            }}
            placeholder="Please enter Current Password"
          />
        </Form.Item>
        <Form.Item label="New Password">
          <Input
            type="email"
            value={passwords?.newPassword}
            onChange={(t) => {
              setPasswords({ ...passwords, newPassword: t.target.value });
            }}
            placeholder="Please enter staff Email"
          />
        </Form.Item>

        <Button
          onClick={() => {
            changePasswords();
          }}
          style={{ width: "100%" }}
          type="primary"
        >
          Save
        </Button>
      </Form>
    </>
  );
}
