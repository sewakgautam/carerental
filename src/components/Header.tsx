import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { color } from "../../Constraint";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm } from "antd";

export default function HeadBar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Header
      style={{
        background: color.Primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <Popconfirm
        title="Logout !!!"
        style={{ display: "flex", justifyContent: "end" }}
        description="Are You Sure Want to Logout"
        // onConfirm={confirm}
        onOpenChange={() => console.log("open change")}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center", 
            marginTop: -10,
          }}
        >
          <Avatar
            // src={`${BACKEND_API}/${userInformation?.data.avatar}`}
            src={"https://ychef.files.bbci.co.uk/976x549/p0dnxrcv.jpg"}
            shape="square"
            style={{ padding: 5 }}
            size={44}
          />
          {/* <p style={{ fontSize: 15 }}>{userInformation?.data.name}</p> */}
          <p style={{ fontSize: 15, color: "white" }}>{"Sewak gautam"}</p>
        </div>
      </Popconfirm>
    </Header>
  );
}
