import React, { useState, useEffect, ReactFragment } from "react";
import "./ShortlistedCandidates.css";
import Select from "react-select";
import Loader from "../../Loader/loader";
import PopupSelectFilter from "./components/popupSelectFilter";

import {
  setFilterType,
  MatchingCandidates,
  getJobTypeFilterCand,
  getJobTitleFilters,
  handleAccept,
  getInterviewCandidates,
  handleReject,
  handleCross,
} from "../backend/index";
import { ImLocation, ImCross } from "react-icons/im";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { GrTechnology } from "react-icons/gr";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { BiPhone } from "react-icons/bi";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import slope from "../../../../assets/images/slope.png";
function ShortlistedCandidates() {
  const [job_options, SetJob_options] = useState([]);
  const [ShortlistedCandidates, setShortlistedCandidates] = useState("");
  const [interviewCandidates, setInterviewCandidates] = useState("");
  const [filterType, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState("");
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
  const checkOpenPopUp = () => {
    // checkOpen();
  };
  let filterSplit = filterType && filterType.split("/");

  console.log("current =>", ShortlistedCandidates);
  return (
    <div className="shortlisting-main-upper">
      <div className="shrt-head-div">
        <h4>Shortlisted Candidates</h4>
      </div>
      <div className="shortlisted-main">
        <div className="shrt-cont-div">
          <div style={{ width: "100%" }}>
            <div className="shortlisted-ind-header">
              <div className="shortlisted-ind-header-heading">
                <div className="shortlisted-ind-header-heading-1">
                  <GrTechnology
                    color="#000"
                    size={35}
                    style={{ marginRight: 15 }}
                  />
                  <h4>Software & IT</h4>
                </div>
                <div className="shortlisted-ind-header-heading-2">
                  {/* <div className="div-cand-card-inner-skl-inn skl-inn-filter"> */}
                  {/* <p
                      onClick={() => {
                        checkOpenPopUp();
                      }}
                    >
                 * {filterSplit[0] + "/" + filterSplit[1]}
                      <MdOutlineArrowDropDown
                        size={22}
                        style={{ marginLeft: 10 }}
                      />
                    </p> */}
                  {/* </div> */}
                  {job_options.length ? (
                    <PopupSelectFilter
                      getFilterTitle={(e) => getFilterTitle(e)}
                      job_options={job_options}
                      filterSplit={filterSplit}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="div-cand-card-main">
              <div className="div-cand-card-main-sub">
                {ShortlistedCandidates.length ? (
                  ShortlistedCandidates.map((v, i) => {
                    {
                      var sklArr = v.Skills.split(",");
                      var nameArr = v.Name.split(" ");
                      var timeArr = v.InterestedIn.split(",");
                    }

                    return (
                      <div className="frag">
                        <img
                          width={400}
                          height={400}
                          src={slope}
                          className="div-cand-card-img"
                        />
                        <div className="div-cand-card">
                          <div className="div-cand-card-header-loc-exp-main">
                            <h3>{nameArr[0]} </h3>
                            <h4>{v.JobType}</h4>
                          </div>
                          <div className="div-cand-card-header-loc-exp">
                            <p>
                              <ImLocation
                                color="#fff"
                                size={15}
                                style={{ marginRight: 5 }}
                              />
                              {v.City}
                            </p>
                            {/* <p>
                            <FaStar
                              color="#000"
                              size={15}
                              style={{ marginRight: 5 }}
                            />

                            {v.Experience}
                          </p> */}
                          </div>
                          <div className="div-cand-card-inner-skl-short">
                            <div className="div-cand-card-inner1-short">
                              <div className="div-cand-card-inner-short">
                                {sklArr.map((skl) => (
                                  <p>{skl}</p>
                                ))}
                              </div>

                              <div className="div-cand-card-inner-timing-short">
                                {timeArr.map((time) => (
                                  <p> &#9679; {time} &nbsp;</p>
                                ))}
                              </div>
                            </div>
                            <div className="div-cand-card-inner-skl-inn1-short">
                              <div className="div-cand-card-inner1-fields-short">
                                <label>
                                  {" "}
                                  <FaStar
                                    color="#fff"
                                    size={20}
                                    style={{ marginRight: 5 }}
                                  />
                                  <p>{v.Experience}</p>
                                </label>
                              </div>
                              <div className="div-cand-card-inner1-fields-short">
                                <label>
                                  {" "}
                                  <FaUserGraduate
                                    color="#fff"
                                    size={15}
                                    style={{ marginRight: 5 }}
                                  />
                                  <p>{v.Education}</p>
                                </label>
                              </div>
                              <div className="div-cand-card-inner1-fields-short">
                                <label>
                                  {" "}
                                  <TiSortAlphabeticallyOutline
                                    color="#fff"
                                    size={20}
                                    style={{ marginRight: 5 }}
                                  />
                                  <p>{v.EnglishLevel}</p>
                                </label>
                              </div>
                            </div>
                            <div className="div-cand-card-achieve-short">
                              <p>{v.Achievement}</p>
                            </div>
                          </div>
                          <div className="div-cand-card-btn">
                            <button
                              onClick={() =>
                                handleReject(
                                  v,
                                  redux_data,
                                  filterType,
                                  setShortlistedCandidates
                                )
                              }
                              className="div-cand-card-btn-int-rej"
                            >
                              Reject
                            </button>
                            <button
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
                ) : ShortlistedCandidates.length === 0 ? (
                  <div className="int-overflow-h3">
                    <h3 className="int-overflow-h3-">
                      No Candidates available
                    </h3>
                  </div>
                ) : (
                  <Loader />
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
                    <div className="div-cand-card-btn-int">
                      <button>Schedule Interview </button>
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
    // <div>{/* <PopupSelectFilter /> */}</div>
  );
}
export default ShortlistedCandidates;
