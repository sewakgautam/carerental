import {
  Col,
  Card,
  Row,
  Statistic,
  Layout,
  Menu,
  Breadcrumb,
  theme,
  Avatar,
  Badge,
  Tooltip,
  Popconfirm,
  Spin,
} from "antd";
import React, { PureComponent, useEffect, useState } from "react";
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  PictureOutlined,
  ContainerOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "../../assets/driftawaygaraze.png";
import minilogo from "../../assets/driftawaygaraze.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
const { Header, Sider } = Layout;
import { Button, message, Space } from "antd";
import { color } from "../../const";
import { axiosInstance } from "../../bridge";

export default function Base() {
  const navigateTo = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [userToken, setUsertoken] = useState("");

  const userSession = localStorage.getItem("userRole");

  useEffect(() => {
    let userSession: any = localStorage.getItem("session");
    userSession = JSON.parse(userSession);
    if (!userSession) {
      message.error("Unauthorized");
      navigateTo("/login");
    } else {
      setUsertoken(userSession.token);
    }
  }, []);

  useEffect(() => {
    try {
      axiosInstance
        .get("/api/Auth/me", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("userData", JSON.stringify(res?.data));
          localStorage.setItem("userRole", res?.data?.roles[0]);
        });
    } catch (err) {
      console.log(err);
    }
  });

  // const {
  //   isLoading,
  //   error,
  //   data: userInformation,
  // } = useQuery("userInfo", () => sessionUser(userSession?.jwt));

  // if (userInformation?.response?.status === 401) {
  //   localStorage.removeItem("loginData");
  //   navigateTo("/login");
  // }

  // if (error) {
  //   let isLoading = true;
  // }

  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        localStorage.clear();
        message.success("Logout Success !!!");
        navigateTo("/login");
      }, 3000);
    });

  let container: any;
  if (userSession === "admin") {
    container = [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: <Link to={"/dashboard"} children={"Dashboard"} />,
      },
      {
        key: "users",
        icon: <UserOutlined />,
        label: <Link to={"/users"} children={"Users"} />,
      },
      {
        key: "Cars",
        icon: <PictureOutlined />,
        label: <Link to={"/cars"} children={"Cars"} />,
      },
      {
        key: "Rentals",
        icon: <PictureOutlined />,
        label: <Link to={"/rentals"} children={"Rentals"} />,
      },
      {
        key: "Damage",
        icon: <PictureOutlined />,
        label: <Link to={"/alldamages"} children={"Damange"} />,
      },
      {
        key: "Notifications",
        icon: <PictureOutlined />,
        label: <Link to={"/notifications"} children={"Notifications"} />,
      },
      {
        key: "offers",
        icon: <PictureOutlined />,
        label: <Link to={"/offers"} children={"Offers"} />,
      },
    ];
  } else if (userSession === "staff") {
    container = [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: <Link to={"/dashboard"} children={"Dashboard"} />,
      },
      {
        key: "Cars",
        icon: <PictureOutlined />,
        label: <Link to={"/cars"} children={"Cars"} />,
      },
      {
        key: "Sales",
        icon: <PictureOutlined />,
        label: <Link to={"/committee"} children={"Sales"} />,
      },
      {
        key: "Rental",
        icon: <ContainerOutlined />,
        label: <Link to={"/category"} children={"Rental"} />,
      },
      {
        key: "Staffs",
        icon: <PictureOutlined />,
        label: <Link to={"/packages"} children={"Staffs"} />,
      },
      {
        key: "Notifications",
        icon: <PictureOutlined />,
        label: <Link to={"/notifications"} children={"Notifications"} />,
      },
      {
        key: "Damage",
        icon: <PictureOutlined />,
        label: <Link to={"/alldamages"} children={"Damages"} />,
      },
    ];
  } else
    container = [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: <Link to={"/dashboard"} children={"Dashboard"} />,
      },
      {
        key: "History",
        icon: <UserOutlined />,
        label: <Link to={"/users"} children={"History"} />,
      },
      {
        key: "Cars",
        icon: <PictureOutlined />,
        label: <Link to={"/mycars"} children={"My Cars"} />,
      },
      {
        key: "Damage",
        icon: <PictureOutlined />,
        label: <Link to={"/damages"} children={"damages"} />,
      },
      {
        key: "Profile",
        icon: <PictureOutlined />,
        label: <Link to={"/profile"} children={"Profile"} />,
      },
      {
        key: "Notifications",
        icon: <PictureOutlined />,
        label: <Link to={"/notifications"} children={"Notifications"} />,
      },
    ];

  return (
    <>
      <Spin
        spinning={false}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        tip="Loading..."
        delay={500}
      >
        <div>
          <Layout style={{ height: "100vh" }}>
            <Sider
              style={{ background: color.Tabs }}
              trigger={null}
              collapsible
              collapsed={collapsed}
            >
              <div className="logo">
                {collapsed ? (
                  <img
                    src={minilogo}
                    style={{ width: 80, marginTop: 10, padding: 20 }}
                    alt="logo"
                  />
                ) : (
                  <img
                    src={logo}
                    style={{ width: 200, marginTop: 10, padding: 20 }}
                    alt="logo"
                  />
                )}
              </div>
              <Menu
                style={{ background: color.Tabs, border: "none" }}
                theme="light"
                mode="inline"
                defaultSelectedKeys={["dashboard"]}
                items={container}
              />
            </Sider>
            <Layout className="site-layout">
              <Header
                style={{
                  padding: 0,
                  background: color.Tabs,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {React.createElement(
                  collapsed ? RightCircleOutlined : LeftCircleOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
                <Popconfirm
                  title="Logout !!!"
                  description="Are You Sure Want to Logout"
                  onConfirm={confirm}
                  onOpenChange={() => console.log("open change")}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 50,
                    }}
                  >
                    {/* <Avatar
                      src={`${BACKEND_API}/${userInformation?.data.avatar}`}
                      shape="square"
                      style={{ padding: 10 }}
                      size={44}
                    /> */}
                    {/* <p style={{ fontSize: 15 }}>{userInformation?.data.name}</p> */}
                  </div>
                </Popconfirm>
              </Header>
              <Outlet />
            </Layout>
          </Layout>
        </div>
      </Spin>
    </>
  );
}
