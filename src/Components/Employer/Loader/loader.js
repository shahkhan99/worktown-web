import React from "react";
import "./loader.css";
import { RotatingSquare } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="loader-main-div">
      <RotatingSquare
        height="200"
        width="200"
        color="grey"
        ariaLabel="loading"
      />
    </div>
  );
}
