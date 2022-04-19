import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
} from "./actiontypes";
import { fetchLabels } from "./labels";
import { fetchNotes } from "./notes";

export function loginFailed(errormessage) {
  return {
    type: LOGIN_FAIL,
    error: errormessage,
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

export function login(email, password) {
  return (dispatch) => {
    const url = APIUrls.login();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
        //   dispatch an action to save the user
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user.name);
          dispatch(loginSuccess(data.user));
          dispatch(fetchNotes());
          dispatch(fetchLabels());
          return;
        }
        dispatch(loginFailed(data.message));
        console.log("error in logging in");
      });
  };
}

export function signup(name, email, password) {
  return (dispatch) => {
    const url = APIUrls.signup();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.success) {
          //dispatch an action to save the user
          localStorage.setItem("token", data.token);
          dispatch(signupSuccess(data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

export function signupFailed(errormessage) {
  return {
    type: SIGNUP_FAIL,
    error: errormessage,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}
