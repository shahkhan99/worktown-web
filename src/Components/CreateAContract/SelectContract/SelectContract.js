import React, { useState } from "react";
import "./SelectContract.css";
import { GiAntiAircraftGun } from "react-icons/gi";

function SelectContract({ getSelectedContract }) {
  const [headData, setHeadData] = useState([
    "Select interviewed candidates",
    "Hire from outside Worktown",
  ]);

  const handleClick = (e) => {
    getSelectedContract(e);
  };
  return (
    <div className="create-cont-div">
      <div className="create-head-div">
        <h4>Create Your Employement Contract</h4>
        <p style={{ color: "gray", fontSize: 13, letterSpacing: 1.5 }}>
          Start creating your contract by selecting the most relevant type.{" "}
        </p>
      </div>
      <div className="div-main-payment">
        {headData.map((v, i) => (
          <div
            key={i}
            className="sel-cont-inner-box"
            onClick={() => handleClick(v)}
          >
            <GiAntiAircraftGun color="#3D459D" size={50} className="svg-u" />
            <h6>{v}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectContract;
