import React from "react";
import "./PersonFullData.css";
import moment from "moment";
import { Button } from "@mui/material";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { GiAchievement } from "react-icons/gi";

export default function PersonFullData({ setShowPersonFullData, viewCand }) {
  // var skills = viewCand.Skills.split(",");
  // var InterestedIn = viewCand.InterestedIn.split(",");
  // console.log(viewCand);

  return (
    <div className="div_main_Person_data">
      <div className="div_inner_main_Person_data">
        <div className="div_inner_Person_data">
          <label>Venue:</label>
          <h6>{viewCand !== {} && viewCand.Interview_Details.venue}</h6>
        </div>
        <div className="div_inner_Person_data">
          <label>Date:</label>
          <h6>
            {moment(viewCand.Interview_Details.date).format("MMMM DD, YYYY")}
          </h6>
        </div>
        <div className="div_inner_Person_data">
          <label>Time:</label>
          <h6>{moment(viewCand.Interview_Details.date).format("hh: mm A ")}</h6>
        </div>
      </div>
      <div className="div_inner_main_Person_data_Employee_home">
        <div className="div_inner_Person_data">
          <label>Name:</label>
          <h6>{viewCand.Name}</h6>
        </div>
        <div className="div_inner_Person_data">
          <label>Business Name:</label>
          <h6>{viewCand.BusinessName}</h6>
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
