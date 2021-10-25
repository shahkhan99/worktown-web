import React from "react";
import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";

import "./homeStyles.css";
import Logo from "../../assets/Logo/logo.png";
import simpleLogo from "../../assets/Logo/simpleLogo.png";
import Vector1 from "../../assets/Vectors/vector1.png";
import Vector9 from "../../assets/Vectors/vector9.png";

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
        body: "We can’t promise that you will immediately, but if you stick around, you’ll see and meet remarkable people who aren’t any different from you",
        vector: Vector1,
        colorCode: "#3D459D",
      },
      {
        id: 2,
        tittle: "Community-first from the ground up",
        body: "We’re creating a super community of storytellers, founders, dreamers, forward-thinkers, misfits, rebels, entrepreneurs, graduates, employees, investors, polyworkers, problem solvers, yay-sayers, coders, designers, freelancers, stargazers and storm-chasers",
        vector: Vector1,
        colorCode: "#FFCB08",
      },
      {
        id: 3,
        tittle: "A not-so-professional network",
        body: "Professional networks are decades old and feel out-of-place - Worktown wants to make them exciting and relevant. And we think everyone’s smart enough to get their voice heard",
        vector: Vector1,
        colorCode: "#128779",
      },
      {
        id: 4,
        tittle: "Where you’re not defined by your job title",
        body: "That is a super-narrow expression of who you are. Let the world know how much more you can bring to the table than a piece of paper",
        vector: Vector1,
        colorCode: "#CC2F42",
      },
      {
        id: 5,
        tittle: "Why limit the way people see you?",
        body: "Resumes are two-dimensional – they don’t talk much about who you are and how you’ve had to work your socks off to get to where you are. Worktown helps you show them what makes you ‘you’",
        vector: Vector1,
        colorCode: "#81B541",
      },
      {
        id: 6,
        tittle: "Showcase the real ‘you’",
        body: "We stay true to who we are. We live on our own terms and are not destined for a single-track identity. Ever stopped to wonder that you do more than one type of work? With Worktown, you don’t have to worry about job titles and descriptions that don't fit your work - add projects, highlights, list your wins (even failures), humble beginnings that reveal your truly authentic self",
        vector: Vector1,
        colorCode: "#F15925",
      },
      {
        id: 4,
        tittle: "Fall in love with work all over again",
        body: "The work we do is an extension of ourselves and the people around us. We want to work and live on our own terms, and are not destined for a single-track identity.",
        vector: Vector1,
        colorCode: "#73203E",
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
        2000
        // every 3 seconds
      );
    }
  }
  // componentDidMount() {
  //   this.intervalId = setInterval(
  //     this.setState({ index: this.state.index + 1 }),
  //     3000 // every 3 seconds
  //   );
  // }

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
                      <button
                        className="wait-btn"
                        onClick={() => window.open(`/waitList`, "_self")}
                      >
                        Join the waitlist
                      </button>
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
                            <h1>{item.tittle}</h1>
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
                    <img src={Vector9} className="last-vector-image" />
                  </div>
                  <div className="last-line">
                    <div className="logo">
                      <img src={simpleLogo} className="simple-logo" />
                      <p className="last-text">
                        Worktown is a registered trademark. All Rights reserved
                      </p>
                    </div>
                    <div className="wait-button">
                      <button
                        className="wait-btn"
                        onClick={() => window.open(`/waitList`, "_self")}
                      >
                        Join the waitlist
                      </button>
                    </div>
                  </div>
                </div>
                {/* <button onClick={() => fullpageApi.moveTo(2, 0)}>
                  Move top
                </button> */}
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
