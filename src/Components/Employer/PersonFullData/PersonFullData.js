import React from "react";
import "./PersonFullData.css";
import { MdLocationOn } from "react-icons/md";
import { Button, Backdrop } from "@mui/material";

export default function PersonFullData({ setShowPersonFullData, v }) {
  var nameArr = v.Name.split(" ");
  // console.log(v);
  var skills = v.Skills.split(",");
  var InterestedIn = v.InterestedIn.split(",");

  return (
    <div className="div_main_Person_data">
      <div
        className="frag"
        style={{ height: "100%", width: "100%", margin: 0 }}
      >
        <div className="div-cand-card" style={{ padding: 0 }}>
          <div className="div-cand-card-header-loc-exp-main-new">
            <div className="div-cand-card-header-loc-exp-main">
              <h3>{nameArr[0]} </h3>
              <h4>{v.JobType}</h4>
            </div>
            <div className="div-cand-card-header-loc-exp">
              <p>
                <MdLocationOn
                  color="#3E469D"
                  size={17}
                  style={{ marginRight: 0, width: 20 }}
                />
                {v.City}
              </p>
            </div>
          </div>
          <div className="div-cand-card-inner-skl-short">
            <div className="div-cand-card-achieve-short" style={{ top: 7 }}>
              <p style={{ fontSize: 13.5 }}>{v.Achievement}</p>
            </div>
            <div className="div-cand-card-inner1-short">
              <label>Skills</label>
              <div className="div-cand-card-inner-short">
                {skills.map((skl) => (
                  <p>{skl}</p>
                ))}
              </div>
            </div>
            <div className="div-cand-card-inner-timing-short">
              {InterestedIn.map((time) => (
                <p>
                  {" "}
                  <span> &#9679;</span> {time} &nbsp;
                </p>
              ))}
            </div>
            <div className="div-cand-card-inner-skl-inn1-short">
              <div className="div-cand-card-inner1-fields-short">
                <label>Experience</label>
                <p>{v.Experience}</p>
              </div>
              <div className="div-cand-card-inner1-fields-short">
                <label>Education</label>
                <p>{v.Education}</p>
              </div>
              <div className="div-cand-card-inner1-fields-short">
                <label>English Level</label>
                <p>{v.EnglishLevel}</p>
              </div>
            </div>
          </div>
          <div>
            <Button
              size="small"
              variant="outlined"
              color="error"
              style={{ height: 25, width: 80 }}
              onClick={() => setShowPersonFullData(false)}
            >
              Exit
            </Button>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // open={open}
        // onClick={handleClose}
        // style={{ width: "100%" }}
      ></Backdrop>
    </div>
  );
}
