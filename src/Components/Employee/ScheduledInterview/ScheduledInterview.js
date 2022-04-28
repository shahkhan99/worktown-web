import React, { useState, useEffect, ReactFragment } from "react";
import "./ScheduledInterview.css";
import Select from "react-select";
// import Loader from "../Loader/loader";
import { getArchiveCand, handleCross } from "./backend/index";
import { ImLocation, ImCross } from "react-icons/im";
import { RiPagesLine } from "react-icons/ri";
import { GrTechnology } from "react-icons/gr";
import { BiPhone } from "react-icons/bi";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

function ScheduledInterview() {
  const [archiveCandidates, setArchiveCandidates] = useState("");
  const [filterType, setFilter] = useState("");
  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );

  useEffect(async () => {
    getArchiveCand(redux_data, setArchiveCandidates);
  }, []);

  const getFilterTitle = (e) => {
    setFilter(e);
  };
  let filterSplit = filterType.split("/");
  console.log("current =>", archiveCandidates);
  return (
    <div className="arch-main-div">
      <div className="shortlisted-ind-header-heading-int">
        <RiPagesLine color="#000" size={35} style={{ marginRight: 15 }} />
        <h2>Scheduled Interview</h2>
      </div>
      <div className="arch-overflow">
        <div className="arch-overflow-div">
          {archiveCandidates.length ? (
            archiveCandidates.map((v) => {
              var nameArr = v.Name.split(" ");
              var sklArr = v.Skills.split(",");
              return (
                <div className="div-cand-card-int div-arch-card-int">
                  <div className="int-cross"></div>
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
                    <button onClick={() => handleCross(redux_data, v)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="int-overflow-h3">
              <h3 className="int-overflow-h3-">Archive is empty</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ScheduledInterview;
