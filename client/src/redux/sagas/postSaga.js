import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import { 
    POSTS_LOADING_FAILURE, 
    POSTS_LOADING_SUCCESS,
    POSTS_LOADING_REQUEST,
    POSTS_UPLOADING_REQUEST,
    POSTS_UPLOADING_SUCCESS,
    POSTS_UPLOADING_FAILURE,
    POSTS_DETAIL_LOADING_REQUEST,
    POSTS_DETAIL_LOADING_SUCCESS,
    POSTS_DETAIL_LOADING_FAILURE,
    POSTS_DELETE_REQUEST,
    POSTS_DELETE_SUCCESS,
    POSTS_DELETE_FAILURE,
} from '../types';

//All Posts load
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
        yield put(push("/"));
    }
}

//Post Upload 
const uploadPostsAPI = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;
    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return axios.post('/api/post', payload, config);
}

function* uploadPosts(action) {
    try {

        const result = yield call(uploadPostsAPI, action.payload);

        console.log(result, 'uploadPostAPI');
        
        yield put({
            type: POSTS_UPLOADING_SUCCESS,
            payload: result.data,
        });

        yield put(push(`/post/${result.data._id}`));
    } catch (e) {
        yield put({
            type: POSTS_UPLOADING_FAILURE,
            payload: e,
        });

        yield put(push("/"));
    }
}

//Post Detail
const loadPostDetailAPI = (payload) => {
    console.log(payload);
    return axios.get(`/api/post/${payload}`);
}

function* loadPostDetail(action) {
    try {
        const result = yield call(loadPostDetailAPI, action.payload);
        console.log(result, 'post_detail_saga_data');
        
        yield put({
            type: POSTS_DETAIL_LOADING_SUCCESS,
            payload: result.data
        });

    } catch (e) {
        yield put({
            type: POSTS_DETAIL_LOADING_FAILURE,
            payload: e,
        });

        yield put(push("/"));
    }
}

//Post Delete
const deletePostAPI = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const token = payload.token;

    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return axios.delete(`/api/post/${payload.id}`, config);
}

function* deletePost(action) {
    try {
        const result = yield call(deletePostAPI, action.payload);
        
        yield put({
            type: POSTS_DELETE_SUCCESS,
            payload: result.data
        });
        yield put(push("/"));
    } catch (e) {
        yield put({
            type: POSTS_DELETE_FAILURE,
            payload: e,
        });
    }
}

function* watchLoadPosts() {
    yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

function* watchUploadPosts() {
    yield takeEvery(POSTS_UPLOADING_REQUEST, uploadPosts);
}

function* watchLoadPostDetail() {
    yield takeEvery(POSTS_DETAIL_LOADING_REQUEST, loadPostDetail);
}

function* watchDeletePost() {
    yield takeEvery(POSTS_DELETE_REQUEST, deletePost);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchUploadPosts),
        fork(watchLoadPostDetail),
        fork(watchDeletePost),
    ]);
}