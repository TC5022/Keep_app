import {
  ADD_LABEL,
  UPDATE_LABELS,
  EDIT_LABEL_NOTE,
} from "../actions/actiontypes";


export default function labels(state = [], action) {
    switch (action.type) {
      case UPDATE_LABELS:
        return action.labels;
      case ADD_LABEL:
        return [...state, action.label];
      case EDIT_LABEL_NOTE:
        const updatedState = [...state];
        const labelIndex = updatedState.findIndex(
          (label) => label._id === action.labelId
        );
        const updatedNotes = [...updatedState[labelIndex].notes];
        const noteIndex = updatedNotes.findIndex(
          (note) => note._id === action.noteId
        );
        updatedNotes[noteIndex] = action.newNote;
        updatedState[labelIndex].notes = updatedNotes;
        return updatedState;
      default:
        return state;
    }
}

//  const updatedNotes = [...state.notes];
//  const index = updatedNotes.findIndex((note) => note._id === action.id);
//  updatedNotes[index] = action.newNote;