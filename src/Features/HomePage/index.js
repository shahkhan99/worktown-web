import React from "react";
import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";

import "./homeStyles.css";
import Logo from "../../assets/Logo/logo.png";
import simpleLogo from "../../assets/Logo/simpleLogo.png";
import Vector1 from "../../assets/Vectors/vector1.png";
import Vector9 from "../../assets/Vectors/vector9.png";
import ArrowIcon from "../../assets/icons/up-arrow.png";

import TextTransition, { presets } from "react-text-transition";

class HomePage extends React.Component {
  state = {
    index: 0,
    animatedStrings: [
      " client ",
      " job ",
      " cofounder ",
      " employee ",
      " employer ",
      " investor ",
      " colleague ",
    ],
    content: [
      {
        id: 1,
        tittle: "Land your first",
        body: "We can’t promise that you will immediately, but if you stick around, you’ll see and meet remarkable people who aren’t any different from you.",
        vector: Vector1,
        colorCode: "#3D459D",
      },
      {
        id: 2,
        tittle: "Community-first ",
        unstyled: " from the ground up",
        body: "We’re creating a super community of storytellers, founders, dreamers, forward-thinkers, misfits, rebels, entrepreneurs, graduates, employees, investors, polyworkers, problem solvers, yay-sayers, coders, designers, freelancers, stargazers and storm-chasers.",
        vector: Vector1,
        colorCode: "#F0BD3A",
      },
      {
        id: 3,
        tittle: "A not-so-professional network",
        body: "Professional networks are decades old and feel out-of-place. Worktown wants to make it exciting and relevant. And we think everyone’s smart enough to know what works for them.",
        vector: Vector1,
        colorCode: "#128779",
      },
      {
        id: 4,
        tittle: "Where you’re not defined by your job title",
        body: "That is a super-narrow expression of who you are. With Worktown, let the world know how much more you bring to the table than the arbitrary job titles and descriptions that don't fit your work.",
        vector: Vector1,
        colorCode: "#F15925",
      },
      {
        id: 5,
        tittle: "Why limit the way people see you?",
        body: "Resumes are two-dimensional – they don’t talk much about who you are and how you’ve had to work your socks off to get to where you are. Worktown helps you show them what makes you ‘you’.",
        vector: Vector1,
        colorCode: "#81B541",
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
  };
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

  render() {
    return (
      <ReactFullpage
        scrollOverflow={true}
        sectionsColor={["#FF9772"]}
        onLeave={this.onLeave.bind(this)}
        afterLoad={this.afterLoad.bind(this)}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className="section section1">
                <div className="header">
                  <div className="top">
                    <div className="logo">
                      <img src={Logo} className="header-logo" />
                    </div>
                    <div className="wait-button">
                      <a href="/waitList" className="wait-btn">
                        Join the waitlist
                      </a>
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
                      <div className="transparent-bg">
                        {/* <div
                          className="logo"
                          style={{
                            position: "absolute",
                            left: "10px",
                            top: "10px",
                          }}
                        >
                          <img src={simpleLogo} className="simple-logo" />
                        </div> */}
                        <div
                          className="text-div"
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
                          )}
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
                      </div>
                      <div
                        className="color-bg"
                        style={{ background: item.colorCode }}
                      ></div>
                      <div
                        className="vector-div"
                        style={
                          i % 2 == 0
                            ? { justifyContent: "flex-end" }
                            : { justifyContent: "flex-start" }
                        }
                      >
                        <img src={item.vector} className="vector-img" />
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
                      <a href="/waitList" className="wait-btn">
                        Join the waitlist
                      </a>
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

// setTimeout(() => {
//   this.setState({ timePassed: true });
// }, 3700);
// if (this.state.timePassed){

// }
// else {
//   return (
//     <div className="welcome-div">
//       <img
//         src={GifLogo}
//         width="600px"
//         height="500px"
//         className="welcome-img"
//       />
//     </div>
//   );
// }
