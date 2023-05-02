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
  damageFee,
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

export default function DamagesList() {
  const queryClient = useQueryClient();
  const { isLoading, data: carData } = useQuery("myDamages", () =>
    damagesCars(sessionData?.token)
  );

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
    damageRequestMutation.mutate(damageDetails?.id);
  };

  const handleModelCancel = () => {
    setIsModalOpen(false);
  };

  const [damageDetails, setDamageDetails] = useState<{
    fee?: string;
    id?: string;
    reason?: string;
  }>({});

  const damageRequestMutation = useMutation(
    (id) => {
      return damageFee(sessionData?.token, damageDetails);
    },
    {
      onSuccess: () => {
        message.success("Payment Request Sent to user");
        setDamageDetails({});
        queryClient.invalidateQueries(["DamageAdmin"]);
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
        pagination={true}
        // rowClassName={styles.row}
        dataSource={carData?.data}
        style={{ margin: 40 }}
      >
        <Column
          width={50}
          // className={styles.column}
          title="ID"
          dataIndex="id"
          key={"carId"}
          // render={(carId) => (
          //   <Tag color="blue">{carId.substring(0, carId.indexOf("-"))}</Tag>
          // )}
        />
        <Column
          width={120}
          title="Car Image"
          dataIndex="image"
          key="image"
          render={(image, datas) => (
            <img
              height={"40px"}
              width={"40px"}
              src={`${BACKEND_API}/api/image/${datas?.rent?.car.image}`}
            />
          )}
        />
        <Column
          width={180}
          title="Car Registration Number"
          dataIndex="registrationNumber"
          key="address"
          render={(image, datas) => <p>{datas?.rent.car.registrationNumber}</p>}
        />
        <Column
          width={200}
          title="Car Modal"
          dataIndex="modal"
          key="modal"
          render={(image, datas) => <p>{datas?.rent.car.modal}</p>}
        />
        <Column
          width={200}
          title="Damages By"
          key="modal"
          render={(image, datas) => <p>{datas?.rent.user.fullName}</p>}
        />
        <Column
          width={200}
          title="Damage Cost"
          key="modal"
          render={(image, datas) => (
            <Space size="small">
              {datas?.fee ? (
                <Tag style={{ cursor: "pointer" }} color="green">
                  Rs.{datas?.fee}
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
          width={200}
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="small">
              <Tag
                style={{ cursor: "pointer" }}
                color="#592D8C"
                onClick={() => {
                  if (!record.fee) {
                    setDamageDetails({
                      ...damageDetails,
                      id: record.id,
                      reason: record.reason,
                    });
                    showModal();
                  }
                }}
              >
                Set Cash
              </Tag>

              {record.fee ? (
                <Popconfirm
                  disabled={record.damagePay}
                  placement="topRight"
                  title={"Are you sure want to settlement ?"}
                  description={`Have you got the Damage Cash On hand ?`}
                  onConfirm={() => {
                    axiosInstance
                      .post(`/api/damages/${record.id}/settle`, null, {
                        headers: {
                          Authorization: `Bearer ${sessionData?.token}`,
                        },
                      })
                      .then((res) => {
                        console.log(res.data);
                        message.success("Settlement Done");
                      });
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tag style={{ cursor: "pointer" }} color="green">
                    Settlement
                  </Tag>
                </Popconfirm>
              ) : (
                ""
              )}
            </Space>
          )}
        />
      </Table>
      <Modal
        width={800}
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
            style={{ maxWidth: 800 }}
            autoComplete="off"
          >
            <Form.Item
              label="Damage Reason "
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please write the reason of Damage!",
                },
              ]}
            >
              <p>{damageDetails.reason}</p>
            </Form.Item>

            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please write the reason of Damage!",
                },
              ]}
            >
              <Input
                type="number"
                min={1}
                onChange={(t) => {
                  setDamageDetails({
                    ...damageDetails,
                    fee: t.target.value,
                  });
                }}
              ></Input>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
