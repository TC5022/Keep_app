const API_ROOT = "http://localhost:8000/v1";

export const APIUrls = {
  login: () => `${API_ROOT}/user/login`,
  signup: () => `${API_ROOT}/user/register`,
  fetchNotes: () => `${API_ROOT}/`,
  createNote: () => `${API_ROOT}/note/create`,
  copyNote: () => `${API_ROOT}/note/copy`,
  deleteNote: () => `${API_ROOT}/note/delete`,
  updateNote: (query) => `${API_ROOT}/note/update/${query}`,
};