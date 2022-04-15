import React, { useState } from "react";
import "./home.css";
import Logo from "../../../assets/Logo/logo.png";
import { GiAntiAircraftGun } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );
  var nameArr = redux_data !== undefined && redux_data.Name.split(" ");
  return (
    <div className="main-div">
      <div>
        <h4>Good Evening, {redux_data !== undefined && nameArr[0]}!</h4>
      </div>
      <div className="div-main-payment">
        <div className="div-main-payment-card1">
          <p style={{ fontWeight: 700 }}>No payments due</p>
          <button>View My Contracts</button>
        </div>
        <div className="div-main-payment-card2">
          <div className="div-payment-card2-inner">
            <p style={{ fontWeight: 700 }}>Paid this month</p>
            <p style={{ color: "gray" }}>Show last 30 days</p>
          </div>
          <div className="div-main-payment-card1-p">
            <h4>
              {" "}
              <span style={{ color: "gray" }}>Rs</span> 0
            </h4>
          </div>
        </div>
      </div>
      <div className="div-pay-hist-main">
        <div className="div-pay-hist-inner">
          <div className="div-pay-hist-inner1">
            <p style={{ fontWeight: 700 }}>Payment history</p>
          </div>
          <div>
            <GiAntiAircraftGun color="#3D459D" size={50} className="svg-u" />
          </div>
          <div style={{ color: "gray", fontSize: 12 }}>
            You'll see a beautiful graph after your first payment!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
