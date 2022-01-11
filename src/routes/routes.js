import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import {createBrowserHistory, CreateBrowserHistory} from 'history';
// import ProtectedRoute from "./protectedRoute";

import { AppSignUp, HomePage, Introduction, JobCategory } from "./index";

let Routes = () => {
  return (
    <Router basename="/">
      <Switch>
        {/* <Route path="/" exact component={LandingPage} />
        <Route path="/story" exact component={StoryPage} />
        <Route path="/plans" exact component={PlansPage} />
        <Route path="/community" exact component={CommunityPage} />
        <Route path="/academy" exact component={AcademyPage} />
        <Route path="/academy/:id" exact component={EnrollNowPage} />
        <Route path="/merch" exact component={MerchPage} />
        <Route path="/merch/:id" exact component={MerchProduct} /> 
         <Route path="/academy/register" component={AcademyRegisterPage} />
        <Route path="/payment" component={PaymentPage} />
        <Route path="/blogs/:id" component={BlogPage} />
        <Route path="/@dm!n/login" component={AdminLogin} />
        <Route path="/cfo" component={CFOPage} /> */}

        <Route path="/" exact component={HomePage} />
        <Route path="/waitList" exact component={AppSignUp} />
        <Route path="/intro" exact component={Introduction} />
        <Route path="/jobcategory" exact component={JobCategory} />

        {/* <ProtectedRoute path="/@dm!n" component={IndividualDashboard} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
