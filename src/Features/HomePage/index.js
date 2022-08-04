import React from "react";
import ReactDOM from "react-dom";
import "rc-slider/assets/index.css";
import { getDatabase } from "firebase/database";
import {
  set,
  ref,
  push,
  child,
  update,
  onValue,
  onChildAdded,
} from "@firebase/database";
import firebase from "../../config/firebase";
import ReactFullpage from "@fullpage/react-fullpage";
import Form1 from "./forms/form1";
import Form2 from "./forms/form2";
import Form3 from "./forms/form3";
import Form4 from "./forms/form4";
import Form5 from "./forms/form5";
import Form6 from "./forms/form6";
import Swal from "sweetalert2";
import { GoogleSpreadsheet } from "google-spreadsheet";
import "./homeStyles.css";
import "./style1.css";
import "./style2.css";
import Logo from "../../assets/Logo/logo.png";
import Vector1 from "../../assets/Vectors/vector1.png";
import Vector9 from "../../assets/Vectors/vector9.png";
import ArrowIcon from "../../assets/icons/up-arrow.png";
import TextTransition, { presets } from "react-text-transition";
import "react-tagsinput/react-tagsinput.css";
import $ from "jquery";
import { checkUserSession } from "./backend/index";
import { connect } from "react-redux";
import { animatedStrings, content } from "./usefullArrays/zeroVersionText";
import { Saltimings, timings } from "./usefullArrays/salaryTiming";
import {
  SPREADSHEET_ID,
  EMPLOYER_SPREADSHEET_ID,
  SHEET_ID,
  SHEET_ID_EMP,
  CLIENT_EMAIL,
  PRIVATE_KEY,
} from "./confKeys/conf_keys";

const db = getDatabase();
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
const emp_doc = new GoogleSpreadsheet(EMPLOYER_SPREADSHEET_ID);

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
  handleModeChange(mode, fullpage) {
    fullpage.moveTo(2, 0);
    this.setState({
      wantedCategorySelectionErr: false,
      wantedCategorySelection: true,
    });
    mode === "Employer"
      ? this.setState({ employee: false, employer: true })
      : this.setState({ employer: false, employee: true });
    // console.log("e");
    fullpage.moveTo(2, 0);
  }
  onLeave(origin, destination, direction) {
    // console.log("Leaving section " + origin.index);
    if (origin.index == 1) {
      clearInterval(this.intervalId);
    }
  }
  afterLoad(origin, destination, direction) {
    // console.log("After load: " + destination.index);
    if (destination.index == 1) {
      this.intervalId = setInterval(
        () => {
          this.setState({ index: this.state.index + 1 });
        },
        1300
        // every 1.5 seconds
      );
    }
  }
  handleSelect = (name, value) => {
    this.setState({ [name]: value.target.value });
    // console.log(value.target.value);
    name === "experience" && value.target.value === ""
      ? this.setState({ expTErr: true })
      : this.setState({ expTErr: false });
    name === "education" && value.target.value === ""
      ? this.setState({ eduTErr: true })
      : this.setState({ eduTErr: false });
    name === "eng_lvl" && value.target.value === ""
      ? this.setState({ engTErr: true })
      : this.setState({ engTErr: false });
  };
  handleCard = (fullpageApi, val) => {
    if (this.state.wantedCategorySelection) {
      this.setState({ JobCategory: val.name });
      if (val.name === "Software & IT Jobs") {
        this.handleSW();
        this.setState({ noCategory: false });
      } else if (val.name === "Digital Marketing Jobs") {
        this.handleDM();
        this.setState({ noCategory: false });
      } else if (val.name === "Graphics & Design Jobs") {
        this.handleGD();
        this.setState({ noCategory: false });
      }
      fullpageApi.moveTo(3, 0);
    } else {
      this.setState({ wantedCategorySelectionErr: true });
      // console.log(fullpageApi.getActiveSection());
      // fullpageApi.moveTo(1, 0);
      $("html, body").animate({ scrollTop: 0 }, "normal");
    }
  };

  handleNext1 = async (fullpageApi) => {
    let gender =
      this.state.loggedInGender !== ""
        ? this.state.loggedInGender
        : this.state.male
        ? "Male"
        : this.state.female
        ? "Female"
        : "";

    if (
      this.state.name === "" ||
      (this.state.employee && gender === "") ||
      (this.state.employer && this.state.company === "") ||
      this.state.phone === "" ||
      this.state.JobCategory === "" ||
      this.state.email === "" ||
      this.state.phoneTErr ||
      !this.state.errorMessage.phoneValid
    ) {
      this.state.name === "" && this.setState({ nameTErr: true });
      this.state.phone === "" && this.setState({ phoneTErr: true });
      this.state.email === "" && this.setState({ emailTErr: true });
      !this.state.sw && fullpageApi.moveTo(2, 0);
      !this.state.sw && this.setState({ noCategory: true });
      if (this.state.employer) {
        this.state.company === "" && this.setState({ companyTErr: true });
      } else if (this.state.employee) {
        !this.state.male &&
          !this.state.female &&
          this.setState({ radTErr: true });
        console.log(this.state.male, this.state.female);
      }
    } else {
      let allEmployeesResult = {};
      let allEmployersResult = {};
      let allUsers = {};

      if (this.state.employer) {
        const allEmployers = ref(db, `users/jobs_employer`);

        onValue(allEmployers, (snapshot) => {
          if (snapshot.exists()) {
            allEmployersResult = snapshot.val();
            // console.log(allEmployersResult);
            let ObjVal = Object.values(allEmployersResult);
            let findSimilarE = ObjVal.filter(
              (e) => e.Email === this.state.email
            );
            let findSimilar = ObjVal.filter(
              (e) => e.Phone === this.state.phone
            );
            // this.setState({ allUsers: findSimilar });
            // console.log(findSimilar, findSimilarE);
            if (this.state.loginSession) {
              let gender =
                this.state.loggedInGender !== ""
                  ? this.state.loggedInGender
                  : this.state.male
                  ? "Male"
                  : this.state.female
                  ? "Female"
                  : "";
              this.appendSpreadsheet({
                Name: this.state.name,
                Phone: this.state.phone,
                City: this.state.city,
                Email: this.state.email,
                JobCategory: "",
                JobType: "",
                Experience: "",
                Skills: "",
                Education: "",
                InterestedIn: "",
                CurrentSalary: "",
                Gender: gender,
                EnglishLevel: "",
                Achievement: "",
              });
              fullpageApi.moveTo(4, 0);
            } else {
              if (findSimilar.length && !findSimilarE.length) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Email or Phone is registered to different accounts",
                  showConfirmButton: true,
                  // timer: 1500,
                });
              } else if (!findSimilar.length && findSimilarE.length) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title:
                    "It seems like you've not logged in. Make sure to logged in to post a new job",
                  showConfirmButton: true,
                  // timer: 1500,
                });
              } else if (findSimilar.length && findSimilarE.length) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title:
                    "It seems like you've not logged in. Make sure to logged in to post a new job",
                  showConfirmButton: true,
                  // timer: 1500,
                });
              } else {
                let gender =
                  this.state.loggedInGender !== ""
                    ? this.state.loggedInGender
                    : this.state.male
                    ? "Male"
                    : this.state.female
                    ? "Female"
                    : "";
                this.appendSpreadsheet({
                  Name: this.state.name,
                  Phone: this.state.phone,
                  City: this.state.city,
                  Email: this.state.email,
                  JobCategory: "",
                  JobType: "",
                  Experience: "",
                  Skills: "",
                  Education: "",
                  InterestedIn: "",
                  CurrentSalary: "",
                  Gender: gender,
                  EnglishLevel: "",
                  Achievement: "",
                });
                fullpageApi.moveTo(4, 0);
              }
            }
          } else {
            let gender =
              this.state.loggedInGender !== ""
                ? this.state.loggedInGender
                : this.state.male
                ? "Male"
                : this.state.female
                ? "Female"
                : "";
            this.appendSpreadsheet({
              Name: this.state.name,
              Phone: this.state.phone,
              City: this.state.city,
              Email: this.state.email,
              JobCategory: "",
              JobType: "",
              Experience: "",
              Skills: "",
              Education: "",
              InterestedIn: "",
              CurrentSalary: "",
              Gender: gender,
              EnglishLevel: "",
              Achievement: "",
            });
            fullpageApi.moveTo(4, 0);
          }
        });
      } else {
        const allEmployers = ref(db, `users/jobs_employer`);

        onValue(allEmployers, (snapshot) => {
          if (snapshot.exists()) {
            allEmployersResult = snapshot.val();
            // console.log(allEmployersResult);
            let ObjVal = Object.values(allEmployersResult);
            let findSimilarE = ObjVal.filter(
              (e) => e.Email === this.state.email
            );
            let findSimilar = ObjVal.filter(
              (e) => e.Phone === this.state.phone
            );
            // this.setState({ allUsers: findSimilar });
            console.log(this.state.loginSession);
            if (this.state.loginSession) {
              let gender =
                this.state.loggedInGender !== ""
                  ? this.state.loggedInGender
                  : this.state.male
                  ? "Male"
                  : this.state.female
                  ? "Female"
                  : "";
              this.appendSpreadsheet({
                Name: this.state.name,
                Phone: this.state.phone,
                City: this.state.city,
                Email: this.state.email,
                JobCategory: "",
                JobType: "",
                Experience: "",
                Skills: "",
                Education: "",
                InterestedIn: "",
                CurrentSalary: "",
                Gender: gender,
                EnglishLevel: "",
                Achievement: "",
              });
              fullpageApi.moveTo(4, 0);
            } else {
              if (findSimilar.length && !findSimilarE.length) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Email or Phone is registered to different accounts",
                  showConfirmButton: true,
                  // timer: 1500,
                });
              } else if (!findSimilar.length && findSimilarE.length) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title:
                    "It seems like you've not logged in. Make sure to logged in to post a new job",
                  showConfirmButton: true,
                  // timer: 1500,
                });
              } else if (findSimilar.length && findSimilarE.length) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title:
                    "It seems like you've not logged in. Make sure to logged in to post a new job",
                  showConfirmButton: true,
                  // timer: 1500,
                });
              } else {
                let gender =
                  this.state.loggedInGender !== ""
                    ? this.state.loggedInGender
                    : this.state.male
                    ? "Male"
                    : this.state.female
                    ? "Female"
                    : "";
                this.appendSpreadsheet({
                  Name: this.state.name,
                  Phone: this.state.phone,
                  City: this.state.city,
                  Email: this.state.email,
                  JobCategory: "",
                  JobType: "",
                  Experience: "",
                  Skills: "",
                  Education: "",
                  InterestedIn: "",
                  CurrentSalary: "",
                  Gender: gender,
                  EnglishLevel: "",
                  Achievement: "",
                });
                fullpageApi.moveTo(4, 0);
              }
            }
          } else {
          }
        });
      }
    }
  };

  handleNext2 = (fullpageApi) => {
    if (
      this.state.name === "" ||
      (this.state.employee
        ? !this.state.female && !this.state.male
        : this.state.employer
        ? this.state.company === ""
        : "") ||
      this.state.email === "" ||
      this.state.phone === ""
    ) {
      this.state.name === "" && this.setState({ nameTErr: true });
      this.state.phone === "" && this.setState({ phoneTErr: true });
      this.state.email === "" && this.setState({ emailTErr: true });

      if (this.state.employer) {
        this.state.company === "" && this.setState({ companyTErr: true });
      } else if (this.state.employee) {
        !this.state.male &&
          !this.state.female &&
          this.setState({ radTErr: true });
      }
      fullpageApi.moveTo(3, 0);
    }
    if (
      this.state.selectedJobOption === "" ||
      (!this.state.csr && !this.state.sw) ||
      this.state.experience === "" ||
      this.state.education === "" ||
      this.state.eng_lvl === "" ||
      this.state.city === ""
    ) {
      this.state.selectedJobOption === "" && this.setState({ jobErr: true });
      !this.state.csr && !this.state.sw && this.setState({ jobErr: true });
      this.state.city === "" && this.setState({ cityTErr: true });
      this.state.experience === "" && this.setState({ expTErr: true });
      this.state.education === "" && this.setState({ eduTErr: true });
      this.state.eng_lvl === "" && this.setState({ engTErr: true });
    } else {
      fullpageApi.moveTo(5, 0);
    }
  };

  handleNext4 = (fullpageApi, selectedCategories, salTime) => {
    let salarytime = salTime.toString() || [];
    let interest = selectedCategories.toString() || "";
    if (!this.state.skills.length || interest === "") {
      // console.log(salarytime);

      !this.state.skills.length && this.setState({ skillTErr: true });
      interest === "" && this.setState({ intTErr: true });
    } else if (
      this.state.name === "" ||
      this.state.selectedJobOption === "" ||
      (this.state.employee
        ? !this.state.female && !this.state.male
        : this.state.employer
        ? this.state.company === ""
        : "") ||
      (!this.state.csr && !this.state.sw) ||
      this.state.phone === ""
    ) {
      this.state.name === "" && this.setState({ nameTErr: true });
      this.state.phone === "" && this.setState({ phoneTErr: true });
      this.state.selectedJobOption === "" && this.setState({ jobErr: true });
      !this.state.csr && !this.state.sw && this.setState({ jobErr: true });
      if (this.state.employer) {
        this.state.company === "" && this.setState({ companyTErr: true });
      } else {
        !this.state.male &&
          !this.state.female &&
          this.setState({ radTErr: true });
      }
      fullpageApi.moveTo(3, 0);
    } else if (
      this.state.email === "" ||
      this.state.experience === "" ||
      this.state.education === "" ||
      this.state.eng_lvl === "" ||
      this.state.city === ""
    ) {
      this.state.email === "" && this.setState({ emailTErr: true });
      this.state.city === "" && this.setState({ cityTErr: true });
      this.state.experience === "" && this.setState({ expTErr: true });
      this.state.education === "" && this.setState({ eduTErr: true });
      this.state.eng_lvl === "" && this.setState({ engTErr: true });
      fullpageApi.moveTo(4, 0);
    } else {
      fullpageApi.moveTo(6, 0);
    }
  };
  handleNext3 = async (fullpageApi, selectedCategories, selectedSalTime) => {
    let interest = selectedCategories.toString() || "";
    let salarytime = selectedSalTime.toString() || [];
    if (
      (this.state.employer
        ? !salarytime.length
        : !this.state.achievement.length) ||
      (this.state.employer
        ? this.state.to === "" || this.state.from === ""
        : this.state.value === "0") ||
      (this.state.employer && this.state.jobDesc === "")
    ) {
      this.state.employer &&
        this.state.jobDesc === "" &&
        this.setState({ jobDescTErr: true });
      !salarytime.length && this.setState({ stTErr: true });
      !this.state.achievement.length &&
        this.setState({ achievementTErr: true });
      this.state.employee
        ? this.state.value == 0 && this.setState({ valTErr: true })
        : (this.state.to == 0 || this.state.from == 0) &&
          this.setState({ expSalTErr: true });
    } else if (
      (this.state.name === "" ||
        this.state.selectedJobOption === "" ||
        (this.state.employee
          ? !this.state.female && !this.state.male
          : this.state.employer
          ? this.state.company === ""
          : "") ||
        (!this.state.csr && !this.state.sw) ||
        this.state.phone === "") &&
      (this.state.email === "" ||
        this.state.experience === "" ||
        !this.state.skills.length ||
        this.state.education === "" ||
        this.state.eng_lvl === "" ||
        this.state.city === "")
    ) {
      this.state.name === "" && this.setState({ nameTErr: true });
      this.state.phone === "" && this.setState({ phoneTErr: true });
      this.state.selectedJobOption === "" && this.setState({ jobErr: true });
      !this.state.csr && !this.state.sw && this.setState({ jobErr: true });
      if (this.state.employer) {
        this.state.company === "" && this.setState({ companyTErr: true });
      } else {
        !this.state.male &&
          !this.state.female &&
          this.setState({ radTErr: true });
      }
      !this.state.skills.length && this.setState({ skillTErr: true });
      this.state.email === "" && this.setState({ emailTErr: true });
      this.state.city === "" && this.setState({ cityTErr: true });
      this.state.experience === "" && this.setState({ expTErr: true });
      this.state.education === "" && this.setState({ eduTErr: true });
      this.state.eng_lvl === "" && this.setState({ engTErr: true });

      interest === "" && this.setState({ intTErr: true });
      this.state.value === "0" && this.setState({ valTErr: true });

      fullpageApi.moveTo(3, 0);
    } else if (
      this.state.email === "" ||
      this.state.experience === "" ||
      this.state.education === "" ||
      this.state.eng_lvl === "" ||
      this.state.city === ""
    ) {
      this.state.email === "" && this.setState({ emailTErr: true });
      this.state.city === "" && this.setState({ cityTErr: true });
      this.state.experience === "" && this.setState({ expTErr: true });
      this.state.education === "" && this.setState({ eduTErr: true });
      this.state.eng_lvl === "" && this.setState({ engTErr: true });

      interest === "" && this.setState({ intTErr: true });
      this.state.value === "0" && this.setState({ valTErr: true });

      fullpageApi.moveTo(4, 0);
    } else if (this.state.skills.length === 0 || interest === "") {
      interest === "" && this.setState({ intTErr: true });
      this.state.skills.length === 0 && this.setState({ skillTErr: true });

      fullpageApi.moveTo(5, 0);
    } else {
      let allEmployersResult = {};
      let proceed = false;
      const allEmployers = ref(db, `users/jobs_employer`);

      onValue(allEmployers, (snapshot) => {
        if (snapshot.exists()) {
          allEmployersResult = snapshot.val();
          // console.log(allEmployersResult);
          let ObjVal = Object.values(allEmployersResult);
          let findSimilarE = ObjVal.filter((e) => e.Email === this.state.email);
          let findSimilar = ObjVal.filter((e) => e.Phone === this.state.phone);
          // this.setState({ allUsers: findSimilar });
          // console.log(findSimilar, findSimilarE);
          if (findSimilar.length && !findSimilarE.length) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Email or Phone is registered to different accounts",
              showConfirmButton: true,
              // timer: 1500,
            });
          } else if (!findSimilar.length && findSimilarE.length) {
            Swal.fire({
              position: "center",
              icon: "error",
              title:
                "It seems like you've not logged in. Make sure to logged in to post a new job",
              showConfirmButton: true,
              // timer: 1500,
            });
          } else if (findSimilar.length && findSimilarE.length) {
            if (this.state.loginSession) {
              // this.
              proceed = true;

              // console.log("chal gya");
            } else {
              // console.log("chal gya else");
              Swal.fire({
                position: "center",
                icon: "error",
                title:
                  "It seems like you've not logged in. Make sure to logged in to post a new job",
                showConfirmButton: true,
                // timer: 1500,
              });
            }
          } else {
            // console.log("New user", this.state);
            proceed = true;
          }
        } else {
          // console.log("No data available");
        }
      });
      if (proceed) {
        this.submitHandler(fullpageApi, selectedCategories, selectedSalTime);
        fullpageApi.moveTo(7, 0);
        proceed = false;
      }
    }
  };

  handleSalaryChange(target, value) {
    this.setState({
      [target]: value,
    });
    // }
    // console.log(this.state.from, this.state.to);
    this.state.from === "" || this.state.to === ""
      ? this.setState({ expSalTErr: true })
      : this.setState({ expSalTErr: false });
  }
  handleNoEmp(e) {
    e.moveTo(1, 0);
    $("html, body").animate({ scrollTop: 0 }, "normal");
    // this.setState({ noEmp: true });
  }
  handleNoCategory(e) {
    e.moveTo(2, 0);
    this.setState({ noCategory: true });
  }
  selectChange(e) {
    this.setState({
      selectedJobOption: e,
      jobErr: false,
    });
  }
  back = (fullpageApi) => {
    // this.setState({ part1: true, part2: false });
    fullpageApi.moveTo(3, 0);
  };
  back1 = (fullpageApi) => {
    // this.setState({ part1: true, part2: false });
    fullpageApi.moveTo(5, 0);
  };
  back2 = (fullpageApi) => {
    // this.setState({ part1: true, part2: false });
    fullpageApi.moveTo(4, 0);
  };
  handleCheck = (val) => {
    if (val === "Part-time") {
      if (this.state.parttime) {
        this.setState({ parttime: false });
        const index = this.state.interestedIn.indexOf(val);
        if (index > -1) {
          this.state.interestedIn.splice(index, 1);
        }
      } else {
        this.setState({ parttime: true });
        this.state.interestedIn.push(val);
      }
    }
    if (val === "Full-time") {
      if (this.state.fulltime) {
        this.setState({ fulltime: false });
        const index = this.state.interestedIn.indexOf(val);
        if (index > -1) {
          this.state.interestedIn.splice(index, 1);
        }
      } else {
        this.setState({ fulltime: true });
        this.state.interestedIn.push(val);
      }
    }
    if (val === "Freelance") {
      if (this.state.freelance) {
        this.setState({ freelance: false });
        const index = this.state.interestedIn.indexOf(val);
        if (index > -1) {
          this.state.interestedIn.splice(index, 1);
        }
      } else {
        this.setState({ freelance: true });
        this.state.interestedIn.push(val);
      }
    }
    if (val === "Remote") {
      if (this.state.remote) {
        this.setState({ remote: false });
        const index = this.state.interestedIn.indexOf(val);
        if (index > -1) {
          this.state.interestedIn.splice(index, 1);
        }
      } else {
        this.setState({ remote: true });
        this.state.interestedIn.push(val);
      }
    }
    if (val === "Work from Home") {
      if (this.state.workFromHome) {
        this.setState({ workFromHome: false });
        const index = this.state.interestedIn.indexOf(val);
        if (index > -1) {
          this.state.interestedIn.splice(index, 1);
        }
      } else {
        this.setState({ workFromHome: true });
        this.state.interestedIn.push(val);
      }
    }
    if (val === "Night Shift") {
      if (this.state.nightShift) {
        this.setState({ nightShift: false });
        const index = this.state.interestedIn.indexOf(val);
        if (index > -1) {
          this.state.interestedIn.splice(index, 1);
        }
      } else {
        this.setState({ nightShift: true });
        this.state.interestedIn.push(val);
      }
    }
  };

  handleCSR = () => {
    if (this.state.sw) {
      this.setState({ sw: false });
    }
    this.state.csr
      ? this.setState({ csr: false })
      : this.setState({ csr: true });
    this.setState({ jobErr: false });
  };
  handleMale = () => {
    if (this.state.female) {
      this.setState({ female: false });
    }
    this.state.male
      ? this.setState({ male: false })
      : this.setState({ male: true });
    this.setState({ radTErr: false });
  };
  handleFemale = () => {
    if (this.state.male) {
      this.setState({ male: false });
    }
    this.state.female
      ? this.setState({ female: false })
      : this.setState({ female: true });
    this.setState({ radTErr: false });
  };

  submitHandler = (fullpageApi, selectedCategories, selectedSalTime) => {
    const { nameValid, cityValid, emailValid, phoneValid, companyValid } =
      this.state.errorMessage;
    const { skills, achievement, from, to, loggedInGender } = this.state;
    const formIsValid = nameValid && emailValid && phoneValid;
    const formIsValidEmployer =
      nameValid && emailValid && phoneValid && companyValid;
    // console.log(nameValid, emailValid, phoneValid, companyValid);
    let gender = "";
    if (loggedInGender !== "") {
      gender = loggedInGender;
    } else {
      gender = this.state.male ? "Male" : this.state.female ? "Female" : "";
    }

    let interest = selectedCategories.toString() || "";
    let SalaryTime = selectedSalTime.toString() || "";
    let skillSet = skills.toString() || "";
    let achievementStr = achievement.toString() || "";
    var exp_sal = (this.state.employer && from + "-" + to) || "";
    if (this.state.employee) {
      if (!formIsValid) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid input fields 1",
          showConfirmButton: true,
          // timer: 1500,
        });
        return;
      }
    } else {
      if (!formIsValidEmployer) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid input fields 2",
          showConfirmButton: true,
          // timer: 1500,
        });
        return;
      }
    }
    if (
      this.state.name === "" ||
      this.state.phone === "" ||
      this.state.city === "" ||
      this.state.email === "" ||
      skillSet === "" ||
      this.state.JobCategory === "" ||
      this.state.experience === "" ||
      this.state.education === "" ||
      (this.state.employee && this.state.value === "0") ||
      this.state.eng_lvl === "" ||
      this.state.selectedJobOption === "" ||
      (this.state.employee ? gender === "" : this.state.company === "") ||
      (this.state.employee ? achievementStr === "" : exp_sal === "-") ||
      (this.state.employee ? interest === "" : SalaryTime === "") ||
      (this.state.employer && this.state.jobDesc === "")
    ) {
      interest === "" && this.setState({ intTErr: true });
      exp_sal === "" && this.setState({ expSTErr: true });
      this.state.value === "0" && this.setState({ valTErr: true });
      // console.log(gender);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid input fields 3",
        showConfirmButton: true,
        timer: 1000,
      });
    } else {
      if (this.state.value === "490000 - 530000") {
        this.setState({ value: "300000+" });
      }
      if (this.state.value === "0") {
        this.setState({ value: "0" });
      }
      this.setState({ isSubmit: true });
      const showLoading = function () {
        Swal.fire({
          title: "Just a Sec...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          // timer: 1000,
          showConfirmButton: false,
        });
      };
      setTimeout(() => {
        if (this.state.isSubmit) {
          showLoading();
        }
        if (this.state.employer) {
          // console.log(this.state);

          this.emp_appendSpreadsheet({
            BusinessName: this.state.company,
            Name: this.state.name,
            Phone: this.state.phone,
            City: this.state.city,
            Email: this.state.email,
            JobCategory: this.state.JobCategory,
            JobType: this.state.selectedJobOption,
            JobDescription: this.state.jobDesc,
            Experience: this.state.experience,
            Skills: skillSet,
            Education: this.state.education,
            InterestedIn: interest,
            ExpectedSalary: exp_sal,
            EnglishLevel: this.state.eng_lvl,
            JobTime: SalaryTime,
          }).then(async () => {
            let uid =
              this.state.uId !== ""
                ? this.state.uId
                : push(child(ref(db), `users/jobs_employer/`)).key;
            // let uid = this.state.phone;

            await update(ref(db, `users/jobs_employer/${uid}/`), {
              BusinessName: this.state.company,
              Name: this.state.name,
              Phone: this.state.phone,
              City: this.state.city,
              Email: this.state.email,
              uid: uid,
            }).then(async () => {
              const key = push(
                child(ref(db), `users/jobs_employer/${uid}/jobs`)
              ).key;
              // this.state.experience + this.state.selectedJobOption;
              await update(ref(db, `users/jobs_employer/${uid}/jobs/${key}`), {
                JobCategory: this.state.JobCategory,
                City: this.state.city,
                JobType: this.state.selectedJobOption,
                JobDescription: this.state.jobDesc,
                Experience: this.state.experience,
                Skills: skillSet,
                Education: this.state.education,
                InterestedIn: interest,
                ExpectedSalary: exp_sal,
                EnglishLevel: this.state.eng_lvl,
                JobTime: SalaryTime,
                key: key,
              }).then(async () => {
                let alltimeJobDB = 0;
                const all_time_rec = ref(db, `users/jobs_employer/${uid}`);
                onValue(all_time_rec, async (snapshot) => {
                  if (snapshot.exists()) {
                    let alltimeDB = snapshot.val();
                    alltimeJobDB =
                      alltimeDB?.all_time_stats !== undefined
                        ? alltimeDB.all_time_stats.all_time_jobs !== undefined
                          ? alltimeDB.all_time_stats.all_time_jobs
                          : 0
                        : 0;
                    // console.log(alltimeDB);
                  } else {
                    // console.log("No Data");
                  }
                });
                alltimeJobDB++;
                // console.log("if", alltimeJobDB);
                await update(
                  ref(db, `users/jobs_employer/${uid}/all_time_stats`),
                  { all_time_jobs: alltimeJobDB }
                );
              });
            });
            this.setState({ isSubmit: false });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Awesome, you have been added!",
              showConfirmButton: false,
              timer: 1500,
            });
            this.setState({ submitionSuccess: true });
            this.clearForm(selectedCategories);
          });
        } else {
          this.updateSpreadsheet(
            {
              Name: this.state.name,
              Phone: this.state.phone,
              City: this.state.city,
              Email: this.state.email,
              JobCategory: this.state.JobCategory,
              JobType: this.state.selectedJobOption,
              Experience: this.state.experience,
              Skills: skillSet,
              Education: this.state.education,
              InterestedIn: interest,
              CurrentSalary: this.state.value,
              Gender: gender,
              EnglishLevel: this.state.eng_lvl,
              Achievement: achievementStr,
            },
            selectedCategories,
            selectedSalTime
          ).then(() => {
            let uid =
              this.state.uId !== ""
                ? this.state.uId
                : push(child(ref(db), `users/jobs_employer/`)).key;
            // let uid = this.state.phone;
            update(ref(db, "users/jobs_employer/" + uid), {
              Name: this.state.name,
              Phone: this.state.phone,
              City: this.state.city,
              Email: this.state.email,
              JobCategory: this.state.JobCategory,
              Experience: this.state.experience,
              Skills: skillSet,
              Education: this.state.education,
              InterestedIn: interest,
              CurrentSalary: this.state.value,
              Gender: gender,
              EnglishLevel: this.state.eng_lvl,
              JobType: this.state.selectedJobOption,
              Achievement: achievementStr,
              uid: uid,
            });
            this.setState({ isSubmit: false });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Awesome, you have been added!",
              showConfirmButton: false,
              timer: 1500,
            });
            this.setState({ submitionSuccess: true });
            this.clearForm(selectedCategories);
          });
        }
      }, 100);
    }
  };
  toUpperCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  handleSkillAdd = (item) => {
    let { defSkills } = this.state;
    if (this.state.skills.length === 10) {
      alert("You can add max 10 skills");
    } else {
      let strItem = item.toString();
      let strItemUp = strItem.charAt(0).toUpperCase() + strItem.slice(1);
      if (defSkills.includes(strItemUp)) {
        this.state.skills.push(strItemUp);
        this.setState({ defSkills: this.state.defSkills });
      } else {
        this.state.skills.push(strItemUp);
        this.state.defSkills.push(strItemUp);
        this.setState({ defSkills: this.state.defSkills });
        this.state.skills.length && this.setState({ skillTErr: false });
      }
    }
  };
  handleSkillDefault = (e) => {
    const index = this.state.skills.indexOf(e);
    index > -1
      ? this.state.skills.splice(index, 1)
      : this.state.skills.length === 10
      ? alert("You can add max 10 skills")
      : this.state.skills.push(e);

    this.state.skills.length && this.setState({ skillTErr: false });
    this.setState({ defSkills: this.state.defSkills });
  };
  handleAchievementAdd = (item) => {
    let { achievement } = this.state;

    this.setState({ achievement: item, achievementLen: item.length });
    achievement.length && this.setState({ achievementTErr: false });
  };
  _handleChange = (checkValidation, validationCheck, stateKey, value) => {
    const { error, isValid } = checkValidation(value);
    // console.log(value);
    if (stateKey === "phone") {
      // let formatted = value.replace(/(\d{4,4})/, "$1-");
      // let formatted = `${value.slice(0, 4)} ${value.slice(4, 10)}`;
      // const formatted = this.formatPhoneNumber(value);
      this.setState({
        [stateKey]: value,
        errorMessage: {
          ...this.state.errorMessage,
          [stateKey]: "",
          [validationCheck]: true,
        },
      });
      setTimeout(
        () => this.state.phone !== " " && this.setState({ phoneTErr: false }),
        10
      );
    }
    if (isValid) {
      if (stateKey === "name") {
        let result = this.toUpperCase(value);
        this.setState({
          [stateKey]: result,
          errorMessage: {
            ...this.state.errorMessage,
            [stateKey]: "",
            [validationCheck]: true,
          },
        });
        setTimeout(
          () => this.state.name !== "" && this.setState({ nameTErr: false }),
          10
        );
        this.setState({ company: this.state.company });
      } else {
        setTimeout(() => {
          this.setState({
            [stateKey]: value,
            errorMessage: {
              ...this.state.errorMessage,
              [stateKey]: "",
              [validationCheck]: true,
            },
          });
          this.state.employer &&
            this.state.company !== "" &&
            this.setState({ companyTErr: false });
          this.state.jobDesc !== "" && this.setState({ jobDescTErr: false });
        }, 10);
        setTimeout(() => {
          this.state.city !== "" && this.setState({ cityTErr: false });
          this.state.email !== "" && this.setState({ emailTErr: false });
        }, 10);
      }
    } else {
      this.setState({
        errorMessage: {
          ...this.state.errorMessage,
          [stateKey]: error,
          [validationCheck]: false,
        },
      });

      this.state.errorMessage.email === "Please enter a valid Email" &&
        this.setState({ emailTErr: true });
    }
    if (stateKey === "jobDesc") {
      this.setState({ achievementLen: value.length });
    }
  };
  clearForm = (selectedCategories) => {
    selectedCategories = [];
    document.getElementById("company").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    // document.getElementById("city").value = "Karachi";
    document.getElementById("select").value = "";
    this.setState({
      company: "",
      name: "",
      phone: "",
      // email: "",
      city: "Karachi",
      value: "0",
      range_cond: 0,
      csr: false,
      sw: false,
      experience: "",
      education: "",
      eng_lvl: "",
      male: false,
      female: false,
      selected: [],
      achievement: [],
      skills: [],
      selectedJobOption: "",
    });
  };

  updateSpreadsheet = async (row, selectedCategories, selectedSalTime) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      // const result = await sheet.addRow(row);

      const result = (await sheet.getRows()).filter((v) => {
        return v.Email === row.Email;
      });
      // console.log(result);
      const { skills, achievement, from, to } = this.state;
      let gender = this.state.male ? "Male" : this.state.female ? "Female" : "";
      let interest = selectedCategories.toString() || "";
      let SalaryTime = selectedSalTime.toString() || "";
      let skillSet = skills.toString() || "";
      let achievementStr = achievement.toString() || "";
      var exp_sal = (this.state.employer && from + "-" + to) || "";

      if (result.length) {
        let res1 = result.filter((e) => {
          return (
            e.Skills === skillSet &&
            e.CurrentSalary === this.state.value &&
            e.JobType === this.state.selectedJobOption
          );
        });
        let res2 = result.filter((e) => {
          return e.Skills === "";
        });
        // console.log("running", res2);
        if (res1.length) {
          res1.forEach((v) => {
            v.Name = this.state.name;
            v.Phone = this.state.phone;
            v.City = this.state.city;
            v.Email = this.state.email;
            v.JobCategory = this.state.JobCategory;
            v.JobType = this.state.selectedJobOption;
            v.Experience = this.state.experience;
            v.Skills = skillSet;
            v.Education = this.state.education;
            v.InterestedIn = interest;
            v.CurrentSalary = this.state.value;
            v.Gender = gender;
            v.EnglishLevel = this.state.eng_lvl;
            v.Achievement = achievementStr;
            v.save();
          });
        } else {
          if (res2.length) {
            res2.forEach((v) => {
              v.Name = this.state.name;
              v.Phone = this.state.phone;
              v.City = this.state.city;
              v.Email = this.state.email;
              v.JobCategory = this.state.JobCategory;
              v.JobType = this.state.selectedJobOption;
              v.Experience = this.state.experience;
              v.Skills = skillSet;
              v.Education = this.state.education;
              v.InterestedIn = interest;
              v.CurrentSalary = this.state.value;
              v.Gender = gender;
              v.EnglishLevel = this.state.eng_lvl;
              v.Achievement = achievementStr;
              v.save();
            });
          } else {
            this.appendNewSpreadsheet({
              Name: this.state.name,
              Phone: this.state.phone,
              City: this.state.city,
              Email: this.state.email,
              JobCategory: this.state.JobCategory,
              JobType: this.state.selectedJobOption,
              Experience: this.state.experience,
              Skills: skillSet,
              Education: this.state.education,
              InterestedIn: interest,
              CurrentSalary: this.state.value,
              Gender: gender,
              EnglishLevel: this.state.eng_lvl,
              Achievement: achievementStr,
            });
          }
        }
      } else {
        this.appendSpreadsheet({
          Name: this.state.name,
          Phone: this.state.phone,
          City: this.state.city,
          Email: this.state.email,
          JobCategory: this.state.JobCategory,
          JobType: this.state.selectedJobOption,
          Experience: this.state.experience,
          Skills: skillSet,
          Education: this.state.education,
          InterestedIn: interest,
          CurrentSalary: this.state.value,
          Gender: gender,
          EnglishLevel: this.state.eng_lvl,
          Achievement: achievementStr,
        });
      }
    } catch (e) {
      // console.error("Error: ", e);
    }
  };

  appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      // console.log("else running", row);
      const check = (await sheet.getRows()).filter((v) => {
        return v.Email === row.Email;
      });
      if (!check.length) {
        const result = await sheet.addRow(row);
      }
    } catch (e) {
      // console.error("Error: ", e);
    }
  };
  appendNewSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const result = await sheet.addRow(row);
    } catch (e) {
      // console.error("Error: ", e);
    }
  };
  emp_appendSpreadsheet = async (row) => {
    try {
      await emp_doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await emp_doc.loadInfo();

      const sheet = emp_doc.sheetsById[SHEET_ID_EMP];
      const result = await sheet.addRow(row);
    } catch (e) {
      // console.error("Error: ", e);
    }
  };
  readRows = async () => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const rows = (await sheet.getRows()).length + 1;

      // this.setState({ count: rows }, () => {
      //   document.querySelector(".value").innerText = this.state.count;
      // });
    } catch (e) {}
  };
  emp_readRows = async () => {
    try {
      await emp_doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await emp_doc.loadInfo();

      const sheet = emp_doc.sheetsById[SHEET_ID];
      const rows = (await sheet.getRows()).length + 1;

      // this.setState({ count: rows }, () => {
      //   document.querySelector(".value").innerText = this.state.count;
      // });
    } catch (e) {}
  };

  async componentDidMount() {
    await checkUserSession(this);
    this.readRows();
    this.emp_readRows();

    // this.counterFn();
  }

  onLongPress = (item) => {
    this.state.selected.push(item);
    this.setState({ selectingActive: true, active: item });
  };
  onSelect = (item, ele) => {
    const { selected } = this.state;
    let index = selected.indexOf(item);
    let newList = [...selected];
    if (item === 0 && selected.includes(1)) {
      ele.target.classList.remove("quadrat");
      setTimeout(() => {
        ele.target.classList.add("quadrat");
      }, 0);
    } else if (item === 1 && selected.includes(0)) {
      ele.target.classList.remove("quadrat");
      setTimeout(() => {
        ele.target.classList.add("quadrat");
      }, 0);
    } else if (item === 1 && selected.includes(2)) {
      ele.target.classList.remove("quadrat");
      setTimeout(() => {
        ele.target.classList.add("quadrat");
      }, 0);
    } else if (item === 0 && selected.includes(2)) {
      ele.target.classList.remove("quadrat");
      setTimeout(() => {
        ele.target.classList.add("quadrat");
      }, 0);
    } else if (item === 2 && selected.includes(0)) {
      ele.target.classList.remove("quadrat");
      setTimeout(() => {
        ele.target.classList.add("quadrat");
      }, 0);
    } else if (item === 2 && selected.includes(1)) {
      ele.target.classList.remove("quadrat");
      setTimeout(() => {
        ele.target.classList.add("quadrat");
      }, 0);
    } else if (index > -1) {
      newList.splice(index, 1);
    } else {
      newList.push(item);
      this.setState({ intTErr: false });
    }
    // console.log(ele);
    this.setState({
      selected: newList,
      active: item,
    });
  };
  onSelectSalary = (item) => {
    const { selectedSal } = this.state;
    let index = selectedSal.indexOf(item);
    let newList = [];
    if (index > -1) {
      newList.splice(index, 1);
    } else {
      newList.push(item);
      this.setState({ stTErr: false });
    }
    this.setState({
      selectedSal: newList,
      activeSal: item,
      to: item === 2 ? "-" : "",
    });
  };
  handleChange = (e) => {
    this.setState({ valTErr: false });
    this.setState({ range_cond: e });
    if (this.state.range_cond < 100000) {
      let val = `${e - 10000} - ${e}`;
      this.setState({ value: val });
    }
    // else if (this.state.range_cond === 310000) {
    //   let val = "300000+";
    //   this.setState({ value: val });
    // }
    else if (this.state.range_cond < 310000) {
      let val = `${e - 20000} - ${e}`;
      this.setState({ value: val });
    } else {
      let val = `${e - 40000} - ${e}`;
      this.setState({ value: val });
    }
    // let fort = e.toString();
    // let formatted = fort.replace(/,/g, "-");
    // this.setState({ range_cond: e, value: formatted });
  };
  handleSW = () => {
    if (this.state.csr) {
      this.setState({ csr: false });
    }
    if (this.state.dm) {
      this.setState({ dm: false });
    }
    if (this.state.gd) {
      this.setState({ gd: false });
    }
    this.state.sw
      ? this.setState({ sw: false, JobCategory: "" })
      : this.setState({ sw: true });
    this.setState({ jobErr: false });
  };
  handleDM = () => {
    if (this.state.csr) {
      this.setState({ csr: false });
    }
    if (this.state.sw) {
      this.setState({ sw: false });
    }
    if (this.state.gd) {
      this.setState({ gd: false });
    }
    this.state.dm
      ? this.setState({ dm: false, JobCategory: "" })
      : this.setState({ dm: true });
    this.setState({ jobErr: false });
  };
  handleGD = () => {
    if (this.state.csr) {
      this.setState({ csr: false });
    }
    if (this.state.sw) {
      this.setState({ sw: false });
    }
    if (this.state.dm) {
      this.setState({ dm: false });
    }
    this.state.gd
      ? this.setState({ JobCategory: "", gd: false })
      : this.setState({ gd: true });
    this.setState({ jobErr: false });
  };
  toggleOpen = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }));
  };
  onSelectChange = (value) => {
    this.toggleOpen();
    this.setState({ select_value: value });
  };
  handleLoginChangeBtn = () => {
    window.open("/portal", "_blank");
  };
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

    let {
      company,
      name,
      city,
      email,
      phone,
      error,
      selected,
      selectedSal,
      job_options,
      defSkills,
    } = this.state;

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

    // console.log("data => ", this.state);

    return (
      <ReactFullpage
        scrollOverflow={true}
        // sectionsColor={["#fff"]}
        sectionsColor={["#FF9772"]}
        onLeave={this.onLeave.bind(this)}
        afterLoad={this.afterLoad.bind(this)}
        responsiveWidth={2500}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage" style={{ height: "100%" }}>
              <span id="circle" class="circle"></span>
              <div className="section section1">
                <div className="header">
                  <div className="top">
                    <div className="logo">
                      <img src={Logo} className="header-logo" />
                    </div>
                    <div className="wait-btn-main-div goto_portal_btn">
                      <div
                        className="wait-button wait-btn "
                        onClick={() => this.handleLoginChangeBtn()}
                      >
                        Portal
                      </div>
                      {/* <a href="/waitList" className="wait-btn">
                        Join the waitlist
                      </a> */}
                    </div>
                  </div>
                  <div className="center_bottom_mix">
                    <div className="center">
                      <h1>
                        Building Pakistan’s{" "}
                        <h1 className="italic">supercommunity</h1> of
                        professionals
                      </h1>
                      <div className="wait-btn-main-div">
                        <div
                          className="wait-button wait-btn"
                          onClick={() =>
                            this.handleModeChange("Employee", fullpageApi)
                          }
                          style={
                            this.state.wantedCategorySelectionErr
                              ? { border: "2px solid red" }
                              : this.state.wantedCategorySelection &&
                                this.state.employee
                              ? { backgroundColor: "#ffe26f" }
                              : {}
                          }
                        >
                          I want to work
                        </div>
                        <div
                          className="wait-button wait-btn"
                          onClick={() =>
                            this.handleModeChange("Employer", fullpageApi)
                          }
                          style={
                            this.state.wantedCategorySelectionErr
                              ? { border: "2px solid red" }
                              : this.state.wantedCategorySelection &&
                                this.state.employer
                              ? { backgroundColor: "#ffe26f" }
                              : {}
                          }
                        >
                          I want to hire
                        </div>
                        {/* <a href="/waitList" className="wait-btn">
                        Join the waitlist
                      </a> */}
                      </div>
                    </div>
                    <div className="bottom">
                      <img src={Vector1} className="header-vector" />
                    </div>
                  </div>
                </div>
              </div>

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
                          >
                            {i == 0 ? (
                              <div className="animated-div">
                                {" "}
                                <h1 className="animated-h1">
                                  {item.tittle}{" "}
                                  <TextTransition
                                    text={
                                      animatedStrings[
                                        this.state.index %
                                          animatedStrings.length
                                      ]
                                    }
                                    springConfig={presets.molasses}
                                    inline={true}
                                    className="animated-text"
                                  />{" "}
                                  at <br /> Worktown
                                </h1>
                              </div>
                            ) : i === 1 ? (
                              <div></div>
                            ) : (
                              <h1></h1>
                            )}
                            <br />
                          </div>
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
                            {i == 0 ? (
                              <div className="animated-div">
                                {" "}
                                <h1 style={{ width: "100%" }}>
                                  {item.tittle}{" "}
                                  <TextTransition
                                    text={
                                      animatedStrings[
                                        this.state.index %
                                          animatedStrings.length
                                      ]
                                    }
                                    springConfig={presets.molasses}
                                    inline={true}
                                    className="animated-text"
                                  />{" "}
                                  at <br /> Worktown
                                </h1>
                              </div>
                            ) : (
                              <h1
                                style={
                                  i === 1
                                    ? {
                                        display: "none",
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
                            )}
                            <br />
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
                          <div></div>
                        )}
                      </div>
                      <div
                        className={
                          i <= 4 && i % 2 === 0
                            ? "vector-div2"
                            : // : i > 4
                              // ? "vector-div"
                              "vector-div1"
                        }
                        style={
                          i % 2 == 0
                            ? { justifyContent: "flex-end" }
                            : { justifyContent: "flex-start" }
                        }
                      >
                        {i >= 0 && i <= 4 ? (
                          // <Lottie
                          //   options={item.lottieAnimation}
                          //   height={"100%"}
                          //   width={"100%"}
                          //   />

                          <img
                            src={item.vector}
                            style={{ width: "100%", height: "100%" }}
                          />
                        ) : i === 5 ? (
                          <div className="section">
                            <div className="last-section">
                              <div className="last-vector">
                                <h1>
                                  It takes a town to make great things happen
                                </h1>
                                <img
                                  src={Vector9}
                                  className="last-vector-image"
                                />
                                <div
                                  onClick={() =>
                                    $("html, body").animate(
                                      { scrollTop: 0 },
                                      "normal"
                                    )
                                  }
                                  className="top-btn up "
                                >
                                  <img
                                    src={ArrowIcon}
                                    onClick={() =>
                                      $("html, body").animate(
                                        { scrollTop: 0 },
                                        "normal"
                                      )
                                    }
                                    style={{ height: "55px", width: "60px" }}
                                  />
                                </div>
                              </div>

                              <div className="last-line">
                                <div className="logo">
                                  <img src={Logo} className="simple-logo" />
                                  <p className="last-text">
                                    Copyright © 2022. All rights reserved.
                                  </p>
                                </div>

                                <div className="wait-btn-main-div"></div>
                              </div>
                            </div>
                          </div>
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
