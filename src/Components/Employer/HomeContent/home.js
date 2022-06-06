import React, { useState, useEffect } from "react";
import "./home.css";
import Logo from "../../../assets/Logo/logo.png";
import { GiAntiAircraftGun } from "react-icons/gi";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { GetAppointments, GetStats, CancelAppointment } from "./backend";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import moment from "moment";
import PersonFullData from "../../PersonFullData/PersonFullData";
function Home() {
  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );

  const [showPersonFullData, setShowPersonFullData] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [viewCand, setViewCand] = useState({});
  const [appt, setAppt] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(async () => {
    await GetAppointments(redux_data, setAppt);
    await GetStats(redux_data, setStats);
  }, [redux_data]);

  const handleViewBtn = (v) => {
    setViewCand(v);
    setShowPersonFullData(true);
  };
  const handleCancelAppointment = (v) => {
    setShowDeleteWarning(true);
    Swal.fire({
      title: `Are you sure to cancel your appoinment with ${v.Name}?`,
      allowEscapeKey: false,
      allowOutsideClick: false,
      // timer: 1000,
      showConfirmButton: true,
      showDenyButton: true,
      denyButtonText: `Don't Cancel`,
      confirmButtonText: `Cancel`,
    }).then((result) => {
      // console.log(result);
      if (result.isConfirmed) {
        CancelAppointment(redux_data, v);
        // console.log("cancel");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  var nameArr = redux_data !== undefined && redux_data.Name.split(" ");
  let date = new Date();
  let hours = date.getHours();
  let message =
    hours < 12
      ? "Good Morning"
      : hours < 17
      ? "Good Afternoon"
      : "Good Evening";
  console.log(stats);
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
          <h4>
            {message}, {redux_data !== undefined && nameArr[0]}!
          </h4>
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
              <p style={{ fontWeight: 700 }}>Your Stats</p>
            </div>
            {stats.length ? (
              <div className="div-stats-ul-empployer">
                <div className="div-stats-ul-empployer-div apt-li-cls-2">
                  <label>Active Appointments</label>
                  <p>
                    {stats.length
                      ? Object.keys(stats[0]?.appointments)?.length
                      : 0}
                  </p>
                </div>
                <div className="div-stats-ul-empployer-div apt-li-cls-2">
                  <label>Active Job Posts</label>
                  <p>
                    {stats.length ? Object.keys(stats[0]?.jobs)?.length : 0}
                  </p>
                </div>
                <div className="div-stats-ul-empployer-div apt-li-cls-2">
                  <label>Active Archive</label>
                  <p>
                    {stats.length ? Object.keys(stats[0]?.archive)?.length : 0}
                  </p>
                </div>
                <div className="div-stats-ul-empployer-div apt-li-cls-2">
                  <label>Total Appointments</label>
                  <p>
                    {stats.length
                      ? stats[0]?.all_time_stats?.all_time_appoitments
                      : 0}
                  </p>
                </div>
                <div className="div-stats-ul-empployer-div apt-li-cls-2">
                  <label>Total Job Posts</label>
                  <p>
                    {stats.length ? stats[0]?.all_time_stats?.all_time_jobs : 0}
                  </p>
                </div>
                <div className="div-stats-ul-empployer-div apt-li-cls-2">
                  <label>Total Archive</label>
                  <p>
                    {stats.length
                      ? stats[0]?.all_time_stats?.all_time_archive
                      : 0}
                  </p>
                </div>
              </div>
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
                No Stats...
              </h6>
            )}
          </div>
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
                      <li className={"apt-li-cls-1"}>
                        <p>{v.Name}</p>
                        <p>
                          {moment(v.Interview_Details.date).format(
                            "MMMM DD, YYYY"
                          )}{" "}
                          at{" "}
                          {moment(v.Interview_Details.date).format("hh:mm A")}
                        </p>
                        <span className="apt-li-cls-span">
                          <Button
                            size="small"
                            style={
                              i % 2 === 0
                                ? { borderColor: "#fff", color: "#fff" }
                                : { borderColor: "#fff", color: "#fff" }
                            }
                            variant="outlined"
                            onClick={() => handleViewBtn(v)}
                          >
                            View
                          </Button>
                          {/* <Button
                          size="small"
                          variant={i % 2 !== 0 ? "outlined" : "contained"}
                          color="error"
                          
                          // onClick={() => handleViewBtn(v)}
                        >
                          Cancel
                        </Button> */}
                          <IconButton
                            aria-label="delete"
                            sx={
                              i % 2 !== 0
                                ? { color: "#fff" }
                                : { color: "#fff" }
                            }
                            size="small"
                            onClick={() => handleCancelAppointment(v)}
                          >
                            <DeleteOutlinedIcon fontSize="medium" />
                          </IconButton>
                        </span>
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
        {showPersonFullData ? (
          <PersonFullData
            setShowPersonFullData={setShowPersonFullData}
            v={viewCand}
          />
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
}

export default Home;
