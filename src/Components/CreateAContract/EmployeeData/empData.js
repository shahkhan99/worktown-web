import React, { useState } from "react";
import "./empData.css";
import { BiArrowBack } from "react-icons/bi";
import Select from "react-select";
function EmpData({ getEmpoleeData, handleBack, handleNext, contractType }) {
  const [emp_city, setEmp_City] = useState([
    { value: "Karachi", label: "Karachi" },
    { value: "Hyderabad", label: "Hyderabad" },
  ]);

  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    nationality: "",
    city: "",
  });
  const handleInputChange = (target, e) => {
    setInputData({ ...inputData, [target]: e });
  };
  const handleCompNext = () => {
    let { city, email, fname, nationality, lname } = inputData;
    if (
      city !== "" &&
      email !== "" &&
      fname !== "" &&
      nationality !== "" &&
      lname !== ""
    ) {
      getEmpoleeData({ city, email, fname, nationality, lname });
      handleNext();
    }
  };
  // console.log(inputData);
  return (
    <div className="create-cont-div">
      <div className="create-head-div">
        <h4>Creating a {contractType} contract</h4>
      </div>
      <div className="div-emp-info">
        <h6>Employee Information</h6>
        <div className="div-inputs-emp">
          <div
            className="div-input-emp div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Employee first name (as per CNIC)"
              type="text"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              // value={this.state.name}
              onChange={(e) => {
                handleInputChange("fname", e.target.value);
              }}
              className="a-r-input-box inputs-emp"
            />
            <input
              placeholder="Employee last name (as per CNIC) "
              type="text"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              // value={this.state.name}
              onChange={(e) => {
                handleInputChange("lname", e.target.value);
              }}
              className="a-r-input-box inputs-emp"
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
              onChange={(e) => {
                handleInputChange("email", e.target.value);
              }}
              className="a-r-input-box inputs-emp-em"
            />
          </div>
          <div className="div-national-emp">
            {" "}
            <div className="div-national-emp-sel">
              <Select
                options={[{ value: "Pakistan", label: "Pakistan" }]}
                id="select"
                placeholder="Employee nationality"
                onChange={(e) => {
                  handleInputChange("nationality", e.value);
                }}
              />
            </div>
            <div className="div-national-emp-sel">
              <Select
                options={emp_city}
                id="select"
                placeholder="City employee will be working from"
                onChange={(e) => {
                  handleInputChange("city", e.value);
                }}
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

export default EmpData;
