import {
  Drawer,
  FloatButton,
  Popconfirm,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
  Tooltip,
} from "antd";
import Column from "antd/es/table/Column";
import moment from "moment";
import { PlusCircleOutlined } from "@ant-design/icons";
import { BACKEND_API } from "../../const";
import { fetchCars, fetchOffers } from "../../bridge";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { FilterValue } from "antd/es/table/interface";
import AddOfferDrawer from "./OfferDrawers";

interface DataType {
  id: string;
  regsitrationNumber: string;
  isAvailable: string;
  modal: string;
  image: string;
  // createdAt: string;
  // tags: string[];
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const userAuthorization: any = localStorage.getItem("session");
const sessionData = JSON.parse(userAuthorization);

export default function Offers() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: offerData,
  } = useQuery("Offers", () => fetchOffers(sessionData.token));
  // console.log(carData?.data)

  const [drawerOpen, setDrawerOpen] = useState(false);
  const showDrawer = (packageId?: string) => {
    console.log(packageId);
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Table
        loading={isLoading}
        bordered
        sticky
        pagination={false}
        // rowClassName={styles.row}
        dataSource={offerData?.data}
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

        <Column width={200} title="Title" dataIndex="title" key="address" />
        <Column
          width={200}
          title="Descriptions"
          dataIndex="description"
          key="modal"
        />

        <Column
          width={150}
          title="Discount Percentage (%)"
          dataIndex="discountPercentage"
          key="createdAt"
          render={(discountPercentage: any, datas) => {
            return (
              <>
                <Tag color="green">{discountPercentage}%</Tag>
              </>
            );
          }}
        />
        <Column
          width={150}
          title="Valid Till"
          dataIndex="validityPeriod"
          key="createdAt"
          render={(validityPeriod) => <p>{moment(validityPeriod).format("YYYY MMM D")}</p>}
        />

        <Column
          width={300}
          title="Action"
          key="action"
          dataIndex="heritageId"
          render={(_: any, record: DataType) => (
            <Space size="small">
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
                // description={`Are You Sure want to Delete ${record.title}`}
                // onConfirm={() =>
                //   deleteHeritageMutation.mutate(record.heritageId)
                // }
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
      <Tooltip placement="topLeft" title={"Add Cars"}>
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
        title="Add Offers"
        placement="right"
        size="large"
        onClose={onClose}
        open={drawerOpen}
      >
        <AddOfferDrawer
          onChange={(d: boolean) => {
            {
              d ? onClose() : undefined;
            }
          }}
        />
      </Drawer>
    </>
  );
}
