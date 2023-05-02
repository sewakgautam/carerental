import { useEffect, useState } from "react";
import { axiosInstance } from "../../bridge";

export default function Notifications() {
  let userData: any = localStorage.getItem("session");
  userData = JSON.parse(userData);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/Notifications", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setNotifications(res?.data);
      });
  }, []);
  return (
    <>
      <h2 style={{ margin: 20, color: "white" }}>Notifications</h2>
      {notifications.map((each) => {
        return (
          <div
            style={{
              display: "flex",
              gap: 20,
              margin: 20,
              background: "#1C2125",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <img
              src="https://media.kasperskydaily.com/wp-content/uploads/sites/85/2021/05/17062501/annoying-notifications-ios-featured.jpg"
              height={10}
              width={50}
              style={{ borderRadius: 50 }}
            />
            <div>
              <h4 style={{ color: "white" }}>{each?.mainText}</h4>
              <p style={{ color: "white" }}> {each?.message}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
