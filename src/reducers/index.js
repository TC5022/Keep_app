import { combineReducers } from "redux";
import notes from "./notes";
import labels from "./labels";
import auth from "./auth";

export default combineReducers({
  notes,
  labels,
  auth
});
