import {
  Avatar,
  Button,
  Descriptions,
  Drawer,
  FloatButton,
  Space,
  Tooltip,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import GeneralDrawer from "./GeneralSettingDrawer";
import { color } from "../const";

export default function GeneralSettings() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <Descriptions
        title="General Info"
        layout="vertical"
        bordered
        extra={
          <Button type="primary" onClick={() => setDrawerOpen(true)}>
            Change Password
          </Button>
        }
      >
        <Descriptions.Item label="User Profile">
          <Avatar
            src={"https://ychef.files.bbci.co.uk/976x549/p0dnxrcv.jpg"}
            style={{
              fontSize: "100px",
              backgroundColor: color.Primary,
              verticalAlign: "middle",
            }}
            size={100}
            gap={5}
          ></Avatar>
        </Descriptions.Item>
        <Descriptions.Item label="Full Name">Sewak Gautam</Descriptions.Item>
        <Descriptions.Item label="Email ">
          Sewakgautam@iic.edu.np
        </Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          +977 9800000000
        </Descriptions.Item>
        <Descriptions.Item label="Role">Staff</Descriptions.Item>
        <Descriptions.Item label="Password ( hashed )">Staff</Descriptions.Item>
      </Descriptions>
      <Drawer
        title="Edit / Add Info"
        placement="right"
        size="large"
        onClose={onClose}
        open={drawerOpen}
      >
        <GeneralDrawer />
      </Drawer>
    </>
  );
}
