import { CREATE_NOTE, DELETE_NOTE, EDIT_NOTE } from "../actions";

const initialMoviesState = {
  notes: [],
};

export default function notes(state = initialMoviesState, action) {
  switch (action.type) {
    case CREATE_NOTE:
      return {
        ...state,
        notes: [action.note, ...state.notes],
      };
    case DELETE_NOTE:
      const filteredNotes = state.notes.filter((note, index) => index !== action.id);
      return {...state, notes: filteredNotes };
    case EDIT_NOTE:
      const updatedNotes = [...state.notes];
      updatedNotes[action.id] = action.newNote;

      return {
        ...state,
        notes: updatedNotes,
      };
    default:
      return state;
  }
}