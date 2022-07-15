import { combineReducers } from "redux";
import dashboard_auth_reducer from "./dashboard_auth_reducer";
import navigation_reducer from "./navigation_reducer";

var state = combineReducers({
  dashboard_auth: dashboard_auth_reducer,
  navigation_reducer: navigation_reducer,
});

export default state;
