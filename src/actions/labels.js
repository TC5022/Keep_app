import { editSuccess } from "./notes";
import { APIUrls } from "../helpers/urls";
import { getFormBody, getAuthToken } from "../helpers/utils";
import {
  ADD_LABEL,
  UPDATE_LABELS,
  EDIT_LABEL_NOTE,
  ADD_NOTE_TO_LABEL,
  REMOVE_NOTE_FROM_LABEL,
  DELETE_LABEL,
} from "./actiontypes";

export function createNoteLabel(noteId, labelName) {
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

export function newLabel(labelName) {
  return (dispatch) => {
    const url = APIUrls.newLabel();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ labelName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.label) {
          dispatch(addLabel(data.label));
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

export function removeLabelFromNote(noteId, labelId) {
  return (dispatch) => {
    const url = APIUrls.removeLabelFromNote();
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
          dispatch(removeNoteFromLabel(labelId, noteId));
          const labelArrayLength = data.note.labels.length;
          for (let a = 0; a < labelArrayLength; a++) {
            if (data.note.labels[a]._id !== labelId) {
              dispatch(
                editLabelNote(data.note.labels[a]._id, noteId, data.note)
              );
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

export function deleteLabel(labelId) {
  return (dispatch) => {
    const url = APIUrls.deleteLabel();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ labelId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(deleteLabelSuccess(labelId));
          const notesArrayLength = data.notes.length;
          for (let a = 0; a < notesArrayLength; a++) {
            dispatch(editSuccess(data.notes[a], data.notes[a]._id));
            for(let b=0; b<data.notes[a].labels.length; b++){
              dispatch(
                editLabelNote(
                  data.notes[a].labels[b]._id,
                  data.notes[a]._id,
                  data.notes[a]
                )
              );
            }
          }
        } else {
          console.log(data.message);
        }
      });
  };
}

export function deleteLabelSuccess(labelId) {
  return {
    type: DELETE_LABEL,
    labelId
  }
} 
