import { combineReducers } from "redux";
import dashboard_auth_reducer from "./dashboard_auth_reducer";

var state = combineReducers({
  dashboard_auth: dashboard_auth_reducer,
});

export default state;
