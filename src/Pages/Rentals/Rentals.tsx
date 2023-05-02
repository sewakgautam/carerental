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
import { fetchCars, fetchRentalrequest, rentalRequest } from "../../bridge";
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

export default function Rentals() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: carData,
  } = useQuery("rentalRequest", () => fetchRentalrequest(sessionData?.token));

  const [condition, setContition] = useState<{
    approved?: boolean;
    rejectionReason?: string;
    requestId?: string;
  }>({});

  const rentalrequestMutation = useMutation(
    ({ approved, id, reason }) => {
      return rentalRequest(id, sessionData?.token, {
        ...condition,
        approved,
        rejectionReason: reason,
      });
    },
    {
      onSuccess: (t) => {
        if (t.data.approved) {
          message.success("Rental Request Accepted....");
          setContition({});
          queryClient.invalidateQueries(["rentalRequest"]);
        } else {
          message.warning("Rental Request rejected....");
          // setContition({});
          queryClient.invalidateQueries(["rentalRequest"]);
        }
      },
    }
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async (requestId: any) => {
    setContition({ ...condition, requestId });
    console.log(requestId);
    setIsModalOpen(true);
  };

  const handleModelOk = () => {
    setIsModalOpen(false);
    rentalrequestMutation.mutate({
      approved: false,
      id: condition.requestId,
      reason: condition.rejectionReason,
    });
  };

  const handleModelCancel = () => {
    setIsModalOpen(false);
  };

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
              src={`${BACKEND_API}/api/image/${datas?.car?.image}`}
            />
          )}
        />
        <Column
          width={200}
          title="Car Registration Number"
          dataIndex="registrationNumber"
          key="address"
          render={(image, datas) => <p>{datas.car.registrationNumber}</p>}
        />
        <Column
          width={200}
          title="Car Modal"
          dataIndex="modal"
          key="modal"
          render={(image, datas) => <p>{datas.car.modal}</p>}
        />
        <Column
          width={200}
          title="Start Date"
          dataIndex="starDate"
          key="modal"
          render={(starDate) => <p>{moment(starDate).format("YYYY MMM D")}</p>}
        />
        <Column
          width={200}
          title="End Date"
          dataIndex="endDate"
          key="modal"
          render={(endDate) => <p>{moment(endDate).format("YYYY MMM D")}</p>}
        />

        <Column
          width={150}
          title="Requested By user Name"
          key="createdAt"
          render={(image, datas) => <p>{datas.user.fullName}</p>}
        />

        <Column
          width={300}
          title="Action"
          key="action"
          dataIndex="heritageId"
          render={(_: any, record: any) => (
            <Space size="small">
              <Tag
                style={{ cursor: "pointer" }}
                color="green"
                onClick={() => {
                  rentalrequestMutation.mutate({
                    approved: true,
                    id: record.id,
                  });
                }}
              >
                Approve
              </Tag>

              <Popconfirm
                placement="topRight"
                title={"Reject Rental Request ???"}
                description={`Are You Sure want to reject ${record.car.modal}`}
                onConfirm={() => showModal(record?.id)}
                okText="Yes"
                cancelText="No"
              >
                <Tag style={{ cursor: "pointer" }} color="red">
                  Decline
                </Tag>
              </Popconfirm>
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
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please write the reason to reject!",
                },
              ]}
            >
              <TextArea
                minLength={40}
                onChange={(t) => {
                  setContition({
                    ...condition,
                    rejectionReason: t.target.value,
                  });
                }}
                placeholder="Please write the reason to reject!"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
