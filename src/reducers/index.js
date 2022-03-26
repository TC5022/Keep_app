import {
  ARCHIVE_NOTE,
  COPY_ARCHIVE,
  COPY_NOTE,
  CREATE_NOTE,
  DELETE_ARCHIVE,
  DELETE_NOTE,
  EDIT_NOTE,
  UNARCHIVE_NOTE,
} from "../actions";

const initialMoviesState = {
  notes: [],
  archives: [],
};

export default function notes(state = initialMoviesState, action) {
  switch (action.type) {
    case CREATE_NOTE:
      return {
        ...state,
        notes: [action.note, ...state.notes],
      };
    case DELETE_NOTE:
      const filteredNotes = state.notes.filter(
        (note, index) => index !== action.id
      );
      return { ...state, notes: filteredNotes };
    case EDIT_NOTE:
      const updatedNotes = [...state.notes];
      const index = updatedNotes.findIndex(note => note.id === action.id);
      updatedNotes[index] = action.newNote;

      return {
        ...state,
        notes: updatedNotes,
      };
    case COPY_NOTE:
      return {
        ...state,
        notes: [action.note, ...state.notes],
      };
    case ARCHIVE_NOTE:
      const filteredNote = state.notes.filter(
        (note, index) => index !== action.id
      );
      return {
        ...state,
        notes: filteredNote,
        archives: [action.note, ...state.archives],
      };
    case UNARCHIVE_NOTE:
      const filteredArchive = state.archives.filter(
        (note, index) => index !== action.id
      );
      return {
        ...state,
        notes: [action.note, ...state.notes],
        archives: filteredArchive,
      };
    case COPY_ARCHIVE:
      return {
        ...state,
        archives: [action.note, ...state.archives],
      };
    case DELETE_ARCHIVE:
      const filteredArchives = state.archives.filter(
        (note, index) => index !== action.id
      );
      return { ...state, archives: filteredArchives };
    default:
      return state;
  }
}
