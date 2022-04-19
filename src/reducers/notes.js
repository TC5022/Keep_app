import {
  COPY_NOTE,
  ADD_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  SEARCH,
  UPDATE_NOTES,
} from "../actions/actiontypes";

const initialState = {
  notes: [],
  searchText: "",
};

export default function notes(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.note, ...state.notes],
      };
    case DELETE_NOTE:
      const filteredNotes = state.notes.filter(
        (note) => note._id !== action.id
      );
      return { ...state, notes: filteredNotes };
    case EDIT_NOTE:
      const updatedNotes = [...state.notes];
      const index = updatedNotes.findIndex((note) => note._id === action.id);
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
    case SEARCH:
      return {
        ...state,
        searchText: action.text,
      };
    default:
      return state;
  }
}
