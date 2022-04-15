import React, { useState, useEffect, ReactFragment } from "react";
import "./employeeJobs.css";
import Select from "react-select";
import Loader from "../../Employer/Loader/loader";
import { ImLocation, ImCross } from "react-icons/im";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { GrTechnology } from "react-icons/gr";
import { BsCash } from "react-icons/bs";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import { getJobsToView } from "./backend";

function ViewJobsEmployee() {
  const [job_options, SetJob_options] = useState([]);
  const [Shortlisted, SetShortlisted] = useState([
    {
      position: "Software developer",
      exp: "5-10 years",
      industry: "Software",
      eng: "English-Urdu mix",
      edu: "Post graduate ",
      time: ["full-time", "workuidsa"],
      city: "Karachi",
      jd: "Hello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello world",
      jt: "Monthly",
      exp_sal: "Rs 150 - Rs 500",
      skilss: ["react js", "react native", "python", "nodejs"],
    },
    {
      jd: "Hello world",
      jt: "Monthly",
      exp_sal: "Rs 150 - Rs 500",
      position: "CEO",
      industry: "Business",
      time: ["full-time", "workuidsa", "asdas"],
      exp: "10 years",
      eng: "Basic",
      edu: "Post graduate ",
      city: "Karachi",
      skilss: ["Administration", "Accounts"],
    },
    {
      jd: "Hello worldHello worldHello worldHello worldHello worldHello worldHello worldHello world",
      jt: "Monthly",
      exp_sal: "Rs 150 - Rs 500",
      position: "Software Engg",
      industry: "Software & IT",
      time: ["full-time", "workuidsa"],
      exp: "1 year",
      eng: "Basic",
      edu: "Graduate ",
      city: "Karachi",
      skilss: ["react js", "python", "nodejs", "mongodb", "mysql"],
    },
    {
      jd: "Hello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello world",
      jt: "Monthly",
      exp_sal: "Rs 150 - Rs 500",
      position: "UI/UX Designer",
      industry: "Design",
      time: ["full-time", "workuidsa"],
      city: "Karachi",
      exp: "Fresh",
      eng: "English-Urdu mix",
      edu: "Matric ",
      skilss: ["react js", "react native", "python", "nodejs", "mysql"],
    },
  ]);

  const [allJobs, setAllJobs] = useState("");
  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );

  useEffect(async () => {
    // getJobsToView(redux_data.jobs, setAllJobs);
  }, []);

  console.log("current =>", allJobs);

  return (
    <div className="shortlisting-main-upper">
      <div className="shrt-head-div">
        <h4>Your Jobs</h4>
      </div>
      <div className="shortlisted-main">
        <div className="shrt-cont-div">
          <div style={{ width: "100%" }}>
            <div className="shortlisted-ind-header">
              <div className="shortlisted-ind-header-heading">
                <div className="shortlisted-ind-header-heading-1">
                  <GrTechnology
                    color="#000"
                    size={35}
                    style={{ marginRight: 15 }}
                  />
                  <h4>Software & IT</h4>
                </div>
                {/* <div className="shortlisted-ind-header-heading-2">
                    <div className="div-cand-card-inner-skl-inn skl-inn-filter">
                        <p>{filterSplit[0]}</p>
                        <p>{filterSplit[1]}</p>
                    </div>
                    <PopupSelectFilter
                        getFilterTitle={(e) => getFilterTitle(e)}
                        job_options={job_options}
                    />
                    </div> */}
              </div>
            </div>
            <div className="div-cand-card-main">
              <div className="div-cand-card-main-sub div-cand-card-main-sub-view-jobs">
                {Shortlisted.length ? (
                  Shortlisted.map((v, i) => {
                    // var sklArr = v.Skills.split(",");
                    // var timeArr = v.InterestedIn.split(",");
                    return (
                      <div className="div-cand-card div-cand-card-view-jobs">
                        {/* {console.log(nameArr[1] && nameArr[1][0])} */}
                        <div className="div-cand-card-header-loc-exp-main">
                          <h3>{v.position} </h3>
                          <div className="div-cand-card-header-loc-exp">
                            <p>
                              <ImLocation
                                color="#000"
                                size={15}
                                style={{ marginRight: 5 }}
                              />
                              {v.city}
                            </p>
                            <p>
                              <FaStar
                                color="#000"
                                size={15}
                                style={{ marginRight: 5 }}
                              />

                              {v.exp}
                            </p>
                          </div>
                        </div>
                        <h4>{v.JobCategory}</h4>
                        <div className="div-cand-card-inner-main">
                          <div className="div-cand-card-inner-skl-inn1">
                            {v.skilss.map((skl) => (
                              <p>{skl}</p>
                            ))}
                          </div>
                          <div className="div-cand-card-inner1">
                            <div className="div-cand-card-inner1-fields">
                              <label>
                                {" "}
                                <FaUserGraduate
                                  color="#000"
                                  size={15}
                                  style={{ marginRight: 5 }}
                                />
                                <p>{v.edu}</p>
                              </label>
                            </div>
                            <div className="div-cand-card-inner1-fields">
                              <label>
                                {" "}
                                <TiSortAlphabeticallyOutline
                                  color="#000"
                                  size={20}
                                  style={{ marginRight: 5 }}
                                />
                                <p>{v.eng}</p>
                              </label>
                            </div>
                          </div>
                          <div className="div-cand-card-inner-skl">
                            <div className="div-cand-card-inner">
                              <div className="div-cand-card-inner-skl-inn">
                                {v.time.map((time) => (
                                  <p>{time}</p>
                                ))}
                                {/* {v.time} */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <MdOutlineSpeakerNotes
                          color="#000"
                          size={22}
                          style={{ marginRight: 5 }}
                        />
                        <div className="div-jd-view-jobs-employer">
                          <p>{v.JobDescription}</p>
                        </div>

                        <div className="div-cand-card-btn">
                          <button className="div-cand-card-btn-int-rej">
                            Delete
                          </button>
                          <button>Edit</button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewJobsEmployee;
