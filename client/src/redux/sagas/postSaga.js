import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import { 
    POSTS_LOADING_FAILURE, 
    POSTS_LOADING_SUCCESS,
    POSTS_WRITE_REQUEST 
} from '../types';

const loadPostsAPI = () => {
    return axios.get('/api/post');
}

function* loadPosts() {
    try {
        const result = yield call(loadPostsAPI);
        console.log(result, "loadPosts");

        yield put({
            type: POSTS_LOADING_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: POSTS_LOADING_FAILURE,
            payload: e,
        })
        yield push("/");
    }
}

function* watchLoadPosts() {
    yield takeEvery(POSTS_WRITE_REQUEST, loadPosts);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts)
    ]);
}