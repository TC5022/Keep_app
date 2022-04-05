const API_ROOT = "http://localhost:8000/v1";

export const APIUrls = {
  login: () => `${API_ROOT}/user/login`,
  signup: () => `${API_ROOT}/user/register`
};