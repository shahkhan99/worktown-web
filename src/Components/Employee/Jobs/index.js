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
import { Get_all_users_jobs } from "./backend";

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
    Get_all_users_jobs();
  }, []);

  // console.log("current =>", allJobs);

  return (
    <div className="shortlisting-main-upper">
      <div className="shrt-head-div">
        <h4>Recommended Jobs</h4>
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
                        <div className="div-cand-card-header-loc-exp-main div-js-card-header-loc-exp-main">
                          <h3 style={{ fontSize: 23 }}>{v.JobType} </h3>
                          <div className="div-cand-card-header-loc-exp div-js-card-header-loc-exp">
                            <p>
                              <ImLocation
                                color="#000"
                                size={15}
                                style={{ marginRight: 5 }}
                              />
                              {v.city}
                            </p>
                          </div>
                        </div>
                        <div className="div-jv-basic-main-main-div">
                          <div className="div-jv-basic-main-div1">
                            <div className="div-jv-basic-jd">
                              <label>Job description</label>
                              <p>{v.jd}</p>
                            </div>
                            <div className="div-jv-basic-jt">
                              <label>Job timings</label>
                              <p>{v.InterestedIn}</p>
                            </div>
                          </div>
                          <div className="div-jv-basic-main-div2">
                            <div className="div-jv-basic-skl">
                              <label>Skills</label>
                              <p>{v.skilss}</p>
                            </div>
                            <div className="div-jv-basic-exp">
                              <label>Experience</label>
                              <p>{v.exp}</p>
                            </div>
                            <div className="div-jv-basic-exp">
                              <label>Education</label>
                              <p>{v.edu}</p>
                            </div>
                            <div className="div-jv-basic-exp">
                              <label>English Level</label>
                              <p>{v.eng}</p>
                            </div>
                          </div>
                          <div className="div-jv-card-btn">
                            <button>Apply</button>

                            <button className="div-cand-card-btn-int-rej">
                              Reject
                            </button>
                          </div>
                        </div>
                        {/* <div className="div-exp-sal-view-jobs-employer">
                          <BsCash
                            color="#000"
                            size={22}
                            style={{ marginRight: 5 }}
                          />
                          <p>{v.ExpectedSalary}</p>&nbsp;/&nbsp;{" "}
                          <p>{v.JobTime}</p>
                        </div> */}
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
