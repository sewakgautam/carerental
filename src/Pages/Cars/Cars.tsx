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
import { fetchCars } from "../../bridge";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import CarDrawer from "./CarDrawer";
import { FilterValue } from "antd/es/table/interface";

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

export default function Cars() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: carData,
  } = useQuery("Cars", () => fetchCars());
  // console.log(carData?.data)

  const [drawerOpen, setDrawerOpen] = useState(false);
  const showDrawer = (packageId?: string) => {
    console.log(packageId);
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
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
          render={(image) => (
            <img
              height={"40px"}
              width={"40px"}
              src={`${BACKEND_API}/api/image/${image}`}
            />
          )}
        />
        <Column
          width={200}
          title="Registration Number"
          dataIndex="registrationNumber"
          key="address"
        />
        <Column width={200} title="Car Modal" dataIndex="modal" key="modal" />

        <Column
          width={150}
          title="Is Available"
          dataIndex="isAvailable"
          key="createdAt"
          render={(isAvailable, cars) => {
            return (
              <>
                {isAvailable ? (
                  <Tag color="green">Available</Tag>
                ) : (
                  <Tag color="red">Unavailable</Tag>
                )}
              </>
            );
          }}
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
        title="Add package"
        placement="right"
        onClose={onClose}
        open={drawerOpen}
      >
        <CarDrawer
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
