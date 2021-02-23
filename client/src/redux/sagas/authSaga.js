import axios from 'axios';
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
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
} from '../types';

//  Login
function loginUserAPI(loginData) {
    console.log(loginData, "loginData");
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return axios.post('/api/auth', loginData, config);
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

function* watchLoginUser() {
    //LOGIN_REQUEST가 있으면 loginUser를 실행해라 라는 뜻
    yield takeEvery(LOGIN_REQUEST, loginUser);
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

function* watchLogout() {
    yield takeEvery(LOGOUT_REQUEST, logout);
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
    return axios.get('/api/auth/user', config);
}

function* userLoading(action) {
    try {
        console.log(action,"userLoading");
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

function* watchLoadingUser() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

//  Register
function registerUserAPI(registerData) {
    return axios.post('/api/user', registerData);
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

function* watchRegisterUser() {
    yield takeEvery(REGISTER_REQUEST, registerUser);
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
        fork(watchClearError),
    ]);
}