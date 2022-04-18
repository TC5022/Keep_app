import { editSuccess } from ".";
import { APIUrls } from "../helpers/urls";
import { getFormBody, getAuthToken } from "../helpers/utils";
import { ADD_LABEL, UPDATE_LABELS, EDIT_LABEL_NOTE } from "./actiontypes";

export function createLabel(noteId, labelName) {
  return (dispatch) => {
    const url = APIUrls.createLabel();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ noteId, labelName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.label) {
          dispatch(editSuccess(data.note, noteId));
          dispatch(addLabel(data.label));
           const labelArrayLength = data.note.labels.length;
           for (let a = 0; a < labelArrayLength; a++) {
             dispatch(
               editLabelNote(data.note.labels[a]._id, noteId, data.note)
             );
           }
        } else {
          console.log(data.message);
        }
      });
  };
}

export function addLabel(label) {
  return {
    type: ADD_LABEL,
    label,
  };
}

export function fetchLabels() {
  return (dispatch) => {
    const url = APIUrls.fetchLabels();
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.labels){
          dispatch(updateLabels(data.labels));
        }else{
          console.log(data.message);
        }
      });
  };
}

export function updateLabels(labels) {
  return {
    type: UPDATE_LABELS,
    labels,
  };
}

export function editLabelNote(labelId, noteId, newNote) {
  return {
    type: EDIT_LABEL_NOTE,
    labelId,
    noteId,
    newNote
  };
}
