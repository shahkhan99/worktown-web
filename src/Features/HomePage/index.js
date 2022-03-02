import React from "react";
import ReactDOM from "react-dom";
import "rc-slider/assets/index.css";
import { getDatabase } from "firebase/database";
import { set, ref } from "@firebase/database";
import firebase from "../../config/firebase";
import ReactFullpage from "@fullpage/react-fullpage";
import Form1 from "./form1";
import Form2 from "./form2";
import Form3 from "./form3";
import Form4 from "./form4";
import Form5 from "./form5";
import Swal from "sweetalert2";
import { GoogleSpreadsheet } from "google-spreadsheet";
import "./homeStyles.css";
import Logo from "../../assets/Logo/logo.png";
import Vector1 from "../../assets/Vectors/vector1.png";
import Vector9 from "../../assets/Vectors/vector9.png";
import ArrowIcon from "../../assets/icons/up-arrow.png";
import programmer from "../../assets/icons/sd.png";
import operator from "../../assets/icons/cc.png";
import right from "../../assets/images/right.png";
import TextTransition, { presets } from "react-text-transition";
import Lottie from "react-lottie";
import RoomGif from "../../assets/Vectors/room.gif";
import office from "../../assets/Vectors/office.gif";
import cafegif from "../../assets/Vectors/cafe.gif";
import dhaba from "../../assets/Vectors/dhaba.gif";
import roadgif from "../../assets/Vectors/road.gif";
// import Cafegif from "../../assets/Vectors/cafe1.mp4";
// import Cafe from "../../assets/Vectors/Cafe.mp4";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.
import $ from "jquery";

import {
  dhabaOptions,
  cafeOptions,
  roadOptions,
  roomOptions,
  officeOptions,
} from "./animationOptions";
const db = getDatabase();
const SPREADSHEET_ID = "1tJUmkVph10mUleXZmVAlwIta2DwBeCJClYaGagUpxzA";
const EMPLOYER_SPREADSHEET_ID = "1tJUmkVph10mUleXZmVAlwIta2DwBeCJClYaGagUpxzA";
// const EMPLOYER_SPREADSHEET_ID = "1and-JbqoUr_L1vAX720OLx4P851w_rpIBCxuTqlspEw";
const SHEET_ID = "0";
const SHEET_ID_EMP = "645772619";
const CLIENT_EMAIL =
  "work-hall@academy-registra-1605173971230.iam.gserviceaccount.com";
const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEHOlVYVGJOeB+\ntTj0W505Wntj4CxLpFxEWgBPhjZLL5y+qmcSbvzotqTm+U7Gsdbwb6VdtfO9lVVI\n1YdBkL8DfWOJfkGoOiyrKJH4Td7xgJ441cLF2dQ7VtxRSAlJjqwJ4+oeOakpxET0\nHhEu0KkrozOX73QOD65ycyQAnxGOMOgh6XQpayfYzh5svBiAfDmLa5+sLMSscgiw\nfGAiAOehRtF7zTpXbOp474NWIZKfkM081gS+/D0znj50XSkKFHmtC9o7bK5YXlfI\ntjy3vt41BQsyHiSoZ8HEp/nVUbHVTUA+yUAmqnNRrHFETZYSrMD67aal2Ivk4LHM\nKzN5TmUJAgMBAAECggEACOPiTFF3qQUeO8LlhKb04Gaikn3qfCOvXsDcDpQquMCn\n4M59ktdvBcdRKpBRhXkxNsqU4EPmkKj+Sf7gsrSdWCA9HNHup4c67ae5QEdFbJoU\nR3F3SCajs+ya2wttMlqySqt8j5IKbLSInK69QCug3kkicQg08Qs9xlNDu0x6twDv\ntSL1eAYRGtGHSHulELh5ZRsNzlsWwCiKTuU8/5XeT9K9vJXNu7J02KA5W46VDWOF\nUTK9GdbukE7g5xiCvi2jHpCWC9ZxqdCzd46/DJ5pwY4slJra1IFfhozmzQl6Lcso\noRF94XV93zJgK3QVwSzfjk2ugxXGnDG3B+wrb4a/NQKBgQDvTJnebjWYWm3ejb24\nImblIkpr0YzB8pvWSTWZDUaRWqUIt04dhC6tRa+b6MEeaI/jFiBBkO1MhG22HXDm\n/gnQJ8kU+ppk14kubSzFkLtoVe9069LfcLn1kp/pP7KoHSTO0OToZWT2vbuqb4Ra\njVP5noJ1VOxZ7pv26Dd7H32+NQKBgQDRzLrc7f7TPUOYyftdEZzFD+nh9zLypC7s\nv655+aWADvK0srMAdhQTyf7l+VztDflK4qr3LuN0cb3ufNDbHAPFkpW79fLouHzf\nLDnxrnlUFOcWWPSC4/LQ63VcbOWc8adXHv5+APYKEKQl+A6wJjoiD1PZgj5noiAe\nH5XD8CC2BQKBgQDLLwFfCbjcGbw8QaGbHSq813bVQWIAs9x6AENQJyOJ+6sxUWM0\nUK3JVegbu29uQF4b9QeCZGn4lGELRsg8eesfIQjtlTNO+Gt0TiK7xX46wuzFHA86\nxV5AEzVQOVOaxtQf/uK+KImnr8YOmw2ITYPF6T7gHTFp0t3+sYGaO0zrGQKBgFHy\n1T6829+pO4EvzDaTTZgP2jyAcW8jwIyLZtyQLhwyOo1oi9DvTnJYYW91Et4pqimd\nFkjNEN2IHDdOm8oqTDLdSg2MSWCrx2LpBI0pqIy2SXmKL5/85/jBMCt1Ac9m+QVn\nvuJ6/5/41hVaqmoV1Hk/YXJBlJyoUEFT9wz8+9n9AoGBAKlkyHx+WACxWOMr97fN\na+Ls03kugkvJb+PUVu0rMsNKB/i3dTPpz1mqqU7LntMShsd0h+ZoGnBwf6sk2agG\nxs02uEnWkRlmvlWBFOFtahH6bJqG3Kh9pzwN16Rzr/qIgd9bfXlETx6D3SGO3SMR\n84+jm0xK/gLtdy+jE9ViDy8O\n-----END PRIVATE KEY-----\n";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
const emp_doc = new GoogleSpreadsheet(EMPLOYER_SPREADSHEET_ID);

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wantedCategorySelection: false,
      skillTag: [],
      employee: true,
      employer: false,
      index: 0,
      sw: false,
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
      city: "Karachi",
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
        "Aws",
        "Php",
        "Android",
        "Objective C",
      ],
      Saltimings: ["Hourly", "Monthly", "Fixed"],
      timings: [
        "Full Time",
        "Part Time",
        "Freelance",
        "Work From Home",
        "Remote",
        "Night Shift",
      ],
      skills: [],
      achievement: [],
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
      animatedStrings: [
        " client ",
        " job ",
        " cofounder ",
        " employee ",
        " employer ",
        " investor ",
        " colleague ",
      ],
      job_options: [
        { value: "Applications Engineer", label: "Applications Engineer" },
        { value: "Back-end Engineer", label: "Back-end Engineer" },
        { value: "Cloud Systems Engineer", label: "Cloud Systems Engineer" },
        { value: "Computer  scientist", label: "Computer  scientist" },
        {
          value: "Computer Systems Analyst",
          label: "Computer Systems Analyst",
        },
        { value: "CRM project manager ", label: "CRM project manager " },
        { value: "Data Analyst", label: "Data Analyst" },
        { value: "Data scientist", label: "Data scientist" },
        { value: "DevOps Engineer", label: "DevOps Engineer" },
        { value: "Database Administrator", label: "Database Administrator" },
        { value: "Data Quality Manager", label: "Data Quality Manager" },
        { value: "Front-end Engineer", label: "Front-end Engineer" },
        { value: "Full-stack Engineer", label: "Full-stack Engineer" },
        { value: "Game Developer", label: "Game Developer" },
        { value: "Hardware", label: "Hardware" },
        { value: "Help Desk Technician", label: "Help Desk Technician" },
        { value: "IT Coordinator", label: "IT Coordinator" },
        { value: "IT Consultant", label: "IT Consultant" },
        { value: "IT Security", label: "IT Security" },
        {
          value: "Management Information Systems Director",
          label: "Management Information Systems Director",
        },
        { value: "Mobile App Developer", label: "Mobile App Developer" },
        { value: "Network Engineer", label: "Network Engineer" },
        {
          value: "Quality Assurance Engineer",
          label: "Quality Assurance Engineer",
        },
        { value: "Security Engineer", label: "Security Engineer" },
        { value: "Software Analyst", label: "Software Analyst" },
        { value: "Software Engineer", label: "Software Engineer" },
        {
          value: "Software integration Engineer",
          label: "Software integration Engineer",
        },
        { value: "Technical Support", label: "Technical Support" },
        {
          value: "User Interface/User Experience Designer",
          label: "User Interface/User Experience Designer",
        },
        { value: "Video Game Developer", label: "Video Game Developer" },
        { value: "Web Administrator", label: "Web Administrator" },
        { value: "Web Developer", label: "Web Developer" },
        { value: "3D Graphics Developer", label: "3D Graphics Developer" },
      ],
      content: [
        {
          id: 1,
          tittle: "Land your first",
          body: "We can’t promise that you will immediately, but if you stick around, you’ll see and meet remarkable people who aren’t any different from you.",
          vector: office,
          // colorCode: "#3D459D",
          colorCode: "#fff",
          lottieAnimation: officeOptions,
        },
        {
          id: 2,
          tittle: "Community-first ",
          unstyled: " from the ground up",
          body: "We’re creating a super community of storytellers, founders, dreamers, forward-thinkers, misfits, rebels, entrepreneurs, graduates, employees, investors, polyworkers, problem solvers, yay-sayers, coders, designers, freelancers, stargazers and storm-chasers.",
          vector: cafegif,
          // colorCode: "#F0BD3A",
          colorCode: "#fff",
          lottieAnimation: cafeOptions,
        },
        {
          id: 3,
          tittle: "A not-so-professional network",
          body: "Professional networks are decades old and feel out-of-place. Worktown wants to make it exciting and relevant. And we think everyone’s smart enough to know what works for them.",
          vector: roadgif,
          colorCode: "#fff",
          lottieAnimation: roadOptions,
        },
        {
          id: 4,
          tittle: "Where you’re not defined by your job title",
          body: "That is a super-narrow expression of who you are. With Worktown, let the world know how much more you bring to the table than the arbitrary job titles and descriptions that don't fit your work.",
          vector: dhaba,
          // colorCode: "#F15925",
          colorCode: "#fff",
          lottieAnimation: dhabaOptions,
        },
        {
          id: 5,
          // tittle: "Why limit the way people see you?",
          // body: "Resumes are two-dimensional – they don’t talk much about who you are and how you’ve had to work your socks off to get to where you are. Worktown helps you show them what makes you ‘you’.",
          vector: RoomGif,
          colorCode: "#fff",
          lottieAnimation: roomOptions,
        },
        {
          id: 6,
          tittle: "Showcase the real ‘you’",
          body: "Stay true to who you are. Be authentic. Live on your own terms because we’re not destined for a single-track identity. Ever stopped to wonder that you do more than one type of work?",
          vector: Vector1,
          colorCode: "#CC2F42",
        },
        {
          id: 4,
          tittle: "Fall in love with work all over again",
          body: "The work we do is an extension of ourselves and the people around us. Let us help you make a difference because the world needs to know who you are and what you can do.",
          vector: Vector1,
          colorCode: "#204751",
        },
      ],
      card: [
        {
          id: 0,
          img: programmer,
          name: "Software & IT Jobs",
        },
        {
          id: 1,
          img: operator,
          name: "Telecaller & Call Center Jobs",
        },
      ],
      isStopped: false,
      isPaused: false,
      isOpen: false,
      select_value: undefined,
    };
  }
  handleModeChange(mode, fullpage) {
    this.setState({
      wantedCategorySelectionErr: false,
      wantedCategorySelection: true,
    });
    mode === "Employer"
      ? this.setState({ employee: false, employer: true })
      : this.setState({ employer: false, employee: true });
    fullpage.moveTo(2, 0);
  }
  onLeave(origin, destination, direction) {
    console.log("Leaving section " + origin.index);
    if (origin.index == 1) {
      clearInterval(this.intervalId);
    }
  }
  afterLoad(origin, destination, direction) {
    console.log("After load: " + destination.index);
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
    console.log(value.target.value);
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
      if (val.name === "Software & IT Jobs") {
        this.handleSW();
        this.setState({ noCategory: false });
      } else {
        this.handleCSR();
      }
      this.setState({ JobCategory: val.name });
      fullpageApi.moveTo(3, 0);
    } else {
      this.setState({ wantedCategorySelectionErr: true });
      fullpageApi.moveTo(1, 0);
    }
  };

  handleNext1 = (fullpageApi) => {
    if (
      this.state.name === "" ||
      (this.state.employee
        ? !this.state.female && !this.state.male
        : this.state.employer
        ? this.state.company === ""
        : "") ||
      this.state.phone === "" ||
      this.state.email === "" ||
      this.state.phoneTErr ||
      !this.state.errorMessage.phoneValid
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
      // console.log(this.state)
    } else {
      fullpageApi.moveTo(4, 0);
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
      !salarytime.length ? this.setState({ stTErr: true }) : console.log("now");
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
      this.submitHandler(fullpageApi, selectedCategories, selectedSalTime);
    }

    // try {
    //   await doc.useServiceAccountAuth({
    //     client_email: CLIENT_EMAIL,
    //     private_key: PRIVATE_KEY,
    //   });
    //   // loads document properties and worksheets
    //   await doc.loadInfo();

    //   const sheet = doc.sheetsById[SHEET_ID];
    //   const rows = await sheet.getRows();

    //   // this.setState({ count: rows }, () => {
    //   //   document.querySelector(".value").innerText = this.state.count;
    //   // });
    // } catch (e) {
    //   console.error("Error: ", e);
    // }
  };
  check() {
    let toS = this.state.to.split(" ");
    let strTo = toS[1].replace(/,/g, "");
    let fromS = this.state.from.split(" ");
    let strFrom = fromS[1].replace(/,/g, "");
    let change = strFrom - strTo;

    let diffA = strFrom * 2;
    // let diffB = diffA / 50;
    console.log("change 0 === ", diffA);
    if (change <= 0) {
      console.log("change 1 === ", diffA);
    } else if (change > diffA) {
      console.log("change 2 === ", diffA);
    }
  }
  handleSalaryChange(target, value) {
    // if (target === "to") {
    //   if (value != "") {
    //     let toS = value.split(" ");
    //     let strTo = toS[1].replace(/,/g, "");
    //     let fromS = this.state.from.split(" ");
    //     let strFrom = fromS[1].replace(/,/g, "");
    //     let change = strFrom - strTo;

    //     let diffA = strFrom * 100;
    //     let diffB = diffA / 50;
    //     if (change <= 0) {
    //       this.setState({ expSalTErr: true });
    //     } else if (change > diffB) {
    //       this.setState({ expSalTErr: true });
    //       console.log("change err === ", diffB);
    //     } else {
    //       this.setState({
    //         [target]: value,
    //       });
    //     }
    //   }
    // } else {
    this.setState({
      [target]: value,
    });
    // }
    console.log(this.state.from, this.state.to);
    this.state.from === "" || this.state.to === ""
      ? this.setState({ expSalTErr: true })
      : this.setState({ expSalTErr: false });
  }
  handleNoEmp(e) {
    e.moveTo(1, 0);
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
    const { skills, achievement, from, to } = this.state;
    const formIsValid = nameValid && emailValid && phoneValid;
    const formIsValidEmployer =
      nameValid && emailValid && phoneValid && companyValid;
    let gender = this.state.male ? "Male" : this.state.female ? "Female" : "";
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
          title: "Invalid input fields",
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
          title: "Invalid input fields",
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
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid input fields",
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
          }).then(() => {
            set(ref(db, "users/jobs_employer/" + this.state.phone), {
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
            });
            this.setState({ isSubmit: false });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Awesome, you have been added!",
              showConfirmButton: false,
              timer: 1500,
            });
            this.clearForm(selectedCategories);
          });
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
          }).then(() => {
            set(ref(db, "users/jobs_users/" + this.state.phone), {
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
            });
            this.setState({ isSubmit: false });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Awesome, you have been added!",
              showConfirmButton: false,
              timer: 1500,
            });
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
    if (this.state.skills.length === 5) {
      alert("You can add max 5 skills");
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
      : this.state.skills.length === 5
      ? alert("You can add max 5 skills")
      : this.state.skills.push(e);

    this.state.skills.length && this.setState({ skillTErr: false });
    this.setState({ defSkills: this.state.defSkills });
  };
  handleAchievementAdd = (item) => {
    let { achievement } = this.state;
    if (achievement.length === 1) {
      alert("You can add only 1 achievement");
    } else {
      achievement.push(item);
      this.setState({ achievement: achievement });
      achievement.length && this.setState({ achievementTErr: false });
    }
  };
  _handleChange = (checkValidation, validationCheck, stateKey, value) => {
    const { error, isValid } = checkValidation(value);
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
      email: "",
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

  appendSpreadsheet = async (row) => {
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
      console.error("Error: ", e);
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
      console.error("Error: ", e);
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
  componentDidMount() {
    this.readRows();
    this.emp_readRows();

    // this.counterFn();
  }

  onLongPress = (item) => {
    this.state.selected.push(item);
    this.setState({ selectingActive: true, active: item });
  };
  onSelect = (item) => {
    const { selected } = this.state;
    let index = selected.indexOf(item);
    let newList = [...selected];
    if (item === 0 && selected.includes(1)) {
    } else if (item === 1 && selected.includes(0)) {
    } else if (index > -1) {
      newList.splice(index, 1);
    } else {
      newList.push(item);
      this.setState({ intTErr: false });
    }
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
    this.state.sw ? this.setState({ sw: false }) : this.setState({ sw: true });
    this.setState({ jobErr: false });
  };
  toggleOpen = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }));
  };
  onSelectChange = (value) => {
    this.toggleOpen();
    this.setState({ select_value: value });
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
      timings,
      Saltimings,
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

    console.log("value === ", this.state);
    defSkills.sort(function (a, b) {
      return a.localeCompare(b); //using String.prototype.localCompare()
    });

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
            <div id="fullpage">
              <span id="circle" class="circle"></span>
              <div className="section section1">
                <div className="header">
                  <div className="top">
                    <div className="logo">
                      <img src={Logo} className="header-logo" />
                    </div>
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
                  <div className="center">
                    <h1>
                      Building Pakistan’s{" "}
                      <h1 className="italic">supercommunity</h1> of
                      professionals
                    </h1>
                  </div>
                  <div className="bottom">
                    <img src={Vector1} className="header-vector" />
                  </div>
                </div>
              </div>

              {this.state.content.map((item, i) => {
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
                                      this.state.animatedStrings[
                                        this.state.index %
                                          this.state.animatedStrings.length
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
                        {i < 5 ? (
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
                                      this.state.animatedStrings[
                                        this.state.index %
                                          this.state.animatedStrings.length
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
                        ) : (
                          // <video autoplay preload muted loop>
                          //   <source type="video/mp4"></source>
                          // </video>
                          // <Lottie
                          //   options={roomOptions}
                          //   height={"100%"}
                          //   width={"100%"}
                          // />
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="section">
                <div className="last-section">
                  <div className="last-vector">
                    <h1>It takes a town to make great things happen</h1>
                    <img src={Vector9} className="last-vector-image" />
                    <div
                      onClick={() => fullpageApi.moveTo(1, 0)}
                      className="top-btn up "
                    >
                      <img
                        src={ArrowIcon}
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

                    <div className="wait-btn-main-div">
                      <div
                        className="wait-button wait-btn"
                        onClick={() =>
                          this.handleModeChange("Employee", fullpageApi)
                        }
                      >
                        I want a job
                      </div>
                      <div
                        className="wait-button wait-btn"
                        onClick={() =>
                          this.handleModeChange("Employer", fullpageApi)
                        }
                      >
                        I want to hire
                      </div>
                      {/* <a href="/waitList" className="wait-btn">
                        Join the waitlist
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />
    );
  }
}

// ReactDOM.render(<HomePage />, document.getElementById("react-root"));

export default HomePage;
