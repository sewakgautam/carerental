import { message } from "antd";
import styles from "./Landing.module.css";
import { useEffect } from "react";

export default function LandingPage() {
 
  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.topbar}`}>
          <div className="row">
            <div className="col-md-3">
              <div className={styles.logo}>RENCTOCAR</div>
            </div>
            <div className="col-md-6">
              <div className={styles.menu}>
                <ul>
                  <li>
                    <a href="javascript:void(0)" className="">
                      About
                    </a>
                  </li>
                  <li className={styles.hassub}>
                    <a href="javascript:void(0)" className="">
                      Product{" "}
                      <i className="fa fa-chevron-down" aria-hidden="true" />
                    </a>
                    <div className={styles.submenuwrapper}>
                      <ul className={styles.submenu}>
                        <li>
                          <a href="javascript:void(0)">Product 1</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Product 2</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Product 3</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className={styles.hassub}>
                    <a href="javascript:void(0)" className="">
                      Pricing{" "}
                      <i className="fa fa-chevron-down" aria-hidden="true" />
                    </a>
                    <div className="sub-menu-wrapper">
                      <ul className="sub-menu">
                        <li>
                          <a href="javascript:void(0)">Basic Plan</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Normal Plan</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Premium Plan</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Platinum Plan</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="">
                      Services
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="user">
                <a href="javascript:void(0)" className="login">
                  Login
                </a>
                <a href="javascript:void(0)" className="register">
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="slider">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="slider-content">
                <div className="slider-content-header">
                  <h1>Over 11 million passengers</h1>
                </div>
                <div className="slider-content-detail">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                </div>
                <div className="slider-content-button">
                  <a href="javascript:void(0)" className="signup">
                    Sign Up Now
                  </a>
                  <a href="javascript:void(0)" className="learnmore">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="slider-image">
                <img src="img/res.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="feature">
                <div className="feature-icon">
                  <i className="fa fa-map-o" aria-hidden="true" />
                </div>
                <div className="feature-header">Easiest Way Around</div>
                <div className="feature-divider"></div>
                <div className="feature-detail">
                  One tap and a car comes directly to you. Hop in-your driver
                  knows exactly where to go. And when you get there, just step
                  out.
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature">
                <div className="feature-icon">
                  <i className="fa fa-history" aria-hidden="true" />
                </div>
                <div className="feature-header">Anywhere, Anytime</div>
                <div className="feature-divider"></div>
                <div className="feature-detail">
                  Daily commute. Errand across town. Early morning flight. Late
                  night drinks. Wherever you're headed, count on Uber for
                  ride-no reservation required.
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature">
                <div className="feature-icon">
                  <i className="fa fa-map-o" aria-hidden="true" />
                </div>
                <div className="feature-header">Low-Cost to Luxury</div>
                <div className="feature-divider"></div>
                <div className="feature-detail">
                  Economy cars at everyday prices are always available. For
                  special occations, no occations at all, or when you just a
                  need a bit more room, call a black car or SUV.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
