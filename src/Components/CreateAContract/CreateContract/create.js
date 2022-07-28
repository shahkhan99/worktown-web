import React, { useState } from "react";
import "./create.css";
import { GiAntiAircraftGun } from "react-icons/gi";
function CreateContract({ getContractType }) {
  const content = [
    {
      head: "Fixed Rate Employee",
      p: "For contracts that have a fixed rate on every payment cycle.",
    },
    {
      head: "Part-Time Employee",
      p: "Employ as part-time employee compliantly anywhere in the world.",
    },
    {
      head: "Full-Time Employee",
      p: "Employ as full-time employee compliantly anywhere in the world.",
    },
  ];
  const handleClick = (e) => {
    getContractType(e);
  };
  return (
    <div className="create-cont-div">
      <div className="create-head-div">
        <h4>Contract Type</h4>
        <p style={{ color: "gray", fontSize: 13, letterSpacing: 1.5 }}>
          Start creating your contract by selecting the most relevant type.{" "}
        </p>
      </div>
      <div className="div-main-payment">
        {content.map((v, i) => (
          <div className="create-cont-inner-box" onClick={() => handleClick(v)}>
            <GiAntiAircraftGun color="#3D459D" size={50} className="svg-u" />
            <h6>{v.head}</h6>
            <p>{v.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateContract;
