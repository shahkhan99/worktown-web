import React, { useState } from "react";

function AddVenue({ handleNext, setData, data }) {
  const [venue, setVenue] = useState("");

  const handleCompNext = () => {
    if (venue !== "") {
      setData({ ...data, venue: venue });
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
        <h6>Confirm Venue</h6>
        <div className="div-inputs-schediling-step">
          <div
            className="div-input-emp div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Enter venue name"
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
      <div className="nxt-btn-emp nxt-btn-sch">
        <button type="button" class="nxt-btn-btn" onClick={handleCompNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default AddVenue;
