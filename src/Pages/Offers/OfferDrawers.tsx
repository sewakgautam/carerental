import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Modal,
  UploadProps,
  UploadFile,
  DatePicker,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { RcFile } from "antd/es/upload";
import { addOffers, postUser } from "../../bridge";
import TextArea from "antd/es/input/TextArea";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function AddOfferDrawer({
  onChange,
}: {
  onChange: CallableFunction;
}) {
  const [offers, setOffers] = useState<{
    title?: string;
    description?: string;
    discountPercentage?: string;
    validityPeriod?: Date;
  }>({});

  const queryClient = useQueryClient();
  const userAuthorization: any = localStorage.getItem("session");
  const sessionData = JSON.parse(userAuthorization);

  const addOfferMutation = useMutation(
    () => {
      return addOffers(sessionData?.token, offers);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["offers"]);
      },
    }
  );

  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 40 }}
        layout="horizontal"
        onValuesChange={(t) => {
          console.log(t);
        }}
        style={{ maxWidth: 700 }}
      >
        <Form.Item label="Title">
          <Input
            value={offers.title}
            onChange={(t) => {
              setOffers({ ...offers, title: t.target.value });
            }}
            placeholder="Please enter offer Title"
          />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            onChange={(t) => {
              setOffers({ ...offers, description: t.target.value });
            }}
            placeholder="Please enter staff Email"
          />
        </Form.Item>

        <Form.Item label="Discount ( % )">
          <Input
            type="number"
            onChange={(t) => {
              setOffers({ ...offers, discountPercentage: t.target.value });
            }}
            placeholder="Please enter heritage address"
          />
        </Form.Item>
        <Form.Item label="Valid Till">
          <DatePicker
            onChange={(date, main) => {
              console.log(date);
              setOffers({ ...offers, validityPeriod: date });
            }}
          />
        </Form.Item>

        <Button
          onClick={() => {
            addOfferMutation.mutate();
          }}
          style={{ width: "100%" }}
          type="primary"
        >
          Save
        </Button>
      </Form>
    </>
  );
}
