import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

function AddVenueLocation({ handleNext, handleBack, setData, data }) {
  const [venue, setVenue] = useState("");

  const handleCompNext = () => {
    if (venue !== "") {
      setData({ ...data, venuePin: venue });
      handleNext();
    }
  };

  // console.log(inputData);
  return (
    <div className="sch-stepper-form-div ">
      <div className="create-head-div">
        <h4>Schedule Interview</h4>
      </div>
      <div className="div-schediling-step-info">
        <h6>
          {data.InterviewType === "Physical"
            ? "Add pin location of venue"
            : "Add meeting link"}
        </h6>
        <div className="div-inputs-schediling-step">
          <div
            className="div-input-emp div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder={
                data.InterviewType === "Physical"
                  ? "Google map location"
                  : "Meeting link"
              }
              type="text"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              onChange={(e) => setVenue(e.target.value)}
              className="a-r-input-box inputs-emp input-stepper-schedule"
            />
          </div>
        </div>
      </div>
      <div className="bck-btn-emp-main">
        <div className="nxt-btn-emp nxt-btn-sch">
          <button type="button" class="nxt-btn-btn" onClick={handleCompNext}>
            Next
          </button>
        </div>
        <div className="bck-btn-emp bck-btn-sch">
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
  );
}

export default AddVenueLocation;
