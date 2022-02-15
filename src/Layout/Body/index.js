import React, { Component } from "react";
import Routes from "../../routes/routes";

export default class Body extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Routes />
      </div>
    );
  }
}
