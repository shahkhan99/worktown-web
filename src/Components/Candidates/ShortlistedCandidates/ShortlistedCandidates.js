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
import { BiPhone } from "react-icons/bi";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import Eng from "../../assets/eng.png";
function ShortlistedCandidates() {
  const [Shortlisted, SetShortlisted] = useState([
    {
      name: "Arham Abeer",
      position: "Software developer",
      exp: "5-10 years",
      industry: "Software",
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
      skilss: ["Administration", "Accounts"],
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
  const [ShortlistedCandidates, setShortlistedCandidates] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  useEffect(async () => {
    getCurrentUserData(setCurrentUser);
    await getJobTypeFilterCand(setShortlistedCandidates);
    getShortlisted();
    // MatchingCandidates();
    // await checkUser()
  }, []);
  console.log("current =>", ShortlistedCandidates, Shortlisted);
  return (
    <div className="shortlisting-main-upper">
      <div className="shrt-head-div">
        <h4>Shortlisted Candidates</h4>
      </div>
      <div className="shortlisted-main">
        <div className="shrt-cont-div">
          <div>
            <div className="shortlisted-ind-header">
              <div className="shortlisted-ind-header-heading">
                <GrTechnology
                  color="#000"
                  size={35}
                  style={{ marginRight: 15 }}
                />
                <h4>Software & IT</h4>
              </div>
            </div>
            <div className="div-cand-card-main">
              <div className="div-cand-card-main-sub">
                {ShortlistedCandidates.length !== 0 &&
                  ShortlistedCandidates.map((v, i) => {
                    {
                      var sklArr = v.Skills.split(",");
                      var nameArr = v.Name.split(" ");
                      var timeArr = v.InterestedIn.split(",");
                    }
                    return (
                      <div className="div-cand-card">
                        {/* {console.log(nameArr[1] && nameArr[1][0])} */}
                        <h3>
                          {nameArr[0]}{" "}
                          <p>
                            <ImLocation
                              color="#000"
                              size={15}
                              style={{ marginRight: 5 }}
                            />
                            {v.City}
                          </p>
                        </h3>
                        <h4>{v.JobType}</h4>
                        <div className="div-cand-card-inner">
                          <div className="div-cand-card-inner-skl-inn">
                            {timeArr.map((time) => (
                              <p>{time}</p>
                            ))}
                          </div>
                        </div>
                        <div className="div-cand-card-inner1">
                          <div className="div-cand-card-inner1-fields">
                            <label>
                              <FaStar
                                color="#000"
                                size={15}
                                style={{ marginRight: 5 }}
                              />
                              Experience
                            </label>
                            <p>{v.Experience}</p>
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
                            <p>{v.Education}</p>
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
                            <p>{v.EnglishLevel}</p>
                          </div>
                        </div>
                        <div className="div-cand-card-inner-skl">
                          <div className="div-cand-card-inner-skl-inn1">
                            {sklArr.map((skl) => (
                              <p>{skl}</p>
                            ))}
                          </div>
                        </div>
                        <div className="div-cand-card-btn">
                          <button>Accept &#10004; </button>
                          <button>Reject &#x2718;</button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="int-main-div">
          <div className="shortlisted-ind-header-heading-int">
            <BiPhone color="#000" size={35} style={{ marginRight: 15 }} />
            <h2>Schedule Interview</h2>
          </div>
          <div className="int-overflow">
            <div>
              {Shortlisted.map((v) => {
                var nameArr = v.name.split(" ");
                return (
                  <div className="div-cand-card-int">
                    <div>
                      <h3>{nameArr[0]}</h3>
                      <div className="div-cand-card-inner1-fields">
                        <label>
                          <FaStar
                            color="#000"
                            size={15}
                            style={{ marginRight: 5 }}
                          />
                          Exp
                        </label>
                        <p>{v.exp}</p>
                      </div>
                    </div>
                    <h4>{v.industry}</h4>
                    <div className="div-cand-card-inner1">
                      <div className="div-cand-card-inner1-fields">
                        <label>
                          <FaStar
                            color="#000"
                            size={15}
                            style={{ marginRight: 5 }}
                          />
                          Exp
                        </label>
                        <p>{v.exp}</p>
                      </div>
                    </div>
                    <div className="div-cand-card-inner-skl-int">
                      <div className="div-cand-card-inner-skl-inn1">
                        {v.skilss.map((skl) => (
                          <p>{skl}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ShortlistedCandidates;
