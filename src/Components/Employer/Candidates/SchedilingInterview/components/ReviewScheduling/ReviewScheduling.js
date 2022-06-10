import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Select from "react-select";
import moment from "moment";

function ReviewScheduling({
  handleSchedule,
  handleScheduleVirtual,
  handleBack,
  data,
}) {
  const handleInputChange = (target, e) => {};
  const handleCompNext = () => {
    handleSchedule(data);
  };
  const handleCompNextVitual = () => {
    handleScheduleVirtual(data);
  };
  // console.log("check=> ", data);
  return (
    <div className="create-cont-div create-cont-div-rv_scg">
      <div className="create-head-div">
        <h4>Schedule Interview</h4>
      </div>
      <div className="epemp-main-div-edit-main">
        <h6 style={{ fontSize: 19, textAlign: "center" }}>Review Details</h6>
        <div className="epemp-main-div-edit-inner-main">
          <div className="epemp-main-div-edit-inner">
            <label>Interview type</label>
            <h6>{data.InterviewType}</h6>
          </div>
          <div className="epemp-main-div-edit-inner">
            <label>
              {data.InterviewType === "Physical" ? "Venue" : "Platform"}
            </label>
            <h6>
              {data.InterviewType === "Physical" ? data.venue : "Google Meet"}
            </h6>
          </div>

          <div
            className="epemp-main-div-edit-inner"
            style={data.InterviewType === "Physical" ? {} : { display: "none" }}
          >
            <label>Pin Location</label>
            <h6>{data.venuePin}</h6>
          </div>

          <div className="epemp-main-div-edit-inner">
            <label>Date</label>
            <h6>
              {moment(data.date).format("dddd")},{" "}
              {moment(data.date).format("MMMM DD, YYYY")}
            </h6>
          </div>
          <div className="epemp-main-div-edit-inner">
            <label>Time</label>
            <h6>{data.time}</h6>
          </div>
        </div>
      </div>
      <div className="bck-btn-emp-main">
        <div className="nxt-btn-emp">
          <button
            type="button"
            class="nxt-btn-btn"
            onClick={
              data.InterviewType === "Physical"
                ? handleCompNext
                : handleCompNextVitual
            }
          >
            Schedule
          </button>
        </div>
        <div className="bck-btn-emp-main">
          <div className="bck-btn-emp">
            <button
              type="button"
              class="bck-btn-btn"
              onClick={() => handleBack()}
            >
              <BiArrowBack size={18} style={{ marginRight: 5 }} /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewScheduling;
