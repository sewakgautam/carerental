import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Modal,
  Space,
  SelectProps,
  Switch,
} from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { RcFile, UploadProps } from "antd/es/upload";
import { useMutation, useQuery, useQueryClient } from "react-query";
import FormData from "form-data";
import { MinusCircleOutlined } from "@ant-design/icons";
import { axiosInstance, fetchOffers, postCars } from "../../bridge";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [];

for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `${value}`,
    value,
  });
}
const userAuthorization = localStorage.getItem("userRole");

export default function CarDrawer({ onChange }: any) {
  const queryClient = useQueryClient();
  const [Cars, setCars] = useState<{
    registrationNumber?: string;
    isAvailable?: boolean;
    modal?: string;
    image?: string;
    price?: number;
    mainImage?: object;
    offerId?: string; 
  }>({ isAvailable: true });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  let sessionData: any = localStorage.getItem("session");
  sessionData = JSON.parse(sessionData);

  const addCarImage = new FormData();

  const addCars = () => {
    addCarImage.append("file", Cars.mainImage);
    axiosInstance
      .post("/api/image", addCarImage, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionData.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.message);
        if (res?.data) {
          delete Cars.mainImage;
          addCarsMutation.mutate({ ...Cars, image: res.data.message });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCarsMutation = useMutation(
    (addCars) => {
      return postCars(addCars, sessionData?.token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cars"]);
      },
    }
  );

  const [offferOptions, setOfferOptions] = useState<[]>([]);
  const allOffers = useQuery("offers", () => fetchOffers(sessionData.token));

  useEffect(() => {
    const offers = allOffers?.data?.data.map((each: any) => {
      const catid = each.heritageId;
      const cattitle = each.title;
      return [catid, cattitle];
    });
    setHeritageOptions(Heritage);
  }, []);

  return (
    <>
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 30 }}
        layout="horizontal"
        // onFinish={() => addCars()}
        style={{ maxWidth: 700 }}
      >
        <Form.Item label="Image">
          <Upload
            beforeUpload={(file) => {
              setCars({ ...Cars, mainImage: file });
              return false;
            }}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Form.Item>
        <Form.Item label="Reg.Number">
          <Input
            value={Cars?.registrationNumber}
            onChange={(t) => {
              setCars({ ...Cars, registrationNumber: t.target.value });
            }}
            placeholder="Please enter package Title"
          />
        </Form.Item>

        <Form.Item label="Modal">
          <Input
            value={Cars?.modal}
            onChange={(t) => {
              setCars({ ...Cars, modal: t.target.value });
            }}
            placeholder="Please enter total required"
          />
        </Form.Item>
        <Form.Item label="Total Price">
          <Input
            type="number"
            value={Cars?.price}
            onChange={(t) => {
              setCars({ ...Cars, price: +t.target.value });
            }}
            placeholder="Please enter total Price"
          />
        </Form.Item>
        <Form.Item label="isAvailable">
          <Switch
            defaultChecked
            checked={Cars.isAvailable}
            onChange={(t) => {
              setCars({ ...Cars, isAvailable: t });
            }}
          />
        </Form.Item>
        <Form.Item label="Offers">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Select
              placeholder="Inserted are removed"
              value={Cars.offerId}
              onChange={(data) => {
                setCars({ ...Cars, offerId: data });
              }}
              style={{ width: "100%" }}
              options={offferOptions.map((item) => ({
                value: item[0],
                label: item[1],
              }))}
            />
          </Space>
        </Form.Item>

        <Button
          style={{ width: 340 }}
          type="primary"
          onClick={() => {
            addCars();
          }}
        >
          Save
        </Button>
      </Form>
    </>
  );
}
