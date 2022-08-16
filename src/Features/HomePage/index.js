import React from "react";
import "rc-slider/assets/index.css";
import ReactFullpage from "@fullpage/react-fullpage";
import Form1 from "./forms/form1";
import Form2 from "./forms/form2";
import Form3 from "./forms/form3";
import Form4 from "./forms/form4";
import Form5 from "./forms/form5";
import Form6 from "./forms/form6";
import Form0 from "./forms/form0";
import Form7 from "./forms/form7";
import "./homeStyles.css";
import "./style1.css";
import "./style2.css";
import TextTransition, { presets } from "react-text-transition";
import "react-tagsinput/react-tagsinput.css";
import $ from "jquery";
import { checkUserSession } from "./backend/index";
import { connect } from "react-redux";
import { animatedStrings, content } from "./usefullArrays/zeroVersionText";
import { Saltimings, timings } from "./usefullArrays/salaryTiming";
import { afterLoad, onLeave } from "./functions/homeFunctions";
import { readRows, emp_readRows } from "./backend/sheet_db_backend";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uId: "",
      redux_data: null,
      loggedInGender: "",
      submitionSuccess: false,
      wantedCategorySelectionErr: false,
      loginSession: false,
      wantedCategorySelection: false,
      skillTag: [],
      allUsers: {},
      employee: true,
      employer: false,
      index: 0,
      sw: false,
      gd: false,
      dm: false,
      csr: false,
      noCategory: null,
      male: false,
      female: false,
      value: "0",
      value_px: 27,
      range_cond: 0,
      part1: true,
      part2: true,
      from: "",
      to: "",
      jobDesc: "",
      company: "",
      name: "",
      city: "",
      email: "",
      phone: "",
      sheetLoaded: false,
      courses: [],
      jobErr: false,
      companyTErr: false,
      nameTErr: false,
      phoneTErr: false,
      emailTErr: false,
      cityTErr: false,
      expTErr: false,
      eduTErr: false,
      engTErr: false,
      radTErr: false,
      intTErr: false,
      valTErr: false,
      jobDescTErr: false,
      skillTErr: false,
      achievementTErr: false,
      isSubmit: false,
      errorMessage: {
        name: "",
        nameValid: false,
        city: "",
        cityValid: false,
        email: "",
        emailValid: false,
        phone: "",
        phoneValid: false,
        company: "",
        companyValid: false,
        jobdesc: "",
        jobdescValid: false,
      },
      defSkills: [
        "Python",
        "Java",
        "Javascript",
        "C#",
        "Html/Css",
        "React Js",
        "Angular Js",
        "React Native",
        "AWS",
        "Php",
        "Laravel",
        "Wordpress",
        "ASP .NET",
        "Android",
        "Node Js",
        "Swift",
        "Django",
        "Objective C",
      ],
      defSkillsGD: [
        "Video Marketing",
        "SEO",
        "SEM",
        "Content Marketing",
        "Data Analytics",
        "Content Creation",
        "CRM",
        "Social Media Marketing",
        "Designing",
        "Email Marketing",
        "Storytelling",
        "Strategic Planning",
        "WordPress",
        "MS Office",
        "Newsletters",
        "Google Ads",
        "PPC",
        "CRO",
        "HTML/CSS",
      ],
      defSkillsDM: [
        "Adobe InDesign",
        "Maya",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Digital (UI, UX)",
        "Typography",
        "Sketching",
        "Ideation",
        "Designing for Print",
        "Portfolio Management",
        "Design Principles",
        "RGB & CMYK",
        "Coding",
        "Photography",
        "Branding",
      ],
      skills: [],
      achievement: "",
      achievementLen: 0,
      count: 0,
      experience: "",
      eng_lvl: "",
      education: "",
      interestedIn: [],
      JobCategory: "",
      selectedJobOption: "",
      selected: [],
      selectedSal: [],
      active: null,
      activeSal: null,
      selectingActive: true,
      isStopped: false,
      isPaused: false,
      isOpen: false,
      select_value: undefined,
    };
  }

  componentDidMount() {
    checkUserSession(this);
    readRows();
    emp_readRows();
  }

  render() {
    $(document).ready(function () {
      var mouseX = 0,
        mouseY = 0;
      var xp = 0,
        yp = 0;

      $(document).mousemove(function (e) {
        mouseX = e.pageX - 7;
        mouseY = e.pageY - 7;
      });

      setInterval(function () {
        xp += (mouseX - xp) / 6;
        yp += (mouseY - yp) / 6;
        $("#circle").css({ left: xp + "px", top: yp + "px" });
      }, 20);
    });

    let { selected, selectedSal, defSkills, defSkillsDM, defSkillsGD } =
      this.state;

    let selectedSalary = [];
    selectedSal.forEach((e) => {
      selectedSalary.push(Saltimings[e]);
    });

    let selectedCategories = [];
    selected.forEach((e) => {
      selectedCategories.push(timings[e]);
    });

    defSkills.sort(function (a, b) {
      return a.localeCompare(b); //using String.prototype.localCompare()
    });
    defSkillsGD.sort(function (a, b) {
      return a.localeCompare(b); //using String.prototype.localCompare()
    });
    defSkillsDM.sort(function (a, b) {
      return a.localeCompare(b); //using String.prototype.localCompare()
    });

    // console.log("data => ", this.state.jobErr, this.state.selectedJobOption);

    return (
      <ReactFullpage
        scrollOverflow={true}
        // sectionsColor={["#fff"]}
        sectionsColor={["#FF9772"]}
        onLeave={onLeave.bind(this)}
        afterLoad={afterLoad.bind(this)}
        responsiveWidth={2500}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage" style={{ height: "100%" }}>
              <span id="circle" class="circle"></span>
              <Form0 ctx={this} fullpageApi={fullpageApi} />

              {content.map((item, i) => {
                return (
                  <div className="section">
                    <div
                      className={i % 2 == 0 ? "even-section" : "odd-section"}
                    >
                      <div
                        className={i < 4 ? "transparent-bg0" : "transparent-bg"}
                      >
                        {i > 3 ? (
                          <div
                            className="text-div"
                            style={
                              i % 2 == 0
                                ? { textAlign: "left" }
                                : { textAlign: "right" }
                            }
                          >
                            <h1
                              style={
                                i === 1
                                  ? {
                                      fontStyle: "italic",
                                      fontWeight: "bolder",
                                    }
                                  : { fontStyle: "normal" }
                              }
                            >
                              {item.tittle}

                              <span
                                style={{
                                  fontStyle: "normal",
                                  color: "black",
                                  marginLeft: "5px",
                                }}
                              >
                                {item.unstyled}
                              </span>
                            </h1>

                            <br />
                            <p
                              style={
                                i % 2 == 0
                                  ? { alignItems: "flex-start" }
                                  : { alignItems: "flex-end" }
                              }
                            >
                              {item.body}
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                        {i === 0 ? (
                          <Form1
                            ctx={this}
                            fullpageApi={fullpageApi}
                            data={item}
                          />
                        ) : i === 1 ? (
                          <Form2
                            ctx={this}
                            fullpageApi={fullpageApi}
                            data={item}
                          />
                        ) : i === 2 ? (
                          <Form3
                            ctx={this}
                            fullpageApi={fullpageApi}
                            data={item}
                          />
                        ) : i === 3 ? (
                          <Form4
                            ctx={this}
                            fullpageApi={fullpageApi}
                            selectedCategories={selectedCategories}
                            selectedSalary={selectedSalary}
                          />
                        ) : i === 4 ? (
                          <Form5
                            ctx={this}
                            fullpageApi={fullpageApi}
                            selectedCategories={selectedCategories}
                            selectedSalary={selectedSalary}
                          />
                        ) : i === 5 ? (
                          this.state.submitionSuccess &&
                          !this.state.loginSession ? (
                            <Form6 ctx={this} fullpageApi={fullpageApi} />
                          ) : (
                            <>
                              <div className="fillout_error_div_h4">
                                <h4>Fill out the job form to access portal</h4>
                              </div>
                            </>
                          )
                        ) : (
                          <div
                            className={i === 0 ? "text-div0" : "text-div"}
                            style={
                              i % 2 == 0
                                ? { textAlign: "left" }
                                : { textAlign: "right" }
                            }
                          ></div>
                        )}
                      </div>
                      <div
                        className="color-bg"
                        style={{ background: item.colorCode }}
                      >
                        {i < 6 ? (
                          <div
                            className={i < 5 ? "text-div0" : "text-div"}
                            style={
                              i % 2 == 0
                                ? { textAlign: "left" }
                                : { textAlign: "right" }
                            }
                          >
                            <p
                              style={
                                i === 1
                                  ? { display: "none" }
                                  : i % 2 == 0
                                  ? { alignItems: "flex-start" }
                                  : { alignItems: "flex-end" }
                              }
                            >
                              {item.body}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div
                        className={
                          i <= 4 && i % 2 === 0 ? "vector-div2" : "vector-div1"
                        }
                        style={
                          i % 2 == 0
                            ? { justifyContent: "flex-end" }
                            : { justifyContent: "flex-start" }
                        }
                      >
                        {i >= 0 && i <= 4 ? (
                          <img
                            src={item.vector}
                            style={{ width: "100%", height: "100%" }}
                          />
                        ) : i === 5 ? (
                          <Form7 />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  redux_data: state.dashboard_auth,
});
// ReactDOM.render(<HomePage />, document.getElementById("react-root"));
export default connect(mapStateToProps)(HomePage);

// export default HomePage;
