import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";

function ConfirmDate({ handleNext, handleBack, setData, data }) {
  const [value, setValue] = useState(null);

  const handleCompNext = async () => {
    if (value !== null) {
      await setData({ ...data, date: value });
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
        <h6>Confirm Date</h6>
        <div className="div-inputs-schediling-step">
          <div className="div-input-icon-date-sch" style={{}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(params) => <TextField {...params} />}
                // label="Ignore date and time"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                minDateTime={new Date()}
                minutesStep={30}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className="nxt-btn-emp nxt-btn-sch">
        <button type="button" class="nxt-btn-btn" onClick={handleCompNext}>
          Next
        </button>
      </div>
      <div className="bck-btn-emp bck-btn-sch">
        <button type="button" class="bck-btn-btn" onClick={() => handleBack()}>
          <BiArrowBack size={18} style={{ marginRight: 5 }} /> Back
        </button>
      </div>
    </div>
  );
}

export default ConfirmDate;
