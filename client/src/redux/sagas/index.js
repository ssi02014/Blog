import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import dotenv from 'dotenv';
import postSaga from './postSaga';
import authSaga from './authSaga';


dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

//제너레이터
export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(postSaga),
    ]);
}