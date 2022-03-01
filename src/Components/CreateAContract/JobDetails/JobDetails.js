import React, { useState } from "react";
import "./JobDetails.css";
import { GiAntiAircraftGun } from "react-icons/gi";
import { BiArrowBack } from "react-icons/bi";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Select from "react-select";
function JobDetails({ getJobDetails, contractType, handleBack, handleNext }) {
  const [selectedDateF, handleDateChangeF] = useState(null);
  const [selectedDateT, handleDateChangeT] = useState(null);
  const [inputData, setInputData] = useState({
    jobTitle: "",
    jobCat: "",
    from: "",
    to: "",
  });
  const [job_type, setJob_type] = useState([
    { value: "Software & IT", label: "Software & IT" },
    { value: "Business", label: "Business" },
  ]);
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  var handleTo = "";
  var handleFrom = "";
  const handleTime = () => {
    handleFrom = selectedDateF === null ? null : formatAMPM(selectedDateF);
    handleTo = selectedDateT === null ? null : formatAMPM(selectedDateT);
  };
  const handleInputChange = (target, e) => {
    // console.log(handleFrom, handleTo);
    setInputData({ ...inputData, [target]: e });
  };
  handleTime();
  const handleCompNext = () => {
    let { jobCat, jobTitle } = inputData;
    console.log({ jobCat, jobTitle, handleTo, handleFrom });
    if (
      jobCat !== "" &&
      jobTitle !== "" &&
      handleTo !== null &&
      handleFrom !== null
    ) {
      // console.log({ jobCat, jobTitle, handleTo, handleFrom });
      getJobDetails({ jobCat, jobTitle, handleTo, handleFrom });
      handleNext();
    }
  };
  return (
    <div className="create-cont-div">
      <div className="create-head-div">
        <h4>Creating a {contractType} contract</h4>
      </div>
      <div className="div-emp-info-det">
        <h6>Job details</h6>
        <div className="div-inputs-emp-txt">
          <div className="div-national-emp">
            {" "}
            <div className="div-national-emp-sel">
              <Select
                options={[{ value: "CEO", label: "CEO" }]}
                id="select"
                placeholder="Job Title"
                onChange={(e) => {
                  handleInputChange("jobTitle", e.value);
                }}
              />
            </div>
            <div className="div-national-emp-sel">
              <Select
                options={job_type}
                id="select"
                placeholder="Job Category"
                onChange={(e) => {
                  handleInputChange("jobCat", e.value);
                }}
              />
            </div>
          </div>
          <div
            className="div-input-emp div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <p className="a-r-input-box inputs-emp-em inputs-emp-p ">
              Job type:{" "}
              <span style={{ fontWeight: "bold" }}> &nbsp; {contractType}</span>
            </p>
          </div>
          <div
            className="div-input-emp-time div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <p>Timings:</p>
            <div className="div-input-emp-timings">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                  minutesStep={30}
                  value={selectedDateF}
                  onChange={handleDateChangeF}
                  placeholder="FROM"
                />
                to
                <TimePicker
                  minutesStep={30}
                  value={selectedDateT}
                  onChange={handleDateChangeT}
                  placeholder="TO"
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div
            className="div-input-emp-txtarea div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            Scope of work:
            <textarea
              placeholder="Work Scope..."
              type="text"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              // value={this.state.name}
              rows={2}
              className="a-r-input-box inputs-emp"
            />
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

export default JobDetails;
