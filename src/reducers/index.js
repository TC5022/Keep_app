import { combineReducers } from "redux";
import notes from "./notes";
import labels from "./labels";

export default combineReducers({
  notes,
  labels
});
