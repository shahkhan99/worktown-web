import React, { useState } from "react";

function InterviewType({ handleNext, setData, data }) {
  // const [type, setType] = useState("");

  const handleCompNext = (e) => {
    setData({ ...data, InterviewType: e });
    handleNext();
  };
  // console.log(inputData);
  return (
    <div className="sch-stepper-form-div ">
      <div className="create-head-div">
        <h4>Schedule Interview</h4>
      </div>
      <div className="div-schediling-step-info">
        <div className="div-schediling-step-info-phy-vir">
          <div
            className="div-schediling-step-info-phy-vir-inner"
            onClick={() => handleCompNext("Physical")}
          >
            Physical
          </div>
          <div
            className="div-schediling-step-info-phy-vir-inner"
            onClick={() => handleCompNext("Virtual")}
          >
            Virtual
          </div>
        </div>
      </div>
      {/* <div className="nxt-btn-emp nxt-btn-sch">
        <button type="button" class="nxt-btn-btn" onClick={handleCompNext}>
          Next
        </button>
      </div> */}
    </div>
  );
}

export default InterviewType;
