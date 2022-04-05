import {
  ADD_NOTES,
  CREATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  COPY_NOTE,
  ARCHIVE_NOTE,
  UNARCHIVE_NOTE,
  DELETE_ARCHIVE,
  COPY_ARCHIVE,
  SEARCH,
} from "./actiontypes";

export function addNotes(notes) {
  return {
    type: ADD_NOTES,
    notes,
  };
}

export function createNote(note) {
  return {
    type: CREATE_NOTE,
    note,
  };
}

export function deleteNote(id) {
  return {
    type: DELETE_NOTE,
    id,
  };
}

export function editNote(newNote, id) {
  return {
    type: EDIT_NOTE,
    newNote,
    id,
  };
}

export function copyNote(note) {
  return {
    type: COPY_NOTE,
    note,
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
