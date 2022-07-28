import React, { useState, useEffect, ReactFragment } from "react";
import "./archieve.css";
import Select from "react-select";
import Loader from "../Loader/loader";
import {
  setFilterType,
  getCurrentUserData,
  MatchingCandidates,
  getJobTypeFilterCand,
  getJobTitleFilters,
} from "../Candidates/backend/index";
import { ImLocation, ImCross } from "react-icons/im";
import { RiPagesLine } from "react-icons/ri";
import { GrTechnology } from "react-icons/gr";
import { BiPhone } from "react-icons/bi";
import { FaStar, FaUserGraduate } from "react-icons/fa";

function Archieve() {
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
      skilss: ["react js", "react native", "python", "nodejs"],
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
  const [filterType, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  useEffect(async () => {
    if (currentUser === "") {
      await getCurrentUserData(setCurrentUser);
    }
    if (currentUser !== "") {
      await setFilterType(setFilter, currentUser, filterType);
      await getJobTypeFilterCand(
        currentUser,
        setShortlistedCandidates,
        filterType
      );
    }
    // MatchingCandidates();
    // await checkUser()
  }, [currentUser, filterType]);

  const getFilterTitle = (e) => {
    setFilter(e);
  };
  let filterSplit = filterType.split("/");
  console.log("current =>");
  return (
    <div className="arch-main-div">
      <div className="shortlisted-ind-header-heading-int">
        <RiPagesLine color="#000" size={35} style={{ marginRight: 15 }} />
        <h2>Archieve</h2>
      </div>
      <div className="arch-overflow">
        <div className="arch-overflow-div">
          {Shortlisted.map((v) => {
            var nameArr = v.name.split(" ");
            return (
              <div className="div-cand-card-int">
                <div className="int-cross">
                  <ImCross
                    color="#000"
                    size={15}
                    style={{ position: "absolute", right: 0, top: 10 }}
                  />
                </div>
                <div className="int-card-header-name-exp">
                  <h4>{nameArr[0]}</h4>
                </div>
                <h3>{v.industry}</h3>
                <div className="div-cand-card-inner-skl-exp-loc-main">
                  <div className="div-cand-card-inner-skl-exp-loc-inner">
                    <div className="div-cand-card-inner-skl-int">
                      <div className="div-cand-card-inner-skl-inn1-int">
                        {v.skilss.map((skl) => (
                          <p>{skl}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="div-cand-card-inner1-fields">
                    <label>
                      <FaStar
                        color="#000"
                        size={15}
                        style={{
                          marginRight: 5,
                          position: "relative",
                          top: 1,
                        }}
                      />
                      {v.exp}
                    </label>

                    <p style={{ marginTop: 5 }}>
                      <ImLocation
                        color="#000"
                        size={15}
                        style={{ marginRight: 5 }}
                      />
                      {v.city}
                    </p>
                  </div>
                </div>
                <div className="div-cand-card-btn-int">
                  <button>Schedule Interview </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Archieve;
