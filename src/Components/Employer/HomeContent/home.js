import React, { useState, useEffect } from "react";
import "./home.css";
import Logo from "../../../assets/Logo/logo.png";
import { GiAntiAircraftGun } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { GetAppointments } from "./backend";
import { Button } from "@mui/material";
import moment from "moment";
import PersonFullData from "../../PersonFullData/PersonFullData";
function Home() {
  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );

  const [showPersonFullData, setShowPersonFullData] = useState(false);
  const [viewCand, setViewCand] = useState({});
  const [appt, setAppt] = useState([]);

  useEffect(async () => {
    await GetAppointments(redux_data, setAppt);
  }, [redux_data]);

  const handleViewBtn = (v) => {
    setViewCand(v);
    setShowPersonFullData(true);
  };

  var nameArr = redux_data !== undefined && redux_data.Name.split(" ");
  return (
    <React.Fragment>
      <div
        className="main-div"
        style={
          showPersonFullData
            ? { backgroundColor: "rgba(0,0,0,0.8)", opacity: 0.15 }
            : {}
        }
      >
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
              <p style={{ fontWeight: 700 }}>Appointments</p>
            </div>
            <div className="div-appointments-ul-empployer">
              <ul>
                {appt.length ? (
                  appt.map((v, i) => {
                    // console.log(
                    //   moment(v.Interview_Details.date).format(
                    //     "MMMM Do YYYY, h:mm:ss a"
                    //   )
                    // );
                    return (
                      <li
                        className={
                          i % 2 === 0 ? "apt-li-cls-1" : "apt-li-cls-2"
                        }
                      >
                        <p>{v.Name}</p>
                        <p>
                          {moment(v.Interview_Details.date).format(
                            "MMMM DD, YYYY"
                          )}{" "}
                          at{" "}
                          {moment(v.Interview_Details.date).format("hh:mm A")}
                        </p>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleViewBtn(v)}
                        >
                          View
                        </Button>
                      </li>
                    );
                  })
                ) : (
                  <h6
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "darkgray",
                      fontSize: 20,
                    }}
                  >
                    No Appointments...
                  </h6>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className="PersonFullData_main_main_div"
        style={showPersonFullData ? { display: "flex" } : { display: "none" }}
      >
        <PersonFullData
          setShowPersonFullData={setShowPersonFullData}
          viewCand={viewCand}
        />
      </div>
    </React.Fragment>
  );
}

export default Home;
