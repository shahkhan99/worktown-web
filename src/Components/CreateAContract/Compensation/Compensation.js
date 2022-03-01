import React, { useState } from "react";
import "./Compensation.css";
import { GiAntiAircraftGun } from "react-icons/gi";
import { BiArrowBack } from "react-icons/bi";

import Select from "react-select";
function Compensation({
  contractType,
  getComensations,
  handleBack,
  handleNext,
}) {
  const [emp_city, setEmp_City] = useState([
    { value: "Karachi", label: "Karachi" },
    { value: "Hyderabad", label: "Hyderabad" },
  ]);
  const handleCompNext = () => {
    // let { city, email, fname, nationality, lname } = inputData;
    // if (
    //   city !== "" &&
    //   email !== "" &&
    //   fname !== "" &&
    //   nationality !== "" &&
    //   lname !== ""
    // ) {
    //   getEmpoleeData({ city, email, fname, nationality, lname });
    //   handleNext();
    // }
  };
  return (
    <div className="create-cont-div">
      <div className="create-head-div">
        <h4>Creating a {contractType} contract</h4>
      </div>
      <div className="div-emp-info">
        <h6>Compensation</h6>
        <div className="div-inputs-emp">
          <div
            className="div-input-emp div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Gross Monthly Salary"
              type="number"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              // value={this.state.name}
              className="a-r-input-box inputs-emp-em"
            />
          </div>
          <div
            className="div-input-emp div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Employee personal email address (optional)"
              type="email"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              // value={this.state.name}
              className="a-r-input-box inputs-emp-em"
            />
          </div>
          <div className="div-national-emp">
            {" "}
            <div className="div-national-emp-sel">
              <Select
                options={emp_city}
                id="select"
                placeholder="City employee will be working from"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="nxt-btn-emp">
        <button type="button" class="nxt-btn-btn" onClick={handleCompNext}>
          Next
        </button>
      </div>
      <div className="bck-btn-emp">
        <button type="button" class="bck-btn-btn" onClick={handleBack}>
          <BiArrowBack size={18} style={{ marginRight: 5 }} /> Back
        </button>
      </div>
    </div>
  );
}

export default Compensation;
