import {
  ADD_LABEL,
  UPDATE_LABELS,
  EDIT_LABEL_NOTE,
  ADD_NOTE_TO_LABEL,
  REMOVE_NOTE_FROM_LABEL,
  DELETE_LABEL
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
      case ADD_NOTE_TO_LABEL:
        let updatedLabels = [...state];
        let labelindex = updatedLabels.findIndex(
          (label) => label._id === action.labelId
        );
        let updatedNotesArray = [
          ...updatedLabels[labelindex].notes,
          action.note,
        ];
        updatedLabels[labelindex].notes = updatedNotesArray;
        return updatedLabels;
      case REMOVE_NOTE_FROM_LABEL:
        updatedLabels = [...state];
        labelindex = updatedLabels.findIndex(
          (label) => label._id === action.labelId
        );
        updatedNotesArray = updatedLabels[labelindex].notes.filter(
          (note) => note._id !== action.noteId
        );
        updatedLabels[labelindex].notes = updatedNotesArray;
        return updatedLabels;
      case DELETE_LABEL:
        updatedLabels = state.filter((label) => label._id !== action.labelId)
        return updatedLabels;
      default:
        return state;
    }
}
