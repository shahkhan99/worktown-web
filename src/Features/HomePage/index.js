import React from "react";
import ReactDOM from "react-dom";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import NumberFormat from "react-number-format";
import { getDatabase } from "firebase/database";
import { set, ref } from "@firebase/database";
import firebase from "../../config/firebase";
import ReactFullpage from "@fullpage/react-fullpage";
import {
  emailCheck,
  nameCheck,
  phoneCheck,
  cityCheck,
  companyCheck,
} from "./validation";
import Swal from "sweetalert2";
import { GoogleSpreadsheet } from "google-spreadsheet";
import "./homeStyles.css";
import Logo from "../../assets/Logo/logo.png";
import simpleLogo from "../../assets/Logo/simpleLogo.png";
import Vector1 from "../../assets/Vectors/vector1.png";
import Vector9 from "../../assets/Vectors/vector9.png";
import Cafe from "../../assets/Vectors/Cafe.mp4";
import ArrowIcon from "../../assets/icons/up-arrow.png";
import programmer from "../../assets/icons/sd.png";
import operator from "../../assets/icons/cc.png";
import right from "../../assets/images/right.png";
import TextTransition, { presets } from "react-text-transition";
import male from "../../assets/icons/male-student.png";
import female from "../../assets/icons/woman.png";
import Lottie from "react-lottie";
import lottie from "lottie-web";
import cafe from "../../assets/Vectors/cafe.gif";
import room from "../../assets/Vectors/room2.gif";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiSmartphone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import { BiStar } from "react-icons/bi";
import { FiBookOpen } from "react-icons/fi";
import { BsBookmarkStar } from "react-icons/bs";
import { GiAchievement } from "react-icons/gi";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import SelectSearch from "react-select-search";
import Select from "react-select";
import officeData from "../../assets/Vectors/office.json";
import roomData from "../../assets/Vectors/room.json";
import roadData from "../../assets/Vectors/ROAD.json";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

const db = getDatabase();
const SPREADSHEET_ID = "1tJUmkVph10mUleXZmVAlwIta2DwBeCJClYaGagUpxzA";
const EMPLOYER_SPREADSHEET_ID = "1and-JbqoUr_L1vAX720OLx4P851w_rpIBCxuTqlspEw";
const SHEET_ID = "0";
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
      company: "",
      name: "",
      city: "",
      email: "",
      phone: "",
      sheetLoaded: false,
      courses: [],
      jobErr: false,
      nameTErr: false,
      phoneTErr: false,
      emailTErr: false,
      cityTErr: false,
      expTErr: false,
      eduTErr: false,
      engTErr: false,
      radTErr: false,
      intTErr: false,
      SaltimeTErr: false,
      valTErr: false,
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
      experience: "Work Experience",
      eng_lvl: "English Level",
      education: "Education",
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
          vector: Vector1,
          // colorCode: "#3D459D",
          colorCode: "#fff",
        },
        {
          id: 2,
          tittle: "Community-first ",
          unstyled: " from the ground up",
          body: "We’re creating a super community of storytellers, founders, dreamers, forward-thinkers, misfits, rebels, entrepreneurs, graduates, employees, investors, polyworkers, problem solvers, yay-sayers, coders, designers, freelancers, stargazers and storm-chasers.",
          vector: Cafe,
          // colorCode: "#F0BD3A",
          colorCode: "#fff",
        },
        {
          id: 3,
          tittle: "A not-so-professional network",
          body: "Professional networks are decades old and feel out-of-place. Worktown wants to make it exciting and relevant. And we think everyone’s smart enough to know what works for them.",
          vector: Vector1,
          colorCode: "#fff",
        },
        {
          id: 4,
          tittle: "Where you’re not defined by your job title",
          body: "That is a super-narrow expression of who you are. With Worktown, let the world know how much more you bring to the table than the arbitrary job titles and descriptions that don't fit your work.",
          vector: Vector1,
          // colorCode: "#F15925",
          colorCode: "#fff",
        },
        {
          id: 5,
          // tittle: "Why limit the way people see you?",
          // body: "Resumes are two-dimensional – they don’t talk much about who you are and how you’ve had to work your socks off to get to where you are. Worktown helps you show them what makes you ‘you’.",
          vector: Vector1,
          colorCode: "#fff",
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
    name === "experience" && this.setState({ expTErr: false });
    name === "education" && this.setState({ eduTErr: false });
    name === "eng_lvl" && this.setState({ engTErr: false });
  };
  handleCard = (fullpageApi, val) => {
    if (val.name === "Software & IT Jobs") {
      this.handleSW();
      this.setState({ noCategory: false });
    } else {
      this.handleCSR();
    }
    this.setState({ JobCategory: val.name });
    fullpageApi.moveTo(3, 0);
  };

  handleNext1 = (fullpageApi) => {
    if (
      this.state.name === "" ||
      (!this.state.female && !this.state.male) ||
      (!this.state.csr && !this.state.sw) ||
      this.state.phone === "" ||
      this.state.selectedJobOption === "" ||
      this.state.phoneTErr ||
      !this.state.errorMessage.phoneValid
    ) {
      this.state.name === "" && this.setState({ nameTErr: true });
      this.state.phone === "" && this.setState({ phoneTErr: true });
      !this.state.csr && !this.state.sw && this.setState({ jobErr: true });
      this.state.selectedJobOption === "" && this.setState({ jobErr: true });
      !this.state.male &&
        !this.state.female &&
        this.setState({ radTErr: true });
    } else {
      fullpageApi.moveTo(4, 0);
    }
  };

  handleNext2 = (fullpageApi) => {
    if (
      this.state.name === "" ||
      this.state.selectedJobOption === "" ||
      (!this.state.female && !this.state.male) ||
      (!this.state.csr && !this.state.sw) ||
      this.state.phone === ""
    ) {
      this.state.name === "" && this.setState({ nameTErr: true });
      this.state.phone === "" && this.setState({ phoneTErr: true });
      this.state.selectedJobOption === "" && this.setState({ jobErr: true });
      !this.state.csr && !this.state.sw && this.setState({ jobErr: true });
      !this.state.male &&
        !this.state.female &&
        this.setState({ radTErr: true });
      fullpageApi.moveTo(3, 0);
    }
    if (
      this.state.email === "" ||
      this.state.experience === "Work Experience" ||
      this.state.education === "Education" ||
      this.state.eng_lvl === "English Level" ||
      this.state.city === ""
    ) {
      this.state.email === "" && this.setState({ emailTErr: true });
      this.state.city === "" && this.setState({ cityTErr: true });
      this.state.experience === "Work Experience" &&
        this.setState({ expTErr: true });
      this.state.education === "Education" && this.setState({ eduTErr: true });
      this.state.eng_lvl === "English Level" &&
        this.setState({ engTErr: true });
    } else {
      fullpageApi.moveTo(5, 0);
    }
  };
  handleNext4 = (fullpageApi) => {
    if (!this.state.skills.length || !this.state.achievement.length) {
      !this.state.skills.length && this.setState({ skillTErr: true });
      !this.state.achievement.length &&
        this.setState({ achievementTErr: true });
    }
    if (
      this.state.name === "" ||
      this.state.selectedJobOption === "" ||
      (!this.state.female && !this.state.male) ||
      (!this.state.csr && !this.state.sw) ||
      this.state.phone === ""
    ) {
      this.state.name === "" && this.setState({ nameTErr: true });
      this.state.phone === "" && this.setState({ phoneTErr: true });
      this.state.selectedJobOption === "" && this.setState({ jobErr: true });
      !this.state.csr && !this.state.sw && this.setState({ jobErr: true });
      !this.state.male &&
        !this.state.female &&
        this.setState({ radTErr: true });
      fullpageApi.moveTo(3, 0);
    } else if (
      this.state.email === "" ||
      this.state.experience === "Work Experience" ||
      this.state.education === "Education" ||
      this.state.eng_lvl === "English Level" ||
      this.state.city === ""
    ) {
      this.state.email === "" && this.setState({ emailTErr: true });
      this.state.city === "" && this.setState({ cityTErr: true });
      this.state.experience === "Work Experience" &&
        this.setState({ expTErr: true });
      this.state.education === "Education" && this.setState({ eduTErr: true });
      this.state.eng_lvl === "English Level" &&
        this.setState({ engTErr: true });
      fullpageApi.moveTo(4, 0);
    } else {
      fullpageApi.moveTo(5, 0);
    }
  };
  handleNext3 = async (fullpageApi, selectedCategories) => {
    let interest = selectedCategories.toString() || "";
    if (
      (this.state.name === "" ||
        this.state.selectedJobOption === "" ||
        (!this.state.female && !this.state.male) ||
        (!this.state.csr && !this.state.sw) ||
        this.state.phone === "") &&
      (this.state.email === "" ||
        this.state.experience === "Work Experience" ||
        !this.state.skills.length ||
        this.state.education === "Education" ||
        this.state.eng_lvl === "English Level" ||
        this.state.city === "")
    ) {
      this.state.name === "" && this.setState({ nameTErr: true });
      this.state.phone === "" && this.setState({ phoneTErr: true });
      this.state.selectedJobOption === "" && this.setState({ jobErr: true });
      !this.state.csr && !this.state.sw && this.setState({ jobErr: true });
      !this.state.male &&
        !this.state.female &&
        this.setState({ radTErr: true });
      !this.state.skills.length && this.setState({ skillTErr: true });
      this.state.email === "" && this.setState({ emailTErr: true });
      this.state.city === "" && this.setState({ cityTErr: true });
      this.state.experience === "Work Experience" &&
        this.setState({ expTErr: true });
      this.state.education === "Education" && this.setState({ eduTErr: true });
      this.state.eng_lvl === "English Level" &&
        this.setState({ engTErr: true });

      interest === "" && this.setState({ intTErr: true });
      this.state.value === "0" && this.setState({ valTErr: true });

      fullpageApi.moveTo(3, 0);
    } else if (
      this.state.email === "" ||
      this.state.experience === "Work Experience" ||
      this.state.education === "Education" ||
      this.state.eng_lvl === "English Level" ||
      this.state.city === ""
    ) {
      this.state.email === "" && this.setState({ emailTErr: true });
      this.state.city === "" && this.setState({ cityTErr: true });
      this.state.experience === "Work Experience" &&
        this.setState({ expTErr: true });
      this.state.education === "Education" && this.setState({ eduTErr: true });
      this.state.eng_lvl === "English Level" &&
        this.setState({ engTErr: true });

      interest === "" && this.setState({ intTErr: true });
      this.state.value === "0" && this.setState({ valTErr: true });

      fullpageApi.moveTo(4, 0);
    } else if (
      this.state.skills.length === 0 ||
      this.state.achievement.length === 0
    ) {
      this.state.skills.length === 0 && this.setState({ skillTErr: true });
      this.state.achievement.length === 0 &&
        this.setState({ achievementTErr: true });
      fullpageApi.moveTo(5, 0);
    } else {
      this.submitHandler(fullpageApi, selectedCategories);
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
  handleSalaryChange(target, value) {
    this.setState({ [target]: value });
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
    fullpageApi.moveTo(5, 0);
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

  submitHandler = (fullpageApi, selectedCategories) => {
    const { nameValid, cityValid, emailValid, phoneValid } =
      this.state.errorMessage;
    const { skills, achievement, from, to } = this.state;
    const formIsValid = nameValid && cityValid && emailValid && phoneValid;
    let gender = this.state.male ? "Male" : "Female";
    let interest = selectedCategories.toString() || "";
    let skillSet = skills.toString() || "";
    let achievementStr = achievement.toString() || "";
    var exp_sal = this.state.employer && from + "-" + to;
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
    if (
      this.state.name === "" ||
      this.state.phone === "" ||
      this.state.city === "" ||
      this.state.email === "" ||
      skillSet === "" ||
      achievementStr === "" ||
      this.state.JobCategory === "" ||
      this.state.experience === "" ||
      this.state.education === "" ||
      this.state.value === "0" ||
      this.state.eng_lvl === "" ||
      this.state.selectedJobOption === "" ||
      gender === "" ||
      interest === ""
    ) {
      interest === "" && this.setState({ intTErr: true });
      this.state.value === "0" && this.setState({ valTErr: true });
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
            Experience: this.state.experience,
            Skills: skillSet,
            Education: this.state.education,
            InterestedIn: interest,
            ExpectedSalary: exp_sal,
            EnglishLevel: this.state.eng_lvl,
            JobTime: achievementStr,
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
    document.getElementById("phone").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("city").value = "";
    document.getElementById("select").value = "";
    this.setState({
      name: "",
      phone: "",
      email: "",
      city: "",
      value: "0",
      range_cond: 0,
      csr: false,
      sw: false,
      experience: "Work Experience",
      education: "Education",
      eng_lvl: "English Level",
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

      const sheet = emp_doc.sheetsById[SHEET_ID];
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
      this.setState({ SaltimeTErr: false });
    }
    this.setState({
      selectedSal: newList,
      activeSal: item,
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
    const officeOptions = {
      loop: true,
      autoplay: true,
      animationData: officeData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const roomOptions = {
      loop: true,
      autoplay: true,
      animationData: roomData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const roadOptions = {
      loop: true,
      autoplay: true,
      animationData: roadData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    let {
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
    let {
      name: nameError,
      city: occError,
      email: emailError,
      phone: phoneError,
    } = this.state.errorMessage;
    let selectedSalary = [];
    selectedSal.forEach((e) => {
      selectedSalary.push(Saltimings[e]);
    });
    let selectedCategories = [];
    selected.forEach((e) => {
      selectedCategories.push(timings[e]);
    });
    let n_val = this.state.range_cond;
    let step_val = 10000;
    if (n_val <= 100000) {
      step_val = 10000;
    } else if (n_val >= 100000 && n_val <= 310000) {
      step_val = 20000;
    } else {
      step_val = 40000;
    }

    console.log("value === ", selectedSalary, selectedCategories);
    defSkills.sort(function (a, b) {
      return a.localeCompare(b); //using String.prototype.localCompare()
    });
    let v1 = this.state.value.split("-");

    return (
      <ReactFullpage
        scrollOverflow={true}
        sectionsColor={["#fff"]}
        // sectionsColor={["#FF9772"]}
        onLeave={this.onLeave.bind(this)}
        afterLoad={this.afterLoad.bind(this)}
        responsiveWidth={2500}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage">
              <div className="section section1">
                <div className="header">
                  <div className="top">
                    <div className="logo">
                      <img src={Logo} className="header-logo" />
                    </div>
                    <div className="wait-btn-main-div">
                      <div className="wait-button">
                        <a
                          onClick={() =>
                            this.handleModeChange("Employee", fullpageApi)
                          }
                          className="wait-btn"
                        >
                          I want a job
                        </a>
                      </div>
                      <div className="wait-button">
                        <a
                          onClick={() =>
                            this.handleModeChange("Employer", fullpageApi)
                          }
                          className="wait-btn"
                        >
                          I want to hire
                        </a>
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
                          <div className="form1">
                            <h1>Select Job Category</h1>
                            {this.state.card.map((v, i) => (
                              <div
                                className="card"
                                onClick={
                                  v.name === "Software & IT Jobs"
                                    ? () => this.handleCard(fullpageApi, v)
                                    : () =>
                                        alert(
                                          "Telecaller & Call Center Jobs are coming soon..."
                                        )
                                }
                                style={
                                  v.name === "Telecaller & Call Center Jobs"
                                    ? { opacity: 0.5 }
                                    : v.name === "Software & IT Jobs" &&
                                      this.state.sw
                                    ? {
                                        backgroundColor:
                                          "rgba(240, 189, 58, 0.45)",
                                      }
                                    : this.state.noCategory
                                    ? { border: "1px solid red" }
                                    : { backgroundColor: "#fff" }
                                }
                              >
                                <img
                                  src={v.img}
                                  style={{
                                    width: 120,
                                    height: 97,
                                    marginBottom: 5,
                                  }}
                                />
                                <h4
                                  style={{
                                    fontSize: 30,
                                    marginTop: 15,
                                    marginBottom: 15,
                                  }}
                                >
                                  {v.name}
                                </h4>
                              </div>
                            ))}
                          </div>
                        ) : i === 1 ? (
                          <div
                            className={this.state.part1 ? "intro" : "intro_off"}
                          >
                            <h1>Your Introduction</h1>
                            <div
                              className="radio-div"
                              style={
                                this.state.employer ? { display: "none" } : {}
                              }
                            >
                              <div
                                className={
                                  this.state.male ? "radio-male" : "radio-in"
                                }
                                onClick={() => this.handleMale()}
                                style={
                                  this.state.radTErr
                                    ? { border: "1px solid red" }
                                    : { borderWidth: 0 }
                                }
                              >
                                <img
                                  src={male}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    marginBottom: 5,
                                  }}
                                />
                                Male
                              </div>
                              <div
                                className={
                                  this.state.female
                                    ? "radio-female"
                                    : "radio-in"
                                }
                                onClick={() => this.handleFemale()}
                                style={
                                  this.state.radTErr
                                    ? { border: "1px solid red" }
                                    : { borderWidth: 0 }
                                }
                              >
                                <img
                                  src={female}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    marginBottom: 5,
                                  }}
                                />
                                Female
                              </div>
                            </div>

                            <div
                              class="a-upper-input"
                              style={
                                this.state.employee ? {} : { marginTop: 20 }
                              }
                            >
                              <div
                                style={
                                  this.state.employee ? { display: "none" } : {}
                                }
                                className="a-input-field"
                              >
                                <label className="input-label">
                                  Business Name
                                  <span
                                    style={{
                                      color: "red",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    *
                                  </span>
                                </label>
                                <div
                                  className="div-input-icon"
                                  style={
                                    this.state.nameTErr
                                      ? { border: "1px solid red" }
                                      : !(!name || !nameError)
                                      ? { border: "1px solid red" }
                                      : { borderWidth: 0 }
                                  }
                                >
                                  <MdOutlineBusinessCenter
                                    color="#3D459D"
                                    size={21}
                                    className="svg-u"
                                    style={{
                                      position: "relative",
                                      top: 13,
                                      left: 10,
                                    }}
                                  />
                                  <input
                                    placeholder="WorkHall"
                                    id="company"
                                    name="company"
                                    onChange={(name) => {
                                      this._handleChange(
                                        companyCheck,
                                        "companyValid",
                                        "company",
                                        name.target.value
                                      );
                                    }}
                                    type="text"
                                    // placeholder="We need your full name"
                                    style={{
                                      fontFamily: "Lato",
                                      fontSize: 17,
                                      color: "#868686",
                                    }}
                                    // value={this.state.name}
                                    className="a-r-input-box"
                                  />
                                </div>
                              </div>
                              <div className="a-input-field">
                                <label className="input-label">
                                  Name
                                  <span
                                    style={{
                                      color: "red",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    *
                                  </span>
                                </label>
                                <div
                                  className="div-input-icon"
                                  style={
                                    this.state.nameTErr
                                      ? { border: "1px solid red" }
                                      : !(!name || !nameError)
                                      ? { border: "1px solid red" }
                                      : { borderWidth: 0 }
                                  }
                                >
                                  <FaRegUser
                                    color="#3D459D"
                                    size={17}
                                    className="svg-u"
                                    style={{
                                      position: "relative",
                                      top: 13,
                                      left: 10,
                                    }}
                                  />
                                  <input
                                    placeholder="Ahmed Mehanti"
                                    id="name"
                                    name="name"
                                    onChange={(name) => {
                                      this._handleChange(
                                        nameCheck,
                                        "nameValid",
                                        "name",
                                        name.target.value
                                      );
                                    }}
                                    type="text"
                                    // placeholder="We need your full name"
                                    style={{
                                      fontFamily: "Lato",
                                      fontSize: 17,
                                      color: "#868686",
                                    }}
                                    // value={this.state.name}
                                    className="a-r-input-box"
                                  />
                                </div>
                              </div>

                              <div className="div-input-inner">
                                <div className="a-input-field a-input-field-ph ">
                                  <label className="input-label">
                                    Number
                                    <span
                                      style={{
                                        color: "red",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      *
                                    </span>
                                  </label>
                                  <div
                                    className="div-input-icon"
                                    style={
                                      this.state.phoneTErr
                                        ? { border: "1px solid red" }
                                        : !(!phone || !phoneError)
                                        ? { border: "1px solid red" }
                                        : { borderWidth: 0 }
                                    }
                                  >
                                    <FiSmartphone
                                      color="#3D459D"
                                      size={20}
                                      className="svg-p"
                                      style={{
                                        position: "relative",
                                        top: 12,
                                        left: 10,
                                      }}
                                    />
                                    <input
                                      id="phone"
                                      name="phone"
                                      placeholder="03001234567"
                                      onChange={(phone) => {
                                        this._handleChange(
                                          phoneCheck,
                                          "phoneValid",
                                          "phone",
                                          phone.target.value
                                        );
                                      }}
                                      type="text"
                                      style={{
                                        fontFamily: "Lato",
                                        fontSize: 17,
                                        color: "#868686",
                                      }}
                                      className="a-r-input-box"
                                      value={this.state.phone}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="a-input-field">
                                <label
                                  className="input-label"
                                  style={{ fontSize: 22, marginTop: -11 }}
                                >
                                  Job type
                                  <span
                                    style={{
                                      color: "red",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    *
                                  </span>
                                </label>
                                <a
                                  // className="change-a"
                                  onClick={
                                    this.state.csr
                                      ? () => {}
                                      : this.state.sw
                                      ? () => {}
                                      : () => {
                                          this.handleNoCategory(fullpageApi);
                                        }
                                  }
                                >
                                  <div
                                    className="div-input-icon"
                                    style={
                                      this.state.jobErr
                                        ? { border: "1px solid red" }
                                        : { borderWidth: 0 }
                                    }
                                  >
                                    <MdWorkOutline
                                      color="#3D459D"
                                      size={22}
                                      className="svg-j"
                                      style={{
                                        position: "relative",
                                        left: 10,
                                      }}
                                    />
                                    <Select
                                      options={job_options}
                                      isDisabled={this.state.sw ? false : true}
                                      onChange={(e) =>
                                        this.selectChange(e.value)
                                      }
                                      id="select"
                                      placeholder={
                                        this.state.sw
                                          ? "select job type"
                                          : "first select job category above"
                                      }
                                    />
                                  </div>
                                </a>
                                {/* {this.state.jobErr && (
                                  <p className="a-error-message a-error-message-j">
                                    Select job category first.
                                  </p>
                                )} */}
                              </div>
                              <div className="div-btn-2">
                                <button
                                  type="button"
                                  class="a-reg-btn"
                                  onClick={() => fullpageApi.moveTo(2, 0)}
                                >
                                  Back
                                </button>
                                <button
                                  type="button"
                                  class="a-reg-btn"
                                  onClick={() => this.handleNext1(fullpageApi)}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : i === 2 ? (
                          <div
                            className={
                              this.state.part2 ? "work-exp" : "work-exp_off"
                            }
                          >
                            <h1>Let's build your CV!</h1>

                            <div className="a-input-field-nxt">
                              <label className="input-label">
                                Email
                                <span
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  *
                                </span>{" "}
                              </label>
                              <div
                                className="div-input-icon"
                                style={
                                  this.state.emailTErr
                                    ? { border: "1px solid red" }
                                    : !(!email || !emailError)
                                    ? { border: "1px solid red" }
                                    : { borderWidth: 0 }
                                }
                              >
                                <HiOutlineMail
                                  color="#3D459D"
                                  size={20}
                                  className="svg-m"
                                  style={{
                                    position: "relative",
                                    top: 14,
                                    left: 10,
                                  }}
                                />
                                <input
                                  placeholder="abc@gmail.com"
                                  id="email"
                                  name="email"
                                  // value={this.state.email}
                                  onChange={(email) => {
                                    this._handleChange(
                                      emailCheck,
                                      "emailValid",
                                      "email",
                                      email.target.value
                                    );
                                  }}
                                  type="email"
                                  // placeholder="We need your full name"
                                  style={{
                                    fontFamily: "Lato",
                                    fontSize: 17,
                                    color: "#868686",
                                  }}
                                  className="a-r-input-box"
                                />
                              </div>
                            </div>
                            <div className="a-input-field-nxt">
                              <label
                                className="input-label"
                                style={{ paddingLeft: 5 }}
                              >
                                City
                                <span
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  *
                                </span>
                              </label>
                              <div
                                className="div-input-icon"
                                style={
                                  this.state.cityTErr
                                    ? { border: "1px solid red" }
                                    : !(!city || !occError)
                                    ? { border: "1px solid red" }
                                    : { borderWidth: 0 }
                                }
                              >
                                <MdOutlineLocationOn
                                  color="#3D459D"
                                  size={20}
                                  className="svg-l"
                                  style={{
                                    position: "relative",
                                    top: 14,
                                    left: 10,
                                  }}
                                />
                                <input
                                  placeholder="Karachi"
                                  // value={this.state.city}
                                  id="city"
                                  name="city"
                                  onChange={(city) => {
                                    this._handleChange(
                                      cityCheck,
                                      "cityValid",
                                      "city",
                                      city.target.value
                                    );
                                  }}
                                  type="text"
                                  // placeholder="We need your full name"
                                  style={{
                                    fontFamily: "Lato",
                                    fontSize: 17,
                                    color: "#868686",
                                  }}
                                  className="a-r-input-box"
                                />
                              </div>
                            </div>

                            <label
                              className="input-label input-label1 label2"
                              style={{ paddingLeft: 5 }}
                            >
                              Details
                              <span
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                *
                              </span>
                            </label>
                            <div className="div-check">
                              <div
                                className="select-div"
                                style={
                                  this.state.expTErr
                                    ? { border: "1px solid red" }
                                    : { borderWidth: 0 }
                                }
                              >
                                <BiStar
                                  color="#3D459D"
                                  size={20}
                                  style={{
                                    position: "relative",
                                    top: 7,
                                    left: 8,
                                  }}
                                />
                                <select
                                  onChange={(e) =>
                                    this.handleSelect("experience", e)
                                  }
                                  value={this.state.experience}
                                  // className={this.sta}
                                  placeholder="Work Exp"
                                >
                                  <option disabled>Work Experience</option>
                                  <option>Fresher</option>
                                  <option>0-1 years</option>
                                  <option>2 years</option>
                                  <option>3-5 years</option>
                                  <option>5-10 years</option>
                                  <option>10+ years</option>
                                </select>
                              </div>{" "}
                              <div
                                className="select-div"
                                style={
                                  this.state.eduTErr
                                    ? { border: "1px solid red" }
                                    : { borderWidth: 0 }
                                }
                              >
                                <FiBookOpen
                                  color="#3D459D"
                                  size={20}
                                  style={{
                                    position: "relative",
                                    top: 7,
                                    left: 8,
                                  }}
                                />
                                <select
                                  onChange={(e) =>
                                    this.handleSelect("education", e)
                                  }
                                  value={this.state.education}
                                >
                                  <option selected disabled>
                                    Education
                                  </option>
                                  <option>Below 10th</option>
                                  <option>Matric (10th)</option>
                                  <option>Inter</option>
                                  <option>Diploma</option>
                                  <option>Graduate</option>
                                  <option>Post Graduate</option>
                                </select>
                              </div>{" "}
                              <div
                                className="select-div"
                                style={
                                  this.state.engTErr
                                    ? { border: "1px solid red" }
                                    : { borderWidth: 0 }
                                }
                              >
                                <TiSortAlphabeticallyOutline
                                  color="#3D459D"
                                  size={22}
                                  style={{
                                    position: "relative",
                                    top: 6,
                                    left: 8,
                                  }}
                                />
                                <select
                                  onChange={(e) =>
                                    this.handleSelect("eng_lvl", e)
                                  }
                                  value={this.state.eng_lvl}
                                >
                                  <option selected disabled>
                                    English Level
                                  </option>
                                  <option>English-Urdu mix</option>
                                  <option>Basic</option>
                                  <option>Advance</option>
                                </select>
                              </div>
                            </div>

                            <div className="exp-btn">
                              <button
                                type="button"
                                class="a-reg-btn"
                                onClick={() => this.back(fullpageApi)}
                              >
                                Back
                              </button>
                              <button
                                type="button"
                                class={"a-reg-btn"}
                                onClick={() => this.handleNext2(fullpageApi)}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        ) : i === 3 ? (
                          <div className="last-int">
                            <h1>Let's build your CV!</h1>
                            <div className="a-input-field-nxt a-input-field-nxt1">
                              <label className="input-label">
                                Skills
                                <span
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  *
                                </span>{" "}
                              </label>
                              <div
                                className="div-input-icon div-skills-inp"
                                style={
                                  this.state.skillTErr
                                    ? { border: "1px solid red" }
                                    : { borderWidth: 0 }
                                }
                              >
                                <BsBookmarkStar
                                  color="#3D459D"
                                  size={20}
                                  className="svg-m"
                                  style={{
                                    position: "relative",
                                    top: 14,
                                    left: 10,
                                  }}
                                />
                                <TagsInput
                                  className="a-r-input-box skill-set"
                                  value={this.state.skillTag}
                                  onChange={(e) => this.handleSkillAdd(e)}
                                  maxTags={5}
                                  inputProps={{
                                    placeholder: " + Add another skill",
                                  }}
                                />
                                <div className="defSkill-main">
                                  {this.state.defSkills.map((v) => (
                                    <div
                                      className={
                                        this.state.skills.includes(v)
                                          ? "defSkill-map-selected"
                                          : "defSkill-map"
                                      }
                                      onClick={() => {
                                        this.handleSkillDefault(v);
                                      }}
                                    >
                                      {v}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div
                              className="a-input-field-nxt a-input-field-nxt1 nxt2"
                              style={
                                this.state.employer ? { display: "none" } : {}
                              }
                            >
                              <label className="input-label">
                                Your biggest Achievement
                                <span
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  *
                                </span>{" "}
                              </label>
                              <div
                                className="div-input-icon div-skills-inp"
                                style={
                                  this.state.achievementTErr
                                    ? { border: "1px solid red" }
                                    : { borderWidth: 0 }
                                }
                              >
                                <GiAchievement
                                  color="#3D459D"
                                  size={22}
                                  className="svg-m"
                                  style={{
                                    position: "relative",
                                    top: 14,
                                    left: 10,
                                  }}
                                />
                                <input
                                  className="a-r-input-box skill-set"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      this.handleAchievementAdd(e.target.value);
                                      e.target.value = "";
                                    }
                                  }}
                                  maxLength={280}
                                  placeholder=" + Add Achievement"
                                />
                                <div className="defSkill-main">
                                  {this.state.achievement.map((v) => (
                                    <div className="defAch-map">
                                      {v}
                                      <MdCancel
                                        color="#2e2f40"
                                        size={20}
                                        className="svg-m"
                                        style={{
                                          position: "relative",
                                          top: 0,
                                          left: 10,
                                          marginRight: 5,
                                          cursor: "pointer",
                                          width: 50,
                                        }}
                                        onClick={() =>
                                          this.setState({ achievement: [] })
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div
                              className="salary-div-time"
                              style={
                                this.state.employee ? { display: "none" } : {}
                              }
                            >
                              {" "}
                              <label className="input-label">
                                Job Timings
                                <span
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  *
                                </span>{" "}
                              </label>
                              <div className="div-cb-salary">
                                {Saltimings.map((v, i) => (
                                  <button
                                    className={
                                      selectedSal.includes(i)
                                        ? "tickContainer"
                                        : "timeBtn"
                                    }
                                    style={
                                      this.state.intTErr
                                        ? { border: "0.3px solid red" }
                                        : { borderWidth: 0 }
                                    }
                                    onClick={() => this.onSelectSalary(i)}
                                  >
                                    {v}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="exp-btn1">
                              <button
                                type="button"
                                class="a-reg-btn"
                                onClick={() => this.back2(fullpageApi)}
                              >
                                Back
                              </button>
                              <button
                                type="button"
                                class={"a-reg-btn"}
                                onClick={() => this.handleNext4(fullpageApi)}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        ) : i === 4 ? (
                          <div className="salary-div">
                            <h1>Job Timings</h1>
                            <label className="input-label">
                              Job Timings
                              <span
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                *
                              </span>{" "}
                            </label>
                            <div className="div-cb">
                              {timings.map((v, i) => (
                                <button
                                  className={
                                    selected.includes(i)
                                      ? "tickContainer"
                                      : "timeBtn"
                                  }
                                  style={
                                    this.state.intTErr
                                      ? { border: "0.3px solid red" }
                                      : { borderWidth: 0 }
                                  }
                                  onClick={() => this.onSelect(i)}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                            <h1>Current Salary</h1>
                            <div
                              className="current-salary-main-div"
                              style={
                                this.state.employer ? { display: "none" } : {}
                              }
                            >
                              <label className="input-label">
                                Current Salary
                                <span
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  *
                                </span>{" "}
                              </label>
                              <div className="div-range">
                                <div class="slidecontainer">
                                  <div
                                    className="div-value"
                                    style={{ left: this.state.value_px + "%" }}
                                  ></div>

                                  <Slider
                                    min={10000}
                                    max={this.state.sw ? 530000 : 90000}
                                    defaultValue={60000}
                                    trackStyle={
                                      this.state.value === "0"
                                        ? { backgroundColor: "transparent" }
                                        : { backgroundColor: "#f0bd3a" }
                                    }
                                    step={step_val}
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </div>
                                <h3
                                  style={
                                    this.state.valTErr
                                      ? {
                                          border: "0.3px solid red",
                                          backgroundColor: "white",
                                          fontSize: 20,
                                        }
                                      : {
                                          borderWidth: 0,
                                          backgroundColor: "white",
                                          fontSize: 20,
                                        }
                                  }
                                >
                                  <NumberFormat
                                    thousandsGroupStyle="thousand"
                                    value={
                                      this.state.sw
                                        ? n_val === 530000
                                          ? "500000+"
                                          : n_val === 0
                                          ? "0"
                                          : `${v1[0]} -- ${v1[1]}`
                                        : n_val === 90000
                                        ? "80000+"
                                        : n_val === 0
                                        ? "0"
                                        : `${v1[0]} -- ${v1[1]}`
                                    }
                                    prefix="Rs. "
                                    decimalSeparator="--"
                                    displayType="text"
                                    type="text"
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    isNumericString={true}
                                  />
                                </h3>
                              </div>
                            </div>
                            <div
                              className="current-salary-main-div"
                              style={
                                this.state.employee ? { display: "none" } : {}
                              }
                            >
                              <label className="input-label">
                                Expected Salary
                                <span
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  *
                                </span>{" "}
                              </label>
                              <div className="expected-salary-input">
                                <input
                                  type="number"
                                  placeholder="from"
                                  onChange={(e) =>
                                    this.handleSalaryChange(
                                      "from",
                                      e.target.value
                                    )
                                  }
                                />
                                &nbsp; - &nbsp;
                                <input
                                  type="number"
                                  placeholder="to"
                                  onChange={(e) =>
                                    this.handleSalaryChange(
                                      "to",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="exp-btn1">
                              <button
                                type="button"
                                class="a-reg-btn"
                                onClick={() => this.back1(fullpageApi)}
                              >
                                Back
                              </button>
                              <button
                                type="button"
                                class={"a-reg-btn"}
                                onClick={() =>
                                  this.handleNext3(
                                    fullpageApi,
                                    selectedCategories
                                  )
                                }
                              >
                                Submit
                              </button>
                            </div>
                          </div>
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
                          i === 1
                            ? "vector-div1"
                            : i === 3
                            ? "vector-div1"
                            : i === 2
                            ? "vector-div2"
                            : i === 4
                            ? "vector-div2"
                            : i === 0
                            ? "vector-div2"
                            : i < 4
                            ? "vector-div0"
                            : "vector-div"
                        }
                        style={
                          i % 2 == 0
                            ? { justifyContent: "flex-end" }
                            : { justifyContent: "flex-start" }
                        }
                      >
                        {i === 1 ? (
                          <img
                            src={cafe}
                            style={{ width: "100%", height: "100%" }}
                          />
                        ) : i === 2 ? (
                          <Lottie
                            options={roadOptions}
                            height={"100%"}
                            width={"100%"}
                          />
                        ) : i === 3 ? (
                          <img
                            src={cafe}
                            style={{ width: "100%", height: "100%" }}
                          />
                        ) : i === 4 ? (
                          <Lottie
                            options={roomOptions}
                            height={"100%"}
                            width={"100%"}
                          />
                        ) : i === 0 ? (
                          <Lottie
                            options={officeOptions}
                            height={"100%"}
                            width={"100%"}
                          />
                        ) : (
                          <img
                            src={item.vector}
                            className={
                              i === 1 && i === 3
                                ? "vector-img1"
                                : i < 4 && i === 0
                                ? "vector-img0"
                                : "vector-img"
                            }
                          />
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
                    <div className="wait-button">
                      <a
                        onClick={() => fullpageApi.moveTo(2, 0)}
                        className="wait-btn"
                      >
                        I want a Job
                      </a>
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
