import axios from 'axios';
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../types';

//Login
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
    yield takeEvery(LOGIN_REQUEST, loginUser);
}

export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
    ]);
}