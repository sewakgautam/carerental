import {
  Drawer,
  FloatButton,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import Column from "antd/es/table/Column";
import moment from "moment";
import { PlusCircleOutlined } from "@ant-design/icons";
import { BACKEND_API } from "../../const";
import {
  approvedCars,
  axiosInstance,
  damageRequest,
  damagesCars,
  fetchCars,
  fetchRentalrequest,
  rentalRequest,
} from "../../bridge";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

interface DataType {
  id: string;
  regsitrationNumber: string;
  isAvailable: string;
  modal: string;
  image: string;
  // createdAt: string;
  // tags: string[];
}

const userAuthorization: any = localStorage.getItem("session");
const sessionData = JSON.parse(userAuthorization);

export default function Damages() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: carData,
  } = useQuery("myDamages", () => damagesCars(sessionData?.token));

  // const rentalrequestMutation = useMutation(
  //   ({ approved, id, reason }) => {
  //     return rentalRequest(id, sessionData?.token, {
  //       ...condition,
  //       approved,
  //       rejectionReason: reason,
  //     });
  //   },
  //   {
  //     onSuccess: (t) => {
  //       if (t.data.approved) {
  //         message.success("Rental Request Accepted....");
  //         setContition({});
  //         queryClient.invalidateQueries(["rentalRequest"]);
  //       } else {
  //         message.warning("Rental Request rejected....");
  //         // setContition({});
  //         queryClient.invalidateQueries(["rentalRequest"]);
  //       }
  //     },
  //   }
  // );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModelOk = () => {
    setIsModalOpen(false);
    damageRequestMutation.mutate(damageDetails.rentid);
  };

  const handleModelCancel = () => {
    setIsModalOpen(false);
  };

  const [damageDetails, setDamageDetails] = useState<{
    reason?: string;
    rentid?: string;
  }>({});

  const damageRequestMutation = useMutation(
    (id) => {
      return damageRequest(sessionData?.token, damageDetails);
    },
    {
      onSuccess: () => {
        message.success("Notified to Admin About Damages.....");
        setDamageDetails({});
        queryClient.invalidateQueries(["mycars"]);
      },
    }
  );

  // console.log(carData?.data);

  return (
    <>
      <Table
        loading={isLoading}
        bordered
        sticky
        pagination={false}
        // rowClassName={styles.row}
        dataSource={carData?.data}
        style={{ margin: 40 }}
      >
        <Column
          width={100}
          // className={styles.column}
          title="ID"
          dataIndex="id"
          key={"carId"}
          // render={(carId) => (
          //   <Tag color="blue">{carId.substring(0, carId.indexOf("-"))}</Tag>
          // )}
        />
        <Column
          width={150}
          title="Car Image"
          dataIndex="image"
          key="image"
          render={(image, datas) => (
            <img
              height={"40px"}
              width={"40px"}
              src={`${BACKEND_API}/api/image/${datas.rent?.car.image}`}
            />
          )}
        />
        <Column
          width={200}
          title="Car Registration Number"
          dataIndex="registrationNumber"
          key="address"
          render={(image, datas) => <p>{datas.rent.car.registrationNumber}</p>}
        />
        <Column
          width={200}
          title="Car Modal"
          dataIndex="modal"
          key="modal"
          render={(image, datas) => <p>{datas.rent.car.modal}</p>}
        />
        <Column
          width={200}
          title="Damage Cost"
          dataIndex="damageFee"
          key="modal"
          render={(image, datas) => (
            <Space size="small">
              {datas?.damagePay ? (
                <Tag style={{ cursor: "pointer" }} color="green">
                  Rs.{datas?.damagePay}
                </Tag>
              ) : (
                <Tag
                  style={{ cursor: "pointer" }}
                  color="green"
                  // onClick={() => {
                  //   rentalrequestMutation.mutate({
                  //     approved: true,
                  //     id: record.id,
                  //   });
                  // }}
                >
                  -
                </Tag>
              )}
            </Space>
          )}
        />
        <Column
          width={200}
          title="Damage Report Date"
          dataIndex="starDate"
          key="modal"
          render={(starDate) => <p>{moment(starDate).format("YYYY MMM D")}</p>}
        />
        <Column
          width={200}
          title="Payment Status"
          dataIndex="damagePay"
          key="modal"
          render={(_: any, record: any) => (
            <Space size="small">
              {record.damagePay ? (
                <Tag
                  style={{ cursor: "pointer" }}
                  color="green"
                  // onClick={() => {
                  //   rentalrequestMutation.mutate({
                  //     approved: true,
                  //     id: record.id,
                  //   });
                  // }}
                >
                  Paid
                </Tag>
              ) : (
                <Tag
                  style={{ cursor: "pointer" }}
                  color="red"
                  // onClick={() => {
                  //   rentalrequestMutation.mutate({
                  //     approved: true,
                  //     id: record.id,
                  //   });
                  // }}
                >
                  Unpaid
                </Tag>
              )}
            </Space>
          )}
        />

        <Column
          width={300}
          title="Action"
          key="action"
          dataIndex="heritageId"
          render={(_: any, record: any) => (
            <Space size="small">
              {record.fee ? (
                <Tag
                  style={{ cursor: "pointer" }}
                  color="#592D8C"
                  // onClick={() => {
                  //   rentalrequestMutation.mutate({
                  //     approved: true,
                  //     id: record.id,
                  //   });
                  // }}
                >
                  Pay With Khalti
                </Tag>
              ) : (
                <Tag
                  style={{ cursor: "pointer" }}
                  color="orange"
                  // onClick={() => {
                  //   rentalrequestMutation.mutate({
                  //     approved: true,
                  //     id: record.id,
                  //   });
                  // }}
                >
                  Proccessing .....
                </Tag>
              )}
            </Space>
          )}
        />
      </Table>
      <Modal
        width={500}
        open={isModalOpen}
        onOk={() => handleModelOk()}
        okText={"Save"}
        cancelText={"Close"}
        onCancel={handleModelCancel}
      >
        <div id="myreason">
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
          >
            <Form.Item
              label="Reason"
              name="reason"
              rules={[
                {
                  required: true,
                  message: "Please write the reason of Damage!",
                },
              ]}
            >
              <TextArea
                minLength={100}
                spellCheck
                rows={10}
                onChange={(t) => {
                  setDamageDetails({
                    ...damageDetails,
                    reason: t.target.value,
                  });
                }}
                placeholder="Please write the reason of Damage!"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
