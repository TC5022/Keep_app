const API_ROOT = process.env.API_URL;

export const APIUrls = {
  login: () => `${API_ROOT}/user/login`,
  signup: () => `${API_ROOT}/user/register`,
  fetchNotes: () => `${API_ROOT}/`,
  createNote: () => `${API_ROOT}/note/create`,
  copyNote: () => `${API_ROOT}/note/copy`,
  deleteNote: () => `${API_ROOT}/note/delete`,
  updateNote: (query) => `${API_ROOT}/note/update/${query}`,
  createLabel: () => `${API_ROOT}/labels/create`,
  fetchLabels: () => `${API_ROOT}/labels/`,
  addLabelToNote: () => `${API_ROOT}/labels/addLabel`,
  removeLabelFromNote: () => `${API_ROOT}/labels/remove`,
  newLabel: () => `${API_ROOT}/labels/new`,
  deleteLabel: () => `${API_ROOT}/labels/delete`,
};