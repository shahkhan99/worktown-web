import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import signUpImg from "../../assets/images/signup.png";
import programmer from "../../assets/icons/programmer.png";
import operator from "../../assets/icons/bank.png";
import right from "../../assets/images/right.png";
import Vector1 from "../../assets/Vectors/vector1.png";
import Logo from "../../assets/Logo/logo.png";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
// CSS
import "./style.css";

class JobCategory extends Component {
  state = {
    card: [
      {
        id: 0,
        img: programmer,
        name: "Software & IT Jobs",
      },
      {
        id: 1,
        img: operator,
        name: "Telecaller, CSR, Call Center Jobs",
      },
    ],
  };
  //   handleClick = (name) => {
  //     this.props.history.push("/intro", (data = { category: name }));
  //   };
  render() {
    return (
      <div className="a-course-register-form" id="register-form">
        <div className="main-content">
          <div className="intro">
            <h1>Select Job Category</h1>
            {this.state.card.map((v, i) => (
              <Link
                to={{
                  pathname: "/intro",
                  detail: { JobCategory: v.name },
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="card">
                  <img
                    src={v.img}
                    style={{
                      width: 70,
                      height: 70,
                      marginBottom: 5,
                    }}
                  />
                  <h4 style={{ fontSize: 30, marginTop: 15, marginBottom: 15 }}>
                    {v.name}
                  </h4>
                  <img
                    src={right}
                    style={{
                      width: 50,
                      height: 50,
                      marginBottom: 5,
                      position: "relative",
                      left: "40%",
                    }}
                  />
                </div>
              </Link>
            ))}
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

          <div className="w-vector-div">
            <img src={Vector1} className="w-vector-img" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(JobCategory);
