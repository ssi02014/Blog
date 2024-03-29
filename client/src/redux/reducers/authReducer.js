import {
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_SUCCESS,
  USER_LOADING_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  PASSWORD_EDIT_UPLOADING_REQUEST,
  PASSWORD_EDIT_UPLOADING_SUCCESS,
  PASSWORD_EDIT_UPLOADING_FAILURE,
} from "../types";

//초기값
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: "",
  userId: "",
  userName: "",
  userRole: "",
  errorMsg: "",
  successMsg: "",
  previousMatchMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //이런식으로 하면 바로 밑에 있는 LOGIN_REQUEST와 같은 기능을 함
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMsg: "",
        isLoading: true,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errorMsg: "",
      };

    case REGISTER_FAILURE:
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: "",
      };

    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userName: action.payload.name,
        userRole: action.payload.role,
      };

    case USER_LOADING_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: "",
      };
    case PASSWORD_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PASSWORD_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMsg: action.payload.data.success_msg,
        errorMsg: "",
        previousMatchMsg: "",
      };

    case PASSWORD_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
        successMsg: "",
        errorMsg: action.payload.data.fail_msg,
        previousMatchMsg: action.payload.data.match_msg,
      };

    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
      };

    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        previousMatchMsg: "",
      };

    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: "Clear Error Fail",
        previousMatchMsg: "Clear Error Fail",
      };

    default:
      return state;
  }
};

export default authReducer;
