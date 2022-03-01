import React, { useState, useEffect } from "react";
import "./ShortlistedCandidates.css";
import {
  checkUser,
  getCurrentUserData,
  MatchingCandidates,
  getJobTypeFilterCand,
  getShortlisted,
} from "../backend/index";
import { ImLocation } from "react-icons/im";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { GrTechnology } from "react-icons/gr";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import Eng from "../../assets/eng.png";
function ShortlistedCandidates() {
  const [Shortlisted, SetShortlisted] = useState([
    {
      name: "Arham Abeer",
      position: "Software developer",
      exp: "5-10 years",
      eng: "English-Urdu mix",
      edu: "Post graduate ",
      time: "full-time",
      city: "Karachi",
      skilss: [
        "react js",
        "react native",
        "python",
        "nodejs",
        "mongodb",
        "mysql",
      ],
    },
    {
      name: "Ahmed Mehanti",
      position: "CEO",
      industry: "Business",
      time: "full-time",
      exp: "10 years",
      eng: "Basic",
      edu: "Post graduate ",
      city: "Karachi",
      skilss: [
        "react js",
        "react native",
        "python",
        "nodejs",
        "mongodb",
        "mysql",
      ],
    },
    {
      name: "Shahzaib khan",
      position: "Software Engg",
      industry: "Software & IT",
      time: "full-time",
      exp: "1 year",
      eng: "Basic",
      edu: "Graduate ",
      city: "Karachi",
      skilss: [
        "react js",
        "react native",
        "python",
        "nodejs",
        "mongodb",
        "mysql",
      ],
    },
    {
      name: "Ali Khan",
      position: "UI/UX Designer",
      industry: "Design",
      time: "part-time",
      city: "Karachi",
      exp: "Fresh",
      eng: "English-Urdu mix",
      edu: "Matric ",
      skilss: [
        "react js",
        "react native",
        "python",
        "nodejs",
        "mongodb",
        "mysql",
      ],
    },
  ]);
  const [Shortlisted1, SetShortlisted1] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  useEffect(async () => {
    getCurrentUserData(setCurrentUser);
    getJobTypeFilterCand(currentUser);
    getShortlisted();
    // await checkUser()
  }, []);
  console.log("current =>", Shortlisted1, Shortlisted);
  return (
    <div className="create-cont-div">
      <div className="create-head-div">
        <h2>Shortlisted Candidates</h2>
      </div>
      <div className="shortlisted-ind-header">
        <div className="shortlisted-ind-header-heading">
          <GrTechnology color="#000" size={35} style={{ marginRight: 15 }} />
          <h4>Software & IT</h4>
        </div>
      </div>
      <div className="div-cand-card-main">
        <div className="div-cand-card-main-sub">
          {Shortlisted.map((v, i) => (
            <div className="div-cand-card">
              <h3>{v.name}</h3>
              <h4>{v.position}</h4>
              <div className="div-cand-card-inner">
                <p>{v.time}</p>

                <p>
                  <ImLocation
                    color="#000"
                    size={15}
                    style={{ marginRight: 5 }}
                  />
                  {v.city}
                </p>
              </div>
              <div className="div-cand-card-inner1">
                <div className="div-cand-card-inner1-fields">
                  <label>
                    <FaStar color="#000" size={15} style={{ marginRight: 5 }} />
                    Experience
                  </label>
                  <p>{v.exp}</p>
                </div>
                <div className="div-cand-card-inner1-fields">
                  <label>
                    {" "}
                    <FaUserGraduate
                      color="#000"
                      size={15}
                      style={{ marginRight: 5 }}
                    />
                    Education
                  </label>
                  <p>{v.edu}</p>
                </div>
                <div className="div-cand-card-inner1-fields">
                  <label>
                    {" "}
                    <TiSortAlphabeticallyOutline
                      color="#000"
                      size={20}
                      style={{ marginRight: 5 }}
                    />
                    Enlish level
                  </label>
                  <p>{v.eng}</p>
                </div>
              </div>
              <div className="div-cand-card-inner-skl">
                <div className="div-cand-card-inner-skl-inn">
                  {v.skilss.map((skl) => (
                    <p>{skl}</p>
                  ))}
                </div>
              </div>
              <div className="div-cand-card-btn">
                <button>Accept &#10004; </button>
                <button>Reject &#x2718;</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ShortlistedCandidates;
