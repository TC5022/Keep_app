import { editSuccess } from ".";
import { APIUrls } from "../helpers/urls";
import { getFormBody, getAuthToken } from "../helpers/utils";
import { ADD_LABEL, UPDATE_LABELS, EDIT_LABEL_NOTE, ADD_NOTE_TO_LABEL, REMOVE_NOTE_FROM_LABEL } from "./actiontypes";

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

export function addLabelToNote(noteId, labelId) {
  return (dispatch) => {
    const url = APIUrls.addLabelToNote();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ noteId, labelId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.label) {
          dispatch(editSuccess(data.note, noteId));
          dispatch(addNoteToLabel(labelId, data.note));
          const labelArrayLength = data.note.labels.length;
          for (let a = 0; a < labelArrayLength; a++) {

            if(data.note.labels[a]._id !== labelId){
              dispatch(editLabelNote(data.note.labels[a]._id, noteId, data.note));
            }
          }
        } else {
          console.log(data.message);
        }
      });
  };
}

export function addNoteToLabel(labelId, note){
  return {
    type: ADD_NOTE_TO_LABEL,
    labelId,
    note
  }
}

export function removeNoteFromLabel(labelId, noteId){
  return {
    type: REMOVE_NOTE_FROM_LABEL,
    labelId,
    noteId
  }
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
