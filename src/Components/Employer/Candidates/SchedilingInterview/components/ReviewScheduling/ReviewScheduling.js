import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Select from "react-select";
import moment from "moment";

function ReviewScheduling({ handleSchedule, handleBack, data }) {
  const handleInputChange = (target, e) => {};
  const handleCompNext = () => {
    handleSchedule();
  };
  console.log(data);
  return (
    <div className="create-cont-div">
      <div className="create-head-div">
        <h4>Schedule Interview</h4>
      </div>
      <div className="epemp-main-div-edit-main">
        <h6 style={{ fontSize: 15 }}>Review Details</h6>
        <div className="epemp-main-div-edit-inner-main">
          <div className="epemp-main-div-edit-inner">
            <label>Venue</label>
            <h6>{data.venue}</h6>
          </div>

          <div className="epemp-main-div-edit-inner">
            <label>Pin Location</label>
            <h6>{data.venuePin}</h6>
          </div>

          <div className="epemp-main-div-edit-inner">
            <label>Date</label>
            <h6>{moment(data.date).format("MMMM DD, YYYY")}</h6>
          </div>
          <div className="epemp-main-div-edit-inner">
            <label>Time</label>
            <h6>{moment(data.date).format("hh:mm A")}</h6>
          </div>
        </div>
      </div>
      <div className="nxt-btn-emp">
        <button type="button" class="nxt-btn-btn" onClick={handleCompNext}>
          Schedule
        </button>
      </div>
      <div className="bck-btn-emp">
        <button type="button" class="bck-btn-btn">
          <BiArrowBack
            size={18}
            style={{ marginRight: 5 }}
            onClick={() => handleBack()}
          />{" "}
          Back
        </button>
      </div>
    </div>
  );
}

export default ReviewScheduling;
