import {
  Badge,
  Button,
  Descriptions,
  Drawer,
  FloatButton,
  Image,
  Modal,
  Popconfirm,
  QRCode,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import styles from "./Heritage.module.css";
const { Column } = Table;
import { useMutation, useQuery, useQueryClient } from "react-query";
import moment from "moment";
import AdduserDrawer from "./AddUserDrawer";
import { fetchUsers } from "../../bridge";

interface DataType {
  heritageId: string;
  title: string;
  committeeName: string;
  totalTimeTaken: string;
  address: string;
  createdAt: string;
  // tags: string[];
}

const userAuthorization: any = localStorage.getItem("session");
const sessionData = JSON.parse(userAuthorization);

export default function Users() {
  // const queryClient = useQueryClient();
  // const {
  //   isLoading,
  //   error,
  //   data: heritageData,
  // } = useQuery("allHeritages", () => fetchHeritages());
  // const allCategories = useQuery("allCategories", () => fetchCategories());

  // if (error) {
  //   console.log(" this is error", error);
  // }

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [heritageDetails, setHeritageDetails] = useState<{}>();

  const showModal = async (heritageId: string) => {
    // const heritageDetails = await axiosInstance.get(`/heritage/${heritageId}`);
    // setHeritageDetails(heritageDetails);
    // setIsModalOpen(true);
  };

  // const showQrcode = async (heritageId: string) => {
  //   const heritageDetails = await axiosInstance.get(`/heritage/${heritageId}`);
  //   setHeritageDetails(heritageDetails);
  //   setShowQr(true);
  // };
  // const handleModelOk = () => {
  //   setIsModalOpen(false);
  //   setShowQr(false);
  // };

  const handleModelCancel = () => {
    setIsModalOpen(false);
    setShowQr(false);
  };

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };

  // const deleteHeritageMutation = useMutation(
  //   (heritageId: string) => {
  //     return deleteHeritage(heritageId, sessionData?.jwt);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["allHeritages"]);
  //     },
  //   }
  // );

  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: staffsData,
  } = useQuery("staffs", () => fetchUsers("staff", sessionData?.token));
  console.log(staffsData?.data);

  return (
    <>
      <Table
        loading={isLoading}
        bordered
        sticky
        pagination={false}
        rowClassName={styles.row}
        dataSource={staffsData?.data}
        style={{ margin: 40 }}
      >
        <Column
          width={100}
          className={styles.column}
          title="ID"
          dataIndex="id"
          key={"id"}
          render={(userId) => (
            <Tag color="blue">{userId.substring(0, userId.indexOf("-"))}</Tag>
          )}
        />

        <Column title="Full Name" dataIndex="fullName" key="fullName" />
        <Column title="UserName" dataIndex="userName" key="fullName" />
        <Column
          title="Address"
          dataIndex={`address`}
          key="address"
        />

       
        <Column
          width={300}
          title="Action"
          key="action"
          dataIndex="heritageId"
          render={(_: any, record: DataType) => (
            <Space size="small">
              
              <Tag
                style={{ cursor: "pointer" }}
                color="green"
                onClick={() => {
                  // showModal(record?.heritageId);
                }}
              >
                View
              </Tag>
              <Tag
                color="blue"
                onClick={() => {
                  // showDrawer();
                }}
              >
                Edit
              </Tag>
              <Popconfirm
                placement="topRight"
                title={"Delete Heritage !!!"}
                description={`Are You Sure want to Delete ${record.title}`}
                okText="Yes"
                cancelText="No"
              >
                <Tag style={{ cursor: "pointer" }} color="red">
                  Delete
                </Tag>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <Tooltip placement="topLeft" title={"Add Heritage"}>
        <FloatButton
          type="primary"
          style={{ right: 94 }}
          icon={<PlusCircleOutlined />}
          onClick={() => {
            showDrawer();
          }}
        />
      </Tooltip>
      <Drawer
        title="Add Heritage"
        placement="right"
        onClose={onClose}
        open={drawerOpen}
        size="large"
      >
        <AdduserDrawer
          onInsert={(d: boolean) => {
            {
              d ? onClose() : undefined;
            }
          }}
        />
      </Drawer>

      <Modal
        width={1000}
        open={isModalOpen}
        // onOk={handleModelOk}
        onCancel={handleModelCancel}
      >
        {/* <Descriptions title="Heritage Details" layout="vertical" bordered>
          <Descriptions.Item label="Heritage Image">
            <Image
              // src={`${BACKEND_API}/${heritageDetails?.data?.featureImage}`}
              width={200}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Heritage Id">
            <Tag color={"green"}>{heritageDetails?.data?.heritageId}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Heritage Name" span={3}>
            {heritageDetails?.data?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Parent Heritage">
            {heritageDetails?.data?.parentId ?? <Tag color={"red"}>-</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {heritageDetails?.data?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Latitude and Longitude" span={2}>
            {heritageDetails?.data?.latandlong}
          </Descriptions.Item>
          <Descriptions.Item label="Categories" span={2}>
            {heritageDetails?.data?.category.map((each: any) => {
              return <Tag color={"green"}>{each.title}</Tag>;
            }) ?? <Tag color={"red"}>-</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Total Time Taken To Visit">
            {heritageDetails?.data?.totalTimeTaken}
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {heritageDetails?.data?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Created AT">
            {heritageDetails?.data?.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="Updated AT" span={3}>
            {heritageDetails?.data?.updatedAt}
          </Descriptions.Item>

          {heritageDetails?.data?.committee ? (
            <Descriptions.Item label="Committee Info">
              <Descriptions>
                <Descriptions.Item label="Committee Id" span={2}>
                  {heritageDetails?.data?.committee.committeeId}
                </Descriptions.Item>
                <Descriptions.Item label="Committee Name" span={2}>
                  {heritageDetails?.data?.committee.name}
                </Descriptions.Item>
                <Descriptions.Item label="Committee Number" span={2}>
                  {heritageDetails?.data?.committee.contactNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Committee Email">
                  {heritageDetails?.data?.committee.email}
                </Descriptions.Item>
                <Descriptions.Item label="President Name">
                  {heritageDetails?.data?.committee.committeePresident}
                </Descriptions.Item>
                <Descriptions.Item label="President Number">
                  {heritageDetails?.data?.committee.committeePresidentContact}
                </Descriptions.Item>
              </Descriptions>
            </Descriptions.Item>
          ) : undefined}
        </Descriptions> */}
      </Modal>
      <Modal
        width={640}
        open={showQr}
        onOk={() => downloadQRCode()}
        okText={"Download QR Code"}
        cancelText={"Close"}
        onCancel={handleModelCancel}
      >
        <div id="myqrcode">
          {/* <QRCode
            errorLevel="L"
            size={600}
            // value={saData}
            // icon={`${BACKEND_API}/ImageBucket/default/wandermate-mini.png`}
          /> */}
        </div>
      </Modal>
    </>
  );
}
