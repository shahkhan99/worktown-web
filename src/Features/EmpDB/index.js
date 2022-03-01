import React, { useState } from "react";
import "./emp_db.css";
import WTRouter from "../../config/router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Left_navigation from "../../Components/LeftNavigation/navigation";
import Stepper from "../../Components/CreateAContract/Emp_Create_Contract_Stepper/stepper";
import ShortlistedCandidates from "../../Components/Candidates/ShortlistedCandidates/ShortlistedCandidates";
import Home from "../../Components/HomeContent/home";
import CreateContract from "../../Components/CreateAContract/CreateContract/create";

function Employer_DB() {
  const [selected_nav, setSelected_nav] = useState(0);

  const Components = [<Home />, <Stepper />, <ShortlistedCandidates />];

  const checkNav = (e) => {
    setSelected_nav(e);
  };
  return (
    <div style={{ height: "100%", display: "flex", background: "#f3f0f0" }}>
      {/* <WTRouter /> */}
      <Left_navigation checkNav={checkNav} />
      {/* <Home /> */}
      {/* <SelectContract /> */}
      {/* <CreateContract /> */}
      {/* <JobDetails /> */}
      {/* <ContractDetail /> */}
      {/* <EmpData /> */}
      {/* <Compensation /> */}
      {/* <Stepper /> */}
      {Components[selected_nav]}
    </div>
  );
}

export default Employer_DB;
