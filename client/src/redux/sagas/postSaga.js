import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";
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
  POSTS_EDIT_LOADING_REQUEST,
  POSTS_EDIT_LOADING_SUCCESS,
  POSTS_EDIT_LOADING_FAILURE,
  POSTS_EDIT_UPLOADING_SUCCESS,
  POSTS_EDIT_UPLOADING_FAILURE,
  POSTS_EDIT_UPLOADING_REQUEST,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  CATEGORY_FIND_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from "../types";

//All Posts load
const loadPostsAPI = () => {
  return axios.get("/api/post");
};

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    console.log(result, "loadPosts");

    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
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

  return axios.post("/api/post", payload, config);
};

function* uploadPosts(action) {
  try {
    const result = yield call(uploadPostsAPI, action.payload);

    console.log(result, "uploadPostAPI");

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
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log(result, "post_detail_saga_data");

    yield put({
      type: POSTS_DETAIL_LOADING_SUCCESS,
      payload: result.data,
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
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  console.log(payload);
  return axios.delete(`/api/post/${payload.id}`, config);
};

function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.payload);

    console.log(result);
    yield put({
      type: POSTS_DELETE_SUCCESS,
      payload: result.data,
    });
    yield put(push("/"));
  } catch (e) {
    yield put({
      type: POSTS_DELETE_FAILURE,
      payload: e,
    });
  }
}

//Post Edit Loading
const postEditLoadAPI = (payload) => {
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
  return axios.get(`/api/post/${payload.id}/edit`, payload, config);
};

function* postEditLoad(action) {
  try {
    const result = yield call(postEditLoadAPI, action.payload);

    console.log(result);
    yield put({
      type: POSTS_EDIT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_EDIT_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

//Post Edit Upload
const postEditUploadAPI = (payload) => {
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
  return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* postEditUpload(action) {
  try {
    const result = yield call(postEditUploadAPI, action.payload);

    console.log(result);

    yield put({
      type: POSTS_EDIT_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POSTS_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

//Category Find
const CategoryFindAPI = (payload) => {
  return axios.get(`/api/post/category/${encodeURIComponent(payload)}`);
};

function* CategoryFind(action) {
  try {
    const result = yield call(CategoryFindAPI, action.payload);

    console.log(result);

    yield put({
      type: CATEGORY_FIND_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: CATEGORY_FIND_FAILURE,
      payload: e,
    });
  }
}

//Search
const SearchResultAPI = (payload) => {
  return axios.get(`/api/search/${encodeURIComponent(payload)}`);
};

function* SearchResult(action) {
  try {
    const result = yield call(SearchResultAPI, action.payload);

    console.log(result);

    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/search/${encodeURIComponent(payload)}`));
  } catch (e) {
    yield put({
      type: SEARCH_FAILURE,
      payload: e,
    });
  }
}

//watch
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

function* watchPostEditLoad() {
  yield takeEvery(POSTS_EDIT_LOADING_REQUEST, postEditLoad);
}

function* watchPostEditUpLoad() {
  yield takeEvery(POSTS_EDIT_UPLOADING_REQUEST, postEditUpload);
}

function* watchCategoryFind() {
  yield takeEvery(CATEGORY_FIND_REQUEST, CategoryFind);
}

function* watchSearchResult() {
  yield takeEvery(SEARCH_REQUEST, SearchResult);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadPosts),
    fork(watchLoadPostDetail),
    fork(watchDeletePost),
    fork(watchPostEditLoad),
    fork(watchPostEditUpLoad),
    fork(watchCategoryFind),
    fork(watchSearchResult),
  ]);
}
