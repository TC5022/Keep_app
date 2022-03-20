export const ADD_NOTES = "ADD_NOTES";
export const CREATE_NOTE = "CREATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";

export function addNotes(notes){
    return{
        type: ADD_NOTES,
        notes
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

export function editNode(newNote, id){
  return {
    type: EDIT_NOTE,
    newNote,
    id
  };
}