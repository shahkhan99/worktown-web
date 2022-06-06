import React, { useState, useEffect, ReactFragment } from "react";
import "./ShortlistedCandidates.css";
import Select from "react-select";
import Loader from "../../Loader/loader";
import PopupSelectFilter from "./components/popupSelectFilter";
import PersonFullData from "../../PersonFullData/PersonFullData";
import Tech from "../assets/tech.png";
import DropDown from "./components/dropdownMUI/dropdown";
import { Backdrop } from "@mui/material";
import {
  setFilterType,
  MatchingCandidates,
  getJobTypeFilterCand,
  getJobTitleFilters,
  handleAccept,
  getInterviewCandidates,
  handleReject,
  handleCross,
  handleScheduleInterviewBtn,
  handleScheduleInterviewVirtualBtn,
} from "../backend/index";
import { ImLocation, ImCross } from "react-icons/im";
import { BsFilterLeft } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";
import { MdLocationOn } from "react-icons/md";
import { BiPhone } from "react-icons/bi";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import slope from "../../../../assets/images/slope.png";
import { send } from "emailjs-com";
import HorizontalLinearStepper from "../SchedilingInterview/stepper";
import UseWhatsapp from "whatsapp-react-component";
function ShortlistedCandidates() {
  const [normal, setNormal] = useState(true);
  const [scheduleData, setScheduleData] = useState({});
  const [scheduledCandidate, setScheduledCandidate] = useState();
  const [editingState, setEditingState] = useState("");
  const [job_options, SetJob_options] = useState([]);
  const [ShortlistedCandidates, setShortlistedCandidates] = useState("");
  const [interviewCandidates, setInterviewCandidates] = useState("");
  const [filterType, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [rejectionChange, setRejectionChange] = useState("");
  const [toSend, setToSend] = useState({
    from_name: "testing sender",
    to_name: "testing receiver",
    employer_name: "Deel",
    // reply_to: "arhamabeerahmed@gmail.com",
    send_to: "workhall.co@gmail.com",
    send_by: "hello@worktown.co",
  });
  const [personFullData, setPersonFullData] = useState({});
  const [showPersonFullData, setShowPersonFullData] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const dispatch = useDispatch();
  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );

  useEffect(async () => {
    await getInterviewCandidates(redux_data, setInterviewCandidates);
    if (redux_data === "") {
      await setCurrentUser(redux_data);
    }
    await getJobTypeFilterCand(
      redux_data,
      setShortlistedCandidates,
      filterType
    );
    if (redux_data !== "") {
      await setFilterType(setFilter, redux_data, filterType);
      await getJobTitleFilters(SetJob_options, redux_data);
    }
    // await MatchingCandidates(redux_data, filterType);
    // await checkUser()
  }, [currentUser, filterType, redux_data]);

  const getFilterTitle = (e) => {
    setFilter(e);
  };

  const checkOpen = (e) => {
    console.log(e);
  };

  const handleShowPersonData = (v) => {
    setPersonFullData(v);
    setShowPersonFullData(true);
  };
  const handleRejectBtn = (v) => {
    setEditingState(v.uid);
    setIsReject(true);
    // console.log("current =>", v);
  };

  const handleScheduleInterview = (e) => {
    setScheduledCandidate(e);
    // console.log(e.Phone);
    // send("service_0kxx7l1", "template_5y7pfk5", toSend, "gdh_CSodanmGmK83y")
    //   .then((response) => {
    //     console.log("SUCCESS!", response.status, response.text);
    //   })
    //   .catch((err) => {
    //     console.log("FAILED...", err);
    //   });
    // UseWhatsapp("3020217792", "hello");
    setNormal(false);
    // handleScheduleInterviewBtn(redux_data, e);
  };

  let filterSplit = filterType && filterType.split("/");

  // console.log("current =>", rejectionChange);
  return (
    <React.Fragment>
      <div
        className="shortlisting-main-upper"
        style={normal ? {} : { display: "none" }}
      >
        <div className="shrt-head-div">
          <h4>Shortlisted Candidates</h4>
        </div>
        <div
          className="shortlisted-main"
          style={
            showPersonFullData
              ? { backgroundColor: "rgba(0,0,0,0.8)", opacity: 0.15 }
              : {}
          }
        >
          <div className="shrt-cont-div">
            <div style={{ width: "100%" }}>
              <div className="shortlisted-ind-header">
                <div className="shortlisted-ind-header-heading">
                  <div className="shortlisted-ind-header-heading-1">
                    <img
                      src={Tech}
                      width={20}
                      height={20}
                      style={{ marginRight: 15 }}
                    />
                    <h4>Software & IT</h4>
                  </div>
                  <div className="shortlisted-ind-header-heading-2">
                    {job_options.length ? (
                      <div style={{ width: "100%" }}>
                        {/* <BsFilterLeft
                          color="#000"
                          size={35}
                          style={{ marginRight: 15 }}
                          onClick={() => checkOpenPopUp()}
                        /> */}
                        <DropDown
                          job_options={job_options}
                          filterSplit={filterSplit}
                          getFilterTitle={(e) => getFilterTitle(e)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {/* <div>
                <div className="shortlisted-ind-header">
                  <div className="shortlisted-ind-header-heading">
                    <div className="shortlisted-ind-header-heading-1">
                      <img
                        src={Tech}
                        width={20}
                        height={20}
                        style={{ marginRight: 15 }}
                      />
                      <PopupSelectFilter
                        getFilterTitle={(e) => getFilterTitle(e)}
                        job_options={job_options}
                        filterSplit={filterSplit}
                      />
                    </div>
                    <div className="shortlisted-ind-header-heading-2"></div>
                  </div>
                </div>
              </div> */}
              <div className="div-cand-card-main">
                <div
                  className="div-cand-card-main-sub"
                  style={{ height: "100%" }}
                >
                  {ShortlistedCandidates.length ? (
                    ShortlistedCandidates.map((v, i) => {
                      {
                        var sklArr = v.Skills.split(",");
                        var nameArr = v.Name.split(" ");
                        var timeArr = v.InterestedIn.split(",");
                      }

                      return (
                        <div className="frag">
                          <div className="div-cand-card">
                            <div className="div-cand-card-header-loc-exp-main-new">
                              <div className="div-cand-card-header-loc-exp-main">
                                <h3>{nameArr[0]} </h3>
                                <h4>{v.JobType}</h4>
                              </div>
                              <div className="div-cand-card-header-loc-exp">
                                <p>
                                  <MdLocationOn
                                    color="#3E469D"
                                    size={17}
                                    style={{ marginRight: 0, width: 20 }}
                                  />
                                  {v.City}
                                </p>
                              </div>
                            </div>
                            <div className="div-cand-card-inner-skl-short">
                              <div className="div-cand-card-inner1-short">
                                <label>Skills</label>
                                <div className="div-cand-card-inner-short">
                                  {sklArr.map((skl) => (
                                    <p>{skl}</p>
                                  ))}
                                </div>
                              </div>
                              <div className="div-cand-card-inner-timing-short">
                                {timeArr.map((time) => (
                                  <p>
                                    {" "}
                                    <span> &#9679;</span> {time} &nbsp;
                                  </p>
                                ))}
                              </div>
                              <div className="div-cand-card-inner-skl-inn1-short">
                                <div className="div-cand-card-inner1-fields-short">
                                  <label>Experience</label>
                                  <p>{v.Experience}</p>
                                </div>
                                <div className="div-cand-card-inner1-fields-short">
                                  <label>Education</label>
                                  <p>{v.Education}</p>
                                </div>
                                <div className="div-cand-card-inner1-fields-short">
                                  <label>English Level</label>
                                  <p>{v.EnglishLevel}</p>
                                </div>
                              </div>
                              <div className="div-cand-card-achieve-short">
                                <p>{v.Achievement}</p>
                              </div>
                            </div>

                            <div
                              className={
                                v.uid !== editingState
                                  ? "div-cand-card-btn"
                                  : "div-cand-card-btn div-cand-card-btn-div-input"
                              }
                            >
                              <input
                                style={
                                  v.uid === editingState
                                    ? { display: "flex" }
                                    : { display: "none" }
                                }
                                type="text"
                                className="div-cand-card-btn-input"
                                placeholder="type reason of rejection..."
                                onChange={(e) =>
                                  setRejectionChange(e.target.value)
                                }
                              />

                              <button
                                style={
                                  v.uid !== editingState
                                    ? { display: "flex" }
                                    : { display: "none" }
                                }
                                onClick={() => handleRejectBtn(v)}
                                className="div-cand-card-btn-int-rej"
                              >
                                Reject
                              </button>
                              <button
                                style={
                                  v.uid === editingState
                                    ? { display: "flex" }
                                    : { display: "none" }
                                }
                                onClick={() =>
                                  handleReject(
                                    v,
                                    redux_data,
                                    filterType,
                                    setShortlistedCandidates,
                                    setEditingState,
                                    rejectionChange,
                                    dispatch
                                  )
                                }
                                className="div-cand-card-btn-int-rej"
                              >
                                Reject
                              </button>
                              <ImCross
                                color="#000"
                                size={22}
                                style={
                                  v.uid === editingState
                                    ? {
                                        display: "flex",
                                        marginLeft: 5,
                                        cursor: "pointer",
                                      }
                                    : { display: "none" }
                                }
                                onClick={() => setEditingState("")}
                              />
                              <button
                                style={
                                  v.uid !== editingState
                                    ? { display: "flex" }
                                    : { display: "none" }
                                }
                                onClick={() =>
                                  handleAccept(
                                    v,
                                    redux_data,
                                    filterType,
                                    setShortlistedCandidates
                                  )
                                }
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : ShortlistedCandidates === "" ? (
                    <Loader />
                  ) : (
                    <div
                      className="int-overflow-h3"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <h3 className="int-overflow-h3-">
                        No Candidates available
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="int-main-div">
            <div className="shortlisted-ind-header-heading-int">
              <BiPhone color="#000" size={35} style={{ marginRight: 5 }} />
              <h2>Schedule Interview</h2>
            </div>
            <div className="int-overflow">
              {interviewCandidates.length ? (
                interviewCandidates.map((v) => {
                  var nameArr = v.Name.split(" ");
                  // console.log("rin => ", interviewCandidates);
                  return (
                    <div className="div-cand-card-int">
                      <div className="int-cross">
                        <ImCross
                          color="#000"
                          size={15}
                          style={{ position: "absolute", right: 0, top: 10 }}
                          onClick={() =>
                            handleCross(
                              redux_data,
                              v,
                              filterType,
                              setShortlistedCandidates
                            )
                          }
                        />
                      </div>
                      <div
                        className="int-card-int-cursor"
                        onClick={() => handleShowPersonData(v)}
                      >
                        <div className="int-card-header-name-exp">
                          <h4>{nameArr[0]}</h4>
                        </div>
                        <h3>{v.JobType}</h3>
                        <div className="div-cand-card-inner-skl-exp-loc-main">
                          <div className="div-cand-card-inner1-fields">
                            <label>
                              <FaStar
                                color="#000"
                                size={15}
                                style={{
                                  marginRight: 5,
                                  position: "relative",
                                  top: 1,
                                }}
                              />
                              {v.Experience}
                            </label>

                            <p style={{ marginTop: 5 }}>
                              <ImLocation
                                color="#000"
                                size={15}
                                style={{ marginRight: 5 }}
                              />
                              {v.City}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="div-cand-card-btn-int">
                        {/* <button onClick={() => handleScheduleInterview1(v)}> */}
                        <button onClick={() => handleScheduleInterview(v)}>
                          Schedule Interview
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="int-overflow-h3">
                  <h3 className="int-overflow-h3-">No Candidates available</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        style={normal ? { display: "none" } : { display: "flex" }}
        className="Shortlisted_stepper_scheduling_main_div"
      >
        <HorizontalLinearStepper
          setNormal={setNormal}
          setScheduleData={setScheduleData}
          handleScheduleInterviewBtn={handleScheduleInterviewBtn}
          redux_data={redux_data}
          scheduledCandidate={scheduledCandidate}
          handleScheduleInterviewVirtualBtn={handleScheduleInterviewVirtualBtn}
        />
      </div>
      <div
        className="PersonFullData_main_main_div"
        style={showPersonFullData ? { display: "flex" } : { display: "none" }}
      >
        {showPersonFullData ? (
          <PersonFullData
            setShowPersonFullData={setShowPersonFullData}
            v={personFullData}
          />
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
}
// <div>{/* <PopupSelectFilter /> */}</div>

export default ShortlistedCandidates;
