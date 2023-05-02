import { Badge, Button, Descriptions, Drawer, Image, Space } from "antd";
import { useEffect, useState } from "react";
import GeneralDrawer from "./GeneralSettingDrawer";
import Documentsdrawer from "./DocumentDrawer";
import { BACKEND_API } from "../const";

export default function Documents() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };

  const [images, setImages] = useState<{ info?: string; path?: string }[]>([]);
  let data: any = localStorage.getItem("userData");
  data = JSON.parse(data);
  useEffect(() => {
    const result = data?.documents
      .filter((doc) => doc.info === "Liscense" || doc.info === "Citizenship")
      .map((doc) => ({ info: doc.info, path: doc.path }));
    console.log(result);
    setImages(result);
  }, []);

  return (
    <>
      <Descriptions
        title="User Documents"
        layout="vertical"
        bordered
        extra={
          <Button type="primary" onClick={() => setDrawerOpen(true)}>
            Edit / Add
          </Button>
        }
      >
        <Descriptions.Item label="Driving Liscense">
          <Image src={`${BACKEND_API}/api/Image/${images[0]?.path}`}></Image>
        </Descriptions.Item>
        <Descriptions.Item label="Citizenship">
          <Image src={`${BACKEND_API}/api/Image/${images[1]?.path}`}></Image>
        </Descriptions.Item>
      </Descriptions>
      <Drawer
        title="Edit /  Add Documents"
        placement="right"
        onClose={onClose}
        open={drawerOpen}
        size="large"
      >
        <Documentsdrawer />
      </Drawer>
    </>
  );
}
