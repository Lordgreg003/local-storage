import { Dispatch } from "redux";
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
import localStorageType, {
  ActionType,
  ReduxResponseType,
} from "../types/types";

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
  state = initialState,
  action: { type: string; payload: any }
): ReduxResponseType<localStorageType | null> => {
  console.log("Current state view: ", state);
  console.log("view Action: ", action);

  switch (action.type) {
    case VIEW_LOCALSTORAGE_REQUEST:
      return { ...state, loading: true, error: "", success: false };
    case VIEW_LOCALSTORAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        todo: action.payload,
        serverResponse: {
          ...state.serverResponse,
          data: state.serverResponse.data.map((todo: localStorageType) =>
            todo._id === action.payload._id ? action.payload : todo
          ),
        },
      };
    case VIEW_LOCALSTORAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
export const removeFromLocalStorageReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case REMOVE_FROM_LOCALSTORAGE_RESET:
      return { ...initialState, loading: true };
    case REMOVE_FROM_LOCALSTORAGE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        sucess: true,
        serverResponse: {
          ...initialState.serverResponse,
          data: state.serverResponse.data.filter(
            (todo: localStorageType) => todo._id !== action.payload
          ),
        },
      };

    // case REMOVE_FROM_LOCALSTORAGE_RESET:
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
};
export const updateTodoByIdReducer = (
  state = initialState,
  action: ActionType
): ReduxResponseType<localStorageType | null> => {
  console.log("Current state update: ", state);
  console.log("Action: ", action);

  switch (action.type) {
    case UPDATE_LOCALSTORAGE_REQUEST:
      console.log("Handling UPDATE_LOCALSTORAGE_REQUEST");
      return { ...state, loading: true, error: "", success: false };

    case UPDATE_LOCALSTORAGE_SUCCESS:
      console.log("Handling UPDATE_LOCALSTORAGE_SUCCESS");
      return {
        ...state,
        loading: false,
        success: true,
        todo: action.payload,
        serverResponse: {
          ...state.serverResponse,
          data: state.serverResponse.data.map((todo: localStorageType) =>
            todo._id === action.payload._id ? action.payload : todo
          ),
        },
      };

    case UPDATE_LOCALSTORAGE_FAIL:
      console.log("Handling UPDATE_LOCALSTORAGE_FAIL");
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      console.log("Default case hit, returning current state");
      return state;
  }
};
export const getAllLocalStorageReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case "GET_ALL_LOCAL_STORAGE":
      return { ...state, loading: true };
    case "GET_ALL_LOCAL_STORAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        serverResponse: {
          data: action.payload,
          message: "Fetched successfully",
          success: true,
        },
        error: null,
      };

    case "GET_ALL_LOCAL_STORAGE_REQUEST":
      return {
        ...state,
        loading: false,
        serverResponse: {
          data: [],
          message: "",
          success: false,
        },
        error: action.payload,
      };
    default:
      return state;
  }
};
