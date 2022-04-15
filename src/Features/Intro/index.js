import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import signUpImg from "../../assets/images/signup.png";
import male from "../../assets/icons/male-student.png";
import female from "../../assets/icons/woman.png";
import Vector1 from "../../assets/Vectors/vector1.png";
import Logo from "../../assets/Logo/logo.png";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import { emailCheck, nameCheck, phoneCheck, cityCheck } from "./validation";
import { GoogleSpreadsheet } from "google-spreadsheet";

// CSS
import "./style.css";
import JobCategory from "../JobCategory";

const SPREADSHEET_ID = "1qNsrjCbUg-OnnqekrxaLBbEwndL2jXb0AJbc9frnZEk";
const SHEET_ID = "0";
const CLIENT_EMAIL =
  "work-hall@academy-registra-1605173971230.iam.gserviceaccount.com";
const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEHOlVYVGJOeB+\ntTj0W505Wntj4CxLpFxEWgBPhjZLL5y+qmcSbvzotqTm+U7Gsdbwb6VdtfO9lVVI\n1YdBkL8DfWOJfkGoOiyrKJH4Td7xgJ441cLF2dQ7VtxRSAlJjqwJ4+oeOakpxET0\nHhEu0KkrozOX73QOD65ycyQAnxGOMOgh6XQpayfYzh5svBiAfDmLa5+sLMSscgiw\nfGAiAOehRtF7zTpXbOp474NWIZKfkM081gS+/D0znj50XSkKFHmtC9o7bK5YXlfI\ntjy3vt41BQsyHiSoZ8HEp/nVUbHVTUA+yUAmqnNRrHFETZYSrMD67aal2Ivk4LHM\nKzN5TmUJAgMBAAECggEACOPiTFF3qQUeO8LlhKb04Gaikn3qfCOvXsDcDpQquMCn\n4M59ktdvBcdRKpBRhXkxNsqU4EPmkKj+Sf7gsrSdWCA9HNHup4c67ae5QEdFbJoU\nR3F3SCajs+ya2wttMlqySqt8j5IKbLSInK69QCug3kkicQg08Qs9xlNDu0x6twDv\ntSL1eAYRGtGHSHulELh5ZRsNzlsWwCiKTuU8/5XeT9K9vJXNu7J02KA5W46VDWOF\nUTK9GdbukE7g5xiCvi2jHpCWC9ZxqdCzd46/DJ5pwY4slJra1IFfhozmzQl6Lcso\noRF94XV93zJgK3QVwSzfjk2ugxXGnDG3B+wrb4a/NQKBgQDvTJnebjWYWm3ejb24\nImblIkpr0YzB8pvWSTWZDUaRWqUIt04dhC6tRa+b6MEeaI/jFiBBkO1MhG22HXDm\n/gnQJ8kU+ppk14kubSzFkLtoVe9069LfcLn1kp/pP7KoHSTO0OToZWT2vbuqb4Ra\njVP5noJ1VOxZ7pv26Dd7H32+NQKBgQDRzLrc7f7TPUOYyftdEZzFD+nh9zLypC7s\nv655+aWADvK0srMAdhQTyf7l+VztDflK4qr3LuN0cb3ufNDbHAPFkpW79fLouHzf\nLDnxrnlUFOcWWPSC4/LQ63VcbOWc8adXHv5+APYKEKQl+A6wJjoiD1PZgj5noiAe\nH5XD8CC2BQKBgQDLLwFfCbjcGbw8QaGbHSq813bVQWIAs9x6AENQJyOJ+6sxUWM0\nUK3JVegbu29uQF4b9QeCZGn4lGELRsg8eesfIQjtlTNO+Gt0TiK7xX46wuzFHA86\nxV5AEzVQOVOaxtQf/uK+KImnr8YOmw2ITYPF6T7gHTFp0t3+sYGaO0zrGQKBgFHy\n1T6829+pO4EvzDaTTZgP2jyAcW8jwIyLZtyQLhwyOo1oi9DvTnJYYW91Et4pqimd\nFkjNEN2IHDdOm8oqTDLdSg2MSWCrx2LpBI0pqIy2SXmKL5/85/jBMCt1Ac9m+QVn\nvuJ6/5/41hVaqmoV1Hk/YXJBlJyoUEFT9wz8+9n9AoGBAKlkyHx+WACxWOMr97fN\na+Ls03kugkvJb+PUVu0rMsNKB/i3dTPpz1mqqU7LntMShsd0h+ZoGnBwf6sk2agG\nxs02uEnWkRlmvlWBFOFtahH6bJqG3Kh9pzwN16Rzr/qIgd9bfXlETx6D3SGO3SMR\n84+jm0xK/gLtdy+jE9ViDy8O\n-----END PRIVATE KEY-----\n";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

class Introduction extends Component {
  state = {
    male: false,
    female: false,
    value: 27000,
    value_px: 27,
    part1: true,
    part2: true,
    name: "",
    city: "",
    email: "",
    phone: "",
    sheetLoaded: false,
    courses: [],
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
    count: 0,
    experience: "",
    education: "",
    interestedIn: [],

    fulltime: false,
    parttime: false,
    freelance: false,
    workFromHome: false,
    remote: false,
  };
  handleNext1 = () => {
    if (
      this.state.name === "" ||
      this.state.phone === "" ||
      this.state.email === "" ||
      this.state.city === "" ||
      (this.state.male === false && this.state.female === false)
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill the fields first",
        showConfirmButton: true,
        // timer: 1500,
      });
      // alert("Please fill the fields first");
    }
    // else {
    //   this.setState({ part1: false, part2: true });
    // }
  };
  handleNext2 = (JobCategory) => {
    // console.log("btn running ... ");
    this.submitHandler(JobCategory);
  };
  back = () => {};
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
  };
  handleChange = (e) => {
    this.setState({ value: e.target.value });
    var val = e.target.value;
    if (String(val).length === 4) {
      this.setState({ value_px: String(val).slice(0, 1) - 1 });
      console.log(this.state.value_px);
    }
    if (String(val).length === 5) {
      this.setState({
        value_px: String(val).slice(0, 2) - String(val).slice(0, 1),
      });
      console.log(this.state.value_px);
    }
    if (String(val).length === 6) {
      this.setState({ value_px: String(val).slice(0, 3) - 5 });
      console.log(this.state.value_px);
    }
  };
  handleMale = () => {
    if (this.state.female) {
      this.setState({ female: false });
    }
    this.state.male
      ? this.setState({ male: false })
      : this.setState({ male: true });
  };
  handleFemale = () => {
    if (this.state.male) {
      this.setState({ male: false });
    }
    this.state.female
      ? this.setState({ female: false })
      : this.setState({ female: true });
  };
  toUpperCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  _handleChange = (checkValidation, validationCheck, stateKey, value) => {
    const { error, isValid } = checkValidation(value);

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
      } else {
        this.setState({
          [stateKey]: value,
          errorMessage: {
            ...this.state.errorMessage,
            [stateKey]: "",
            [validationCheck]: true,
          },
        });
      }
    } else {
      this.setState({
        errorMessage: {
          ...this.state.errorMessage,
          [stateKey]: error,
          [validationCheck]: false,
        },
      });
    }
  };

  submitHandler = (JobCategory) => {
    console.log("handler running ... ");
    const { nameValid, cityValid, emailValid, phoneValid } =
      this.state.errorMessage;
    const { name, city, email, phone } = this.state;
    const formIsValid = nameValid && cityValid && emailValid && phoneValid;

    if (!formIsValid) {
      console.log("Invalid ... ");
      return;
    }
    let gender = this.state.male ? "Male" : "Female";
    let interest = this.state.interestedIn.toString() || "";
    if (
      this.state.name === "" ||
      this.state.phone === "" ||
      this.state.city === "" ||
      this.state.email === "" ||
      JobCategory === "" ||
      this.state.experience === "" ||
      this.state.education === "" ||
      this.state.value === "" ||
      gender === "" ||
      interest === ""
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "All fields are mandatory",
        showConfirmButton: true,
        // timer: 1500,
      });
    } else {
      console.log("spreadsheet calling ... ");
      this.appendSpreadsheet({
        Name: this.state.name,
        Phone: this.state.phone,
        City: this.state.city,
        Email: this.state.email,
        JobCategory: JobCategory,
        Experience: this.state.experience,
        Education: this.state.education,
        InterestedIn: interest,
        CurrentSalary: this.state.value,
        Gender: gender,
      }).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Awesome, you have been added!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.props.history.push("/");
      });
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
      console.log("spreadsheet running ... ");

      const sheet = doc.sheetsById[SHEET_ID];
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

      this.setState({ count: rows }, () => {
        document.querySelector(".value").innerText = this.state.count;
      });
    } catch (e) {
      console.error("Error: ", e);
    }
  };
  clearForm = () => {
    document.getElementById("name").value = "";
    document.getElementById("city").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  };
  render() {
    const { JobCategory } = this.props.history.location.detail
      ? this.props.history.location.detail
      : "";
    // console.log("State === ", this.state);
    let { name, city, email, phone, error } = this.state;
    let {
      name: nameError,

      city: occError,
      email: emailError,
      phone: phoneError,
    } = this.state.errorMessage;
    return (
      <div className="a-course-register-form" id="register-form">
        <div className="main-content">
          <div className={this.state.part1 ? "intro" : "intro_off"}>
            <h1>Your Introduction</h1>
            <div className="radio-div">
              <div
                className={this.state.male ? "radio-male" : "radio-in"}
                onClick={() => this.handleMale()}
              >
                <img
                  src={male}
                  style={{ width: 50, height: 50, marginBottom: 5 }}
                />
                Male
              </div>
              <div
                className={this.state.female ? "radio-female" : "radio-in"}
                disabled={this.state.part2 === true ? false : true}
                onClick={() => this.handleFemale()}
              >
                <img
                  src={female}
                  style={{ width: 50, height: 50, marginBottom: 5 }}
                />
                Female
              </div>
            </div>
            <div class="a-upper-input">
              <div className="a-input-field">
                <label className="input-label">Name</label>
                <input
                  placeholder="Ahmed Mahenti"
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
                  disabled={this.state.part1 === true ? false : true}
                  type="text"
                  // placeholder="We need your full name"
                  style={{ fontFamily: "Lato", fontSize: 15, color: "#868686" }}
                  className="a-r-input-box a-r-input-box-first"
                />
                {!(!name && !nameError) && (
                  <p className="a-error-message">{nameError}</p>
                )}
              </div>
              <div className="a-input-field">
                <label className="input-label">Number</label>
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
                  disabled={this.state.part1 === true ? false : true}
                  type="text"
                  // placeholder="We need your full name"
                  style={{ fontFamily: "Lato", fontSize: 15, color: "#868686" }}
                  className="a-r-input-box a-r-input-box-first"
                />
                {!(!phone && !phoneError) && (
                  <p className="a-error-message">{phoneError}</p>
                )}
              </div>
              {/* <div className="a-input-field">
                <label className="input-label">City</label>
                <input
                  placeholder="Karachi"
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
                  disabled={this.state.part1 === true ? false : true}
                  // placeholder="We need your full name"
                  style={{ fontFamily: "Lato", fontSize: 15, color: "#868686" }}
                  className="a-r-input-box a-r-input-box-first"
                />
                {!(!city && !occError) && (
                  <p className="a-error-message">{occError}</p>
                )}
              </div>
              <div className="a-input-field">
                <label className="input-label">Email </label>
                <input
                  placeholder="abc@gmail.com"
                  id="email"
                  name="email"
                  onChange={(email) => {
                    this._handleChange(
                      emailCheck,
                      "emailValid",
                      "email",
                      email.target.value
                    );
                  }}
                  disabled={this.state.part1 === true ? false : true}
                  type="email"
                  // placeholder="We need your full name"
                  style={{ fontFamily: "Lato", fontSize: 15, color: "#868686" }}
                  className="a-r-input-box a-r-input-box-first"
                />
                {!(!email && !emailError) && (
                  <p className="a-error-message">{emailError}</p>
                )}
              </div> */}
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <button
                  type="button"
                  class="a-reg-btn"
                  onClick={() => this.handleNext1()}
                  disabled={this.state.part1 === true ? false : true}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className={this.state.part2 ? "work-exp" : "work-exp_off"}>
            <h1>Work Experience</h1>
            <div className="div-check">
              <select
                onChange={(e) => this.setState({ experience: e.target.value })}
                disabled={this.state.part2 === true ? false : true}
              >
                <option>0 year</option>
                <option>1 year</option>
                <option>2 years</option>
                <option>3-5 years</option>
                <option>5-10 years</option>
                <option>10+ years</option>
              </select>
              <select
                onChange={(e) => this.setState({ education: e.target.value })}
                disabled={this.state.part2 === true ? false : true}
              >
                <option>Below Matric</option>
                <option>Matric</option>
                <option>Intermediate</option>
                <option>Diploma</option>
                <option>Graduate</option>
                <option>Post Graduate</option>
              </select>
            </div>
            <h1>Interested in</h1>
            <div className="div-cb">
              <div style={{ fontSize: 18 }}>
                <input
                  disabled={this.state.part2 === true ? false : true}
                  type="checkbox"
                  onClick={() => this.handleCheck("Full-time")}
                />{" "}
                Full-time
              </div>
              <div style={{ fontSize: 18 }}>
                <input
                  disabled={this.state.part2 === true ? false : true}
                  type="checkbox"
                  onClick={() => this.handleCheck("Part-time")}
                />{" "}
                Part-time
              </div>
              <div style={{ fontSize: 18 }}>
                <input
                  disabled={this.state.part2 === true ? false : true}
                  type="checkbox"
                  onClick={() => this.handleCheck("Freelance")}
                />{" "}
                Freelance
              </div>
              <div style={{ fontSize: 18 }}>
                <input
                  disabled={this.state.part2 === true ? false : true}
                  type="checkbox"
                  onClick={() => this.handleCheck("Remote")}
                />{" "}
                Remote
              </div>
              <div style={{ fontSize: 18 }}>
                <input
                  disabled={this.state.part2 === true ? false : true}
                  type="checkbox"
                  onClick={() => this.handleCheck("Work from Home")}
                />{" "}
                Work from Home
              </div>
            </div>
            <h1>Your Current Salary</h1>
            <div className="div-range">
              <div class="slidecontainer">
                <div
                  className="div-value"
                  style={{ left: this.state.value_px + "%" }}
                ></div>
                <input
                  type="range"
                  min="1000"
                  max="300000"
                  defaultValue="27000"
                  step="500"
                  class="slider"
                  id="myRange"
                  disabled={this.state.part2 === true ? false : true}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <h3 style={{ backgroundColor: "white" }}>
                Rs. {this.state.value}
              </h3>
            </div>
            <div className="exp-btn">
              <button
                type="button"
                class="a-reg-btn"
                onClick={() => this.back()}
                disabled={this.state.part2 === true ? false : true}
              >
                Back
              </button>
              <button
                type="button"
                disabled={this.state.part2 === true ? false : true}
                class={"a-reg-btn"}
                onClick={() => this.handleNext2(JobCategory)}
              >
                Next
              </button>
            </div>
          </div>

          <div className="a-side-panel">
            {/* <img className="a-reg-img" src={signUpImg} /> */}
            <div className="a-side-text">
              <h1> Welcome to our community</h1>
              <br />
              <p className="a-c-side-para">
                We’re creating the next-gen community of storytellers, founders,
                dreamers, forward-thinkers, misfits, rebels, entrepreneurs,
                employees, investors, polyworkers, problem solvers, yay-sayers,
                coders, designers, freelancers, stargazers and storm-chasers.
              </p>
              <br />

              <div className="a-side-image-panel">
                <div className="a-side-images">
                  <img className="a-side-image" src={img1}></img>
                  <img className="a-side-image" src={img2}></img>
                  <img className="a-side-image" src={img3}></img>
                </div>

                {/* <p>
                  <span className="value">0</span> members have joined.
                </p> */}
              </div>
            </div>
          </div>

          {/* <div className="a-reg-frame">
          <img className="a-reg-frame-img" src={require("./pic.png")} />
        </div> */}

          <div className="w-vector-div">
            <img src={Vector1} className="w-vector-img" />
          </div>

          {/* <div className={this.state.part2 ? "work-exp" : "work-exp_off"}>
            <h1>Work Experience</h1>
            <div className="div-check">
              <select
                onChange={(e) => this.setState({ experience: e.target.value })}
                disabled={this.state.part2 === true ? false : true}
              >
                <option>0 year</option>
                <option>1 year</option>
                <option>2 years</option>
                <option>3-5 years</option>
                <option>5-10 years</option>
                <option>10+ years</option>
              </select>
              <select
                onChange={(e) => this.setState({ education: e.target.value })}
                disabled={this.state.part2 === true ? false : true}
              >
                <option>Below Matric</option>
                <option>Matric</option>
                <option>Intermediate</option>
                <option>Diploma</option>
                <option>Graduate</option>
                <option>Post Graduate</option>
              </select>
            </div>
            <h1>Interested in</h1>
            <div className="div-cb">
              <div style={{ fontSize: 18 }}>
                <input
                  disabled={this.state.part2 === true ? false : true}
                  type="checkbox"
                  onClick={() => this.handleCheck("Full-time")}
                />{" "}
                Full-time
              </div>
              <div style={{ fontSize: 18 }}>
                <input
                  disabled={this.state.part2 === true ? false : true}
                  type="checkbox"
                  onClick={() => this.handleCheck("Part-time")}
                />{" "}
                Part-time
              </div>
              <div style={{ fontSize: 18 }}>
                <input
                  disabled={this.state.part2 === true ? false : true}
                  type="checkbox"
                  onClick={() => this.handleCheck("Freelance")}
                />{" "}
                Freelance
              </div>
              <div style={{ fontSize: 18 }}>
                <input
                  disabled={this.state.part2 === true ? false : true}
                  type="checkbox"
                  onClick={() => this.handleCheck("Remote")}
                />{" "}
                Remote
              </div>
              <div style={{ fontSize: 18 }}>
                <input
                  disabled={this.state.part2 === true ? false : true}
                  type="checkbox"
                  onClick={() => this.handleCheck("Work from Home")}
                />{" "}
                Work from Home
              </div>
            </div>
            <h1>Your Current Salary</h1>
            <div className="div-range">
              <div class="slidecontainer">
                <div
                  className="div-value"
                  style={{ left: this.state.value_px + "%" }}
                ></div>
                <input
                  type="range"
                  min="1000"
                  max="300000"
                  defaultValue="27000"
                  step="500"
                  class="slider"
                  id="myRange"
                  disabled={this.state.part2 === true ? false : true}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <h3 style={{ backgroundColor: "white" }}>
                Rs. {this.state.value}
              </h3>
            </div>
            <div className="exp-btn">
              <button
                type="button"
                class="a-reg-btn"
                onClick={() => this.back()}
                disabled={this.state.part2 === true ? false : true}
              >
                Back
              </button>
              <button
                type="button"
                disabled={this.state.part2 === true ? false : true}
                class={"a-reg-btn"}
                onClick={() => this.handleNext2(JobCategory)}
              >
                Next
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}
// export default ReactGoogleSheets.connect(DataComponent);
export default withRouter(Introduction);
