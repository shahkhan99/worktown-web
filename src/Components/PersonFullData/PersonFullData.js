import React from "react";
import "./PersonFullData.css";
import moment from "moment";
import { Button } from "@mui/material";

export default function PersonFullData({ setShowPersonFullData, viewCand }) {
  const sklArr = [
    "phasdas",
    "phasdas",
    "phasdas",
    "phasdas",
    "phasdas",
    "phasdas",
    "phasdas",
  ];
  console.log(viewCand);
  return (
    <div className="div_main_Person_data">
      <div className="div_inner_main_Person_data">
        <div className="div_inner_Person_data">
          <label>Venue</label>
          <h6>{viewCand.Interview_Details.venue}</h6>
        </div>
        <div className="div_inner_Person_data">
          <label>Date</label>
          <h6>
            {moment(viewCand.Interview_Details.date).format("MMMM DD, YYYY")}
          </h6>
        </div>
        <div className="div_inner_Person_data">
          <label>Time</label>
          <h6>{moment(viewCand.Interview_Details.date).format("hh: mm A ")}</h6>
        </div>
      </div>
      <div className="div_inner_main_Person_data">
        <div className="div_inner_Person_data">
          <label>Name</label>
          <h6>{viewCand.Name}</h6>
        </div>
        <div className="div_inner_Person_data">
          <label>Title</label>
          <h6>{viewCand.JobType}</h6>
        </div>
      </div>
      <div className="div_inner_main_Person_data">
        <div className="div_inner_Person_data">
          <h6>{viewCand.Experience}</h6>
        </div>
        <div className="div_inner_Person_data">
          <h6>{viewCand.Education}</h6>
        </div>
        <div className="div_inner_Person_data">
          <h6>{viewCand.EnglishLevel}</h6>
        </div>
        <div className="div_inner_Person_data">
          <h6>{viewCand.City}</h6>
        </div>
      </div>
      <div className="div_inner_main_Person_data_ach">
        <p>{viewCand.Achievement}</p>
      </div>
      <div className="div_inner_main_Person_data_skl_time">
        <div className="div-home-appt-inner-skls ">
          {sklArr.map((skl) => (
            <p>{skl}</p>
          ))}
        </div>

        <div className="div-home-appt-inner-timings ">
          {sklArr.map((skl) => (
            <p>{skl}</p>
          ))}
        </div>
      </div>
      <div className="div-home-appt-inner-exit ">
        <Button
          size="medium"
          variant="outlined"
          color="error"
          onClick={() => setShowPersonFullData()}
        >
          Exit
        </Button>
      </div>
    </div>
  );
}
