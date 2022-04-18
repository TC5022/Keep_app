import { APIUrls } from "../helpers/urls";
import { getFormBody, getAuthToken } from "../helpers/utils";
import {
  ADD_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  SEARCH,
  UPDATE_NOTES,
} from "./actiontypes";
import { editLabelNote, removeNoteFromLabel } from "./label";

export function fetchNotes() {
  return (dispatch) => {
    const url = APIUrls.fetchNotes();
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(updateNotes(data.notes));
      });
  };
}

export function updateNotes(notes) {
  return {
    type: UPDATE_NOTES,
    notes,
  };
}

export function addNote(note) {
  return {
    type: ADD_NOTE,
    note,
  };
}

export function createNote(note) {
  const { title, content } = note;
  return (dispatch) => {
    const url = APIUrls.createNote();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.note) {
          dispatch(addNote(data.note));
        }
      });
  };
}

export function copyNote(noteId) {
  return (dispatch) => {
    const url = APIUrls.copyNote();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ noteId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.note) {
          dispatch(addNote(data.note));
        } else {
          console.log(data.message);
        }
      });
  };
}

export function editNote(title, content, noteId) {
  return (dispatch) => {
    const url = APIUrls.updateNote("edit");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ noteId, title, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.note) {
          dispatch(editSuccess(data.note, noteId));
          const labelArrayLength = data.note.labels.length;
          for (let a = 0; a < labelArrayLength; a++) {
            dispatch(editLabelNote(data.note.labels[a]._id, noteId, data.note));
          }
        } else {
          console.log(data.message);
        }
      });
  };
}

export function changeColor(color, noteId) {
  return (dispatch) => {
    const url = APIUrls.updateNote("color");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ noteId, color }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.note) {
          dispatch(editSuccess(data.note, noteId));
          const labelArrayLength = data.note.labels.length;
          for (let a = 0; a < labelArrayLength; a++) {
            dispatch(editLabelNote(data.note.labels[a]._id, noteId, data.note));
          }
        } else {
          console.log(data.message);
        }
      });
  };
}

export function addImage(imageSrc, noteId) {
  return (dispatch) => {
    const url = APIUrls.updateNote("image");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ noteId, imageSrc }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.note) {
          dispatch(editSuccess(data.note, noteId));
          const labelArrayLength = data.note.labels.length;
          for (let a = 0; a < labelArrayLength; a++) {
            dispatch(editLabelNote(data.note.labels[a]._id, noteId, data.note));
          }
        } else {
          console.log(data.message);
        }
      });
  };
}

export function editSuccess(newNote, id) {
  return {
    type: EDIT_NOTE,
    newNote,
    id,
  };
}

export function deleteNote(noteId) {
  return (dispatch) => {
    const url = APIUrls.deleteNote();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ noteId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(deleteSuccess(noteId));
          const labelArrayLength = data.labels.length;
          for (let a = 0; a < labelArrayLength; a++) {
            dispatch(removeNoteFromLabel(data.labels[a], noteId));
          }
        } else {
          console.log(data.message);
        }
      });
  };
}

export function deleteSuccess(id) {
  return {
    type: DELETE_NOTE,
    id,
  };
}

export function search(text) {
  return {
    type: SEARCH,
    text,
  };
}
