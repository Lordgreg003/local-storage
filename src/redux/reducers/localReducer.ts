import {
  ADD_TO_LOCALSTORAGE_REQUEST,
  ADD_TO_LOCALSTORAGE_SUCCESS,
  ADD_TO_LOCALSTORAGE_FAIL,
  ADD_TO_LOCALSTORAGE_RESET,
  VIEW_LOCALSTORAGE_RESET,
  VIEW_LOCALSTORAGE_REQUEST,
  VIEW_LOCALSTORAGE_SUCCESS,
  VIEW_LOCALSTORAGE_FAIL,
  REMOVE_FROM_LOCALSTORAGE_RESET,
  REMOVE_FROM_LOCALSTORAGE_REQUEST,
  REMOVE_FROM_LOCALSTORAGE_SUCCESS,
  REMOVE_FROM_LOCALSTORAGE_FAIL,
  UPDATE_LOCALSTORAGE_FAIL,
  UPDATE_LOCALSTORAGE_REQUEST,
  UPDATE_LOCALSTORAGE_SUCCESS,
  UPDATE_LOCALSTORAGE_RESET,
  GET_ALL_LOCAL_STORAGE_REQUEST,
  GET_ALL_LOCAL_STORAGE_SUCCESS,
  GET_ALL_LOCAL_STORAGE_FAILURE,
  LOGIN_RESET,
} from "../constants/myConstants";
import { initialState } from "../initialState";
import { ActionType, ReduxResponseType } from "../types/types";

export const addToLocalStorageReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADD_TO_LOCALSTORAGE_REQUEST:
      return { ...initialState, loading: true };
    case ADD_TO_LOCALSTORAGE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADD_TO_LOCALSTORAGE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADD_TO_LOCALSTORAGE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
export const viewTodoByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
): ReduxResponseType => {
  switch (action.type) {
    case VIEW_LOCALSTORAGE_REQUEST:
      return { ...initialState, loading: true };
    case VIEW_LOCALSTORAGE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case VIEW_LOCALSTORAGE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case VIEW_LOCALSTORAGE_RESET:
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
};
export const removeFromLocalStorageReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case REMOVE_FROM_LOCALSTORAGE_REQUEST:
      return { ...initialState, loading: true };
    case REMOVE_FROM_LOCALSTORAGE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case REMOVE_FROM_LOCALSTORAGE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case REMOVE_FROM_LOCALSTORAGE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
export const updateLocalStorageReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UPDATE_LOCALSTORAGE_REQUEST:
      return { ...initialState, loading: true };
    case UPDATE_LOCALSTORAGE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case UPDATE_LOCALSTORAGE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_LOCALSTORAGE_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const getAllLocalStorageReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_ALL_LOCAL_STORAGE_REQUEST:
      return { ...initialState, loading: true };
    case GET_ALL_LOCAL_STORAGE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_ALL_LOCAL_STORAGE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
