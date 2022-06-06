import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import moment from "moment";
import ReactTimeslotCalendar from "react-timeslot-calendar";

function ConfirmTime({ handleNext, handleBack, setData, data }) {
  const [value, setValue] = useState(null);
  const [Avalue, setAValue] = useState(null);
  const [id, setId] = useState(null);

  const handleCompNext = async () => {
    if (value !== null && Avalue !== null) {
      await setData({ ...data, Adate: value, Atime: Avalue });
      handleNext();
    } else {
      alert("All fields are mandatory.");
    }
  };
  const handleChange = (v) => {
    setId(v.id);
    setAValue(v.Stime);
  };
  const timeslots = [
    { Stime: "8:00 am", id: -1 },
    { Stime: "9:00 am", id: 0 },
    { Stime: "10:00 am", id: 1 },
    { Stime: "11:00 am", id: 2 },
    { Stime: "12:00 pm", id: 3 },
    { Stime: "1:00 pm", id: 4 },
    { Stime: "2:00 pm", id: 5 },
    { Stime: "3:00 pm", id: 6 },
    { Stime: "4:00 pm", id: 7 },
    { Stime: "5:00 pm", id: 8 },
    { Stime: "6:00 pm", id: 9 },
    { Stime: "7:00 pm", id: 10 },
    { Stime: "8:00 pm", id: 11 },
    { Stime: "9:00 pm", id: 12 },
    { Stime: "10:00 pm", id: 13 },
  ];

  console.log(value);
  return (
    <div className="sch-stepper-form-div ">
      <div className="create-head-div">
        <h4>Schedule Interview</h4>
      </div>
      <div className="div-schediling-step-info_date">
        <div className="div-inputs-schediling-step_date">
          <h6>Alternate Date</h6>
          <div className="div-input-icon-date-sch" style={{}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                minDate={data.date}
                renderInput={(params) => <TextField {...params} />}
                // label="Ignore date and time"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </LocalizationProvider>
          </div>
          <h6>Alternate Time Slot</h6>
          <div className="div-input-icon-date-sch" style={{}}>
            {timeslots.map((v) => {
              return (
                <div
                  className="slots-time-picker"
                  onClick={() => handleChange(v)}
                  style={
                    v.id === id
                      ? { backgroundColor: "#3E469D", color: "#fff" }
                      : { background: "#fff" }
                  }
                >
                  {v.Stime}
                </div>
              );
            })}
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

export default ConfirmTime;
