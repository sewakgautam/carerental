import { Tabs, TabsProps } from "antd";
import { Link } from "react-router-dom";
import Documents from "../../components/Documents";
import GeneralSettings from "../../components/GeneralSettings";

export default function Profile() {
  const items: TabsProps["items"] = [
    {
      key: "general",
      label: `General Settings`,
      children: <GeneralSettings />,
    },
    {
      key: "controls",
      label: `Documents`,
      children: <Documents />,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <>
      <h1 style={{ marginLeft: 40, fontSize: 30, fontWeight: "500" }}>
        Settings
      </h1>

      <div style={{ marginLeft: 40, marginRight: 40 }}>
        <div
          style={{
            padding: 24,
            background: "dark",
          }}
        >
          <Tabs
            defaultActiveKey="general"
            style={{ background: "dark" }}
            items={items}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}
