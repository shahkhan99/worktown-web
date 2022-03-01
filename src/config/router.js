import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Left_navigation from "../Components/LeftNavigation/navigation";
import Home from "../Components/HomeContent/home";

function WTRouter() {
  return (
    <div style={{ height: "100%", display: "flex" }}>
      {/* <Router>
        <Switch>
          <Route
            exact
            path={["employer_dashboard", "employer_dashboard/home"]}
            component={Home}
          />
          <Route
            exact
            path="employer_dashboard/create_contract"
            component={CreateContract}
          />
        </Switch>
      </Router> */}
      {/* <Home /> */}
      {/* <CreateContract /> */}
    </div>
  );
}

export default WTRouter;
