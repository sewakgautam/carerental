import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Modal,
  UploadProps,
  UploadFile,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { RcFile } from "antd/es/upload";
import { postUser } from "../../bridge";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function AdduserDrawer({
  onInsert,
}: {
  onInsert: CallableFunction;
}) {
  const [staffs, setStaffs] = useState<{
    userName?: string;
    email?: string;
    address?: string;
    fullName?: string;
    roles: string;
    password?: string;
  }>({ roles: "staff", password: "St@ffs123" });

  const queryClient = useQueryClient();
  const userAuthorization: any = localStorage.getItem("session");
  const sessionData = JSON.parse(userAuthorization);

  const addUserMutation = useMutation(
    (staffs) => {
      return postUser(staffs, sessionData?.token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["staffs"]);
      },
    }
  );

  const addStaffs = () => {
    let newUsername = staffs?.fullName;
    newUsername = newUsername.slice(0, 4) + "staff";
    addUserMutation.mutate({ ...staffs, userName: newUsername });
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
        <Form.Item label="Staff Name">
          <Input
            value={staffs.fullName}
            onChange={(t) => {
              setStaffs({ ...staffs, fullName: t.target.value });
            }}
            placeholder="Please enter Staff Full Name"
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            type="email"
            onChange={(t) => {
              setStaffs({ ...staffs, email: t.target.value });
            }}
            placeholder="Please enter staff Email"
          />
        </Form.Item>

        <Form.Item label="Address">
          <Input
            onChange={(t) => {
              setStaffs({ ...staffs, address: t.target.value });
            }}
            placeholder="Please enter heritage address"
          />
        </Form.Item>

        <Button
          onClick={() => {
            addStaffs();
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
