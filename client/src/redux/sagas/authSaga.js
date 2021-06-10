import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_REQUEST,
  PASSWORD_EDIT_UPLOADING_REQUEST,
  PASSWORD_EDIT_UPLOADING_SUCCESS,
  PASSWORD_EDIT_UPLOADING_FAILURE,
} from "../types";

//  Login
function loginUserAPI(loginData) {
  console.log(loginData, "loginData");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/auth", loginData, config);
}

function* loginUser(action) {
  try {
    //action.payload: {email: ~, password: ~}
    const result = yield call(loginUserAPI, action.payload);

    console.log(result);

    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    }); //성공 액션 dispatch
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    }); //실패 액션 dispatch
  }
}

//  Logout
function* logout(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    }); //성공 액션 dispatch
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
    console.log(e);
  }
}

//  User Loading
function userLoadingAPI(token) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("/api/auth/user", config);
}

function* userLoading(action) {
  try {
    console.log(action, "userLoading");
    const result = yield call(userLoadingAPI, action.payload);

    console.log(result);

    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    }); //성공 액션 dispatch
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    }); //실패 액션 dispatch
  }
}

//  Register
function registerUserAPI(registerData) {
  return axios.post("/api/user", registerData);
}

function* registerUser(action) {
  try {
    //action.payload: {email: ~, password: ~}
    const result = yield call(registerUserAPI, action.payload);

    console.log(result, "Register User Data");

    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    }); //성공 액션 dispatch
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    }); //실패 액션 dispatch
  }
}

//  Edit Password
function EditPasswordAPI(payload) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  console.log(payload);

  return axios.post(`/api/user/${payload.userName}/profile`, payload, config);
}

function* EditPassword(action) {
  try {
    //action.payload: {email: ~, password: ~}
    const result = yield call(EditPasswordAPI, action.payload);

    console.log(result);

    yield put({
      type: PASSWORD_EDIT_UPLOADING_SUCCESS,
      payload: result,
    }); //성공 액션 dispatch
  } catch (e) {
    yield put({
      type: PASSWORD_EDIT_UPLOADING_FAILURE,
      payload: e.response,
    }); //실패 액션 dispatch
  }
}

//  clear Error
function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    }); //성공 액션 dispatch
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    }); //실패 액션 dispatch
  }
}

function* watchLoginUser() {
  //LOGIN_REQUEST가 있으면 loginUser를 실행해라 라는 뜻
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

function* watchLoadingUser() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

function* watchEditPassword() {
  yield takeEvery(PASSWORD_EDIT_UPLOADING_REQUEST, EditPassword);
}

function* watchClearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

//authSaga() 여러 Saga 통합
export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchLoadingUser),
    fork(watchRegisterUser),
    fork(watchEditPassword),
    fork(watchClearError),
  ]);
}
