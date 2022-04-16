import { APIUrls } from "../helpers/urls";
import { getFormBody, getAuthToken } from "../helpers/utils";
import {
  ADD_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  ARCHIVE_NOTE,
  UNARCHIVE_NOTE,
  DELETE_ARCHIVE,
  COPY_ARCHIVE,
  SEARCH,
  UPDATE_NOTES,
} from "./actiontypes";

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
  const {title, content} = note;
  return (dispatch) => {
    const url = APIUrls.createNote();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({title, content}),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.note){
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
      body: getFormBody({noteId}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.note) {
          dispatch(addNote(data.note));
        }else{
          console.log(data.message);
        }
      });
  };
}

export function editNote(title, content, noteId) {
  return (dispatch) => {
    const url = APIUrls.editNote();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({noteId, title, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.note) {
          dispatch(editSuccess(data.note, noteId));
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

export function archiveNote(note, id) {
  return {
    type: ARCHIVE_NOTE,
    note,
    id,
  };
}

export function unarchiveNote(note, id) {
  return {
    type: UNARCHIVE_NOTE,
    note,
    id,
  };
}

export function deleteArchive(id) {
  return {
    type: DELETE_ARCHIVE,
    id,
  };
}

export function copyArchive(note) {
  return {
    type: COPY_ARCHIVE,
    note,
  };
}

export function search(text) {
  return {
    type: SEARCH,
    text,
  };
}
