import React from "react";
import "./PersonFullData.css";
import moment from "moment";
import { Button } from "@mui/material";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoTrashBin } from "react-icons/io5";
import { GiAchievement } from "react-icons/gi";

export default function PersonFullData({ setShowPersonFullData, viewCand }) {
  var skills = viewCand.Skills.split(",");
  var InterestedIn = viewCand.InterestedIn.split(",");
  // console.log(viewCand);

  return (
    <div className="div_main_Person_data">
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
        <div className="div_inner_Person_data div_inner_Person_data_icons">
          <FaStar
            color="#000"
            size={20}
            style={{ marginRight: 5, marginBottom: 7 }}
          />
          <h6>{viewCand.Experience}</h6>
        </div>
        <div className="div_inner_Person_data div_inner_Person_data_icons">
          {" "}
          <FaUserGraduate
            color="#000"
            size={20}
            style={{ marginRight: 5, marginBottom: 7 }}
          />
          <h6>{viewCand.Education}</h6>
        </div>
        <div className="div_inner_Person_data div_inner_Person_data_icons">
          {" "}
          <TiSortAlphabeticallyOutline
            color="#000"
            size={20}
            style={{ marginRight: 5, marginBottom: 4 }}
          />
          <h6>{viewCand.EnglishLevel}</h6>
        </div>
        <div className="div_inner_Person_data div_inner_Person_data_icons">
          <ImLocation
            color="#000"
            size={20}
            style={{ marginRight: 5, marginBottom: 7 }}
          />
          <h6>{viewCand.City}</h6>
        </div>
      </div>
      <div className="div_inner_main_Person_data_ach-arch div_inner_main_Person_data_ach ">
        <GiAchievement
          color="#000"
          size={20}
          style={{ marginRight: 5, marginBottom: 7 }}
        />
        <p>{viewCand.Achievement}</p>
      </div>
      <div className="div_inner_main_Person_data_ach div_inner_main_Person_data_ach-arch">
        <IoTrashBin
          color="#000"
          size={20}
          style={{ marginRight: 5, marginBottom: 7 }}
        />
        <p>{viewCand.recjectionFeedback}</p>
      </div>
      <div className="div_inner_main_Person_data_skl_time">
        <div className="div-home-appt-inner-skls ">
          {skills.map((skl) => (
            <p>{skl}</p>
          ))}
        </div>

        <div className="div-home-appt-inner-timings ">
          {InterestedIn.map((skl) => (
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
