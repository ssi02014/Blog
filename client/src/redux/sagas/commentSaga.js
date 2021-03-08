import axios from 'axios';
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { 
    COMMENT_LOADING_FAILURE,
    COMMENT_LOADING_REQUEST, 
    COMMENT_LOADING_SUCCESS, 
    COMMENT_UPLOADING_FAILURE, 
    COMMENT_UPLOADING_REQUEST, 
    COMMENT_UPLOADING_SUCCESS 
} from '../types';

//Load Comment
const loadCommentsAPI = payload => {
    console.log(payload, 'loadCommentAPI ID');

    return axios.get(`/api/post/${payload}/comments`);
};

function* loadComments(action) {
    try {
        const result = yield call(loadCommentsAPI, action.payload);

        console.log(result);

        yield put({
            type: COMMENT_LOADING_SUCCESS,
            payload: result.data,
        })
    } catch (e) { 
        console.log(e);

        yield put({
            type: COMMENT_LOADING_FAILURE,
            payload: e,
        });

        yield put(push("/"));
    }
}

//UpLoad Comment
const upLoadCommetsAPI = payload => {
    console.log(payload.id, 'upLoadCommetsAPI ID');
    return axios.post(`/api/post/${payload.id}/comments`, payload);
};

function* upLoadCommets(action) {
    try {
        const result = yield call(upLoadCommetsAPI, action.payload);

        console.log(result, "UploadComment");

        yield put({
            type: COMMENT_UPLOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) { 
        console.log(e);

        yield put({
            type: COMMENT_UPLOADING_FAILURE,
            payload: e,
        });

        yield put(push("/"));
    }
}

function* watchLoadComments() {
    yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
}

function* watchUpLoadComments() {
    yield takeEvery(COMMENT_UPLOADING_REQUEST, upLoadCommets);
}

//여러 Saga 통합
export default function* commentSaga() {
    yield all([
        fork(watchLoadComments),
        fork(watchUpLoadComments),
    ]);
}