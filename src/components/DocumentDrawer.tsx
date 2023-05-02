import { Button, Form, Modal, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { axiosInstance } from "../bridge";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const addCitizenship = new FormData();
const addLiscense = new FormData();
export default function Documentsdrawer() {
  let token: any = localStorage.getItem("session");
  token = JSON.parse(token);

  const [document, setDocument] = useState<{
    citizenship?: object;
    liscense?: object;
  }>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [liscense, setLiscense] = useState<UploadFile[]>([]);
  const [citizenship, setCitizenship] = useState<UploadFile[]>([]);
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

  const handleLiscense: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setLiscense(newFileList);

  const handleCitizenship: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setCitizenship(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadDoc = () => {
    addCitizenship.append("file", document?.citizenship);
    addLiscense.append("file", document?.liscense);
    setDocument({});
    for (let i = 0; i <= Object.keys(document).length; i++) {
      if (i == 0) {
        axiosInstance
          .post("/api/image", addCitizenship, {
            headers: {
              Authorization: `Bearer ${token?.token}`,
            },
          })
          .then((res) => {
            if (res.data.message)
              axiosInstance
                .post(
                  "/api/Documents",
                  {
                    path: res.data.message,
                    info: "Citizenship",
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token?.token}`,
                    },
                  }
                )
                .then((res) => {
                  console.log(res);
                });
          })
          .finally(() => {
            addCitizenship.delete("file");
          });
      } else {
        axiosInstance
          .post("/api/image", addLiscense, {
            headers: {
              Authorization: `Bearer ${token?.token}`,
            },
          })
          .then((res) => {
            if (res.data.message)
              axiosInstance.post(
                "/api/Documents",
                {
                  path: res.data.message,
                  info: "Liscense",
                },
                {
                  headers: {
                    Authorization: `Bearer ${token?.token}`,
                  },
                }
              );
          })
          .finally(() => {
            addLiscense.delete("file");
          });
      }
    }
  };
  return (
    <>
      <div>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 30 }}
          layout="horizontal"
          onValuesChange={(t) => {
            console.log(t);
          }}
          style={{ maxWidth: 700 }}
        >
          <Form.Item label="Driving liscense">
            <Upload
              beforeUpload={(file) => {
                setDocument({ ...document, liscense: file });
                return false;
              }}
              listType="picture-card"
              fileList={liscense}
              onPreview={handlePreview}
              onChange={handleLiscense}
            >
              {liscense.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="Image" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form.Item>
          <Form.Item label="Citizenship">
            <Upload
              beforeUpload={(file) => {
                setDocument({ ...document, citizenship: file });
                return false;
              }}
              listType="picture-card"
              fileList={citizenship}
              onPreview={handlePreview}
              onChange={handleCitizenship}
            >
              {citizenship.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="Image" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form.Item>

          <Button
            onClick={() => uploadDoc()}
            style={{ width: "100%", marginLeft: 15 }}
            type="primary"
            // loading={searchingOnline}
          >
            Save
          </Button>
        </Form>
      </div>
    </>
  );
}
