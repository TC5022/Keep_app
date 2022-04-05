import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";
import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS, LOG_OUT, SIGNUP_FAIL, SIGNUP_START, SIGNUP_SUCCESS } from "./actiontypes";

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errormessage) {
  return {
    type: LOGIN_FAIL,
    error: errormessage,
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
          dispatch(loginSuccess(data.user));
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

export function startSignup() {
  return {
    type: SIGNUP_START,
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
