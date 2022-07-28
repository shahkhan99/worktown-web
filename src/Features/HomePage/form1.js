import React, { Component } from "react";
import { getDatabase } from "firebase/database";
// import { set, ref, get, child } from "@firebase/database";
import firebase from "../../config/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const db = ref(getDatabase());

export default class Form1 extends Component {
  render() {
    const ctx = this.props.ctx;
    const fullpageApi = this.props.fullpageApi;
    const data = this.props.data;
    // console.log(ctx);
    return (
      <div className="form1">
        <h1>Select Job Category</h1>
        {/* <a
          // className="change-a"
          onClick={
            this.state.employee
              ? () => {}
              : this.state.employer
              ? () => {}
              : () => {
                  this.handleNoEmp(fullpageApi);
                }
          }
        > */}

        {ctx.state.card.map((v, i) => (
          <div
            // isDisabled={
            //   this.state.employer
            //     ? false
            //     : this.state.employee
            //     ? false
            //     : true
            // }
            className="card"
            onClick={
              v.name === "Software & IT Jobs"
                ? () => ctx.handleCard(fullpageApi, v)
                : () =>
                    alert("Telecaller & Call Center Jobs are coming soon...")
            }
            style={
              v.name === "Telecaller & Call Center Jobs"
                ? { opacity: 0.5 }
                : v.name === "Software & IT Jobs" && ctx.state.sw
                ? {
                    backgroundColor: "rgba(240, 189, 58, 0.45)",
                  }
                : ctx.state.noCategory
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
        {/* </a> */}
      </div>
    );
  }
}
