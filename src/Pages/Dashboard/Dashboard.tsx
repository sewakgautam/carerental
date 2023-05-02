import { Card, Col, Row, Spin, Statistic, message, notification } from "antd";

import car from "./Carchoose.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_API, color } from "../../const";
import { axiosInstance, fetchCars, fetchUsers } from "../../bridge";
import { useQuery } from "react-query";

export default function Dashboard() {
  const navigateTo = useNavigate();
  const [cars, setCars] = useState<
    {
      id?: string;
      modal?: string;
      image?: string;
      price?: number;
      isAvailable?: boolean;
    }[]
  >([]);

  const [isLoading, setLoading] = useState(false);

  let userToken: any = localStorage.getItem("session");
  userToken = JSON.parse(userToken);
  const allCars = useQuery("allCars", () => fetchCars());
  // const allCategories = useQuery("allCategories", () => fetchCategories());
  // const allPackages = useQuery("allPackages", () => fetchPackages());

  const allUsers = useQuery("allUsers", () =>
    fetchUsers("customer", userToken?.token)
  );

  // const datas = allUsers?.data;

  let container;
  const userSession = localStorage.getItem("userRole");

  // console.log("this is this", allUsers?.data?.data?.length);

  useEffect(() => {
    axiosInstance
      .get("/api/Cars")
      .then((res) => {
        console.log(res.data);
        setCars(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Spin size="large" spinning={isLoading}>
      {userSession == "admin" || userSession == "staff" ? (
        <Row style={{ margin: 40 }} gutter={16}>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Total users"
                value={allUsers?.data?.data?.length}
                valueStyle={{ color: color.Primary }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Total Cars"
                value={allCars.data?.data.length}
                valueStyle={{ color: color.Primary }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Car On Rent"
                value={cars.filter((obj) => obj.isAvailable === false).length}
                valueStyle={{ color: color.Primary }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Total available Cars"
                value={cars.filter((obj) => obj.isAvailable === true).length}
                valueStyle={{ color: color.Primary }}
              />
            </Card>
          </Col>
        </Row>
      ) : (
        <div
          style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}
        >
          {cars
            .filter((obj) => obj?.isAvailable === true)
            .map((each) => {
              return (
                <section className={car.rentalsummary}>
                  <div className={car.rentalimagecontainer}>
                    <img
                      src={`${BACKEND_API}/api/image/${each.image}`}
                      alt="image of car"
                    />
                  </div>
                  <div className={car.rentaldetails}>
                    <div className={car.header}>
                      <a href="#">
                        <h4 className={car.rentaltype}>{each?.modal}</h4>
                      </a>
                    </div>
                    <span className={car.rentalmodel}>
                      Hyundai Accent or similar
                    </span>

                    <span className={car.rentalcartypes}>
                      You'll Get One of These Rental Car Brands.
                    </span>
                  </div>
                  <div className={car.rentalbooking}>
                    <section className={car.pricingsummary}>
                      <div className={car.pricing}>
                        <span className={car.price}>Rs.{each?.price}</span>
                        <span className={car.perday}>/total</span>
                      </div>
                      <button
                        className={car.btn}
                        onClick={() => {
                          let todaydate = new Date();
                          todaydate = todaydate.toISOString();

                          let nextweekdate = new Date();
                          nextweekdate.setDate(nextweekdate.getDate() + 7);
                          nextweekdate = nextweekdate.toISOString();
                          setLoading(true);

                          axiosInstance
                            .post(
                              "/api/RentalRequests",
                              {
                                carId: each.id,
                                startDate: todaydate,
                                endDate: nextweekdate,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${userToken?.token}`,
                                },
                              }
                            )
                            .then((res) => {
                              console.log(res);
                              if (res.data.carId) {
                                message.success(
                                  "Rent Request was send to the Admin "
                                );
                              }
                            })
                            .catch((err) => {
                              console.log("this is ", err);
                            })
                            .finally(() => {
                              setLoading(false);
                            });
                        }}
                      >
                        Rent
                      </button>
                    </section>
                  </div>
                </section>
              );
            })}
        </div>
      )}
    </Spin>
  );
}
