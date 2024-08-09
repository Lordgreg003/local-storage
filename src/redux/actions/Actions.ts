import {
  ADD_TO_LOCALSTORAGE_REQUEST,
  ADD_TO_LOCALSTORAGE_SUCCESS,
  ADD_TO_LOCALSTORAGE_FAIL,
  VIEW_LOCALSTORAGE_REQUEST,
  VIEW_LOCALSTORAGE_SUCCESS,
  VIEW_LOCALSTORAGE_FAIL,
  REMOVE_FROM_LOCALSTORAGE_REQUEST,
  REMOVE_FROM_LOCALSTORAGE_SUCCESS,
  REMOVE_FROM_LOCALSTORAGE_FAIL,
  UPDATE_LOCALSTORAGE_FAIL,
  UPDATE_LOCALSTORAGE_REQUEST,
  UPDATE_LOCALSTORAGE_SUCCESS,
  GET_ALL_LOCAL_STORAGE_REQUEST,
  GET_ALL_LOCAL_STORAGE_SUCCESS,
  GET_ALL_LOCAL_STORAGE_FAILURE,
} from "../constants/myConstants";
import { Dispatch } from "redux"; // Import Dispatch from redux

import { LOCAL_STORAGE_SESSION } from "../../extrastorage/storage";
import localStorageType from "../types/types";

export const ADD_TODO = "ADD_TODO";

export const addToLocalStorage =
  (todo: localStorageType) => async (dispatch: Dispatch) => {
    try {
      // Assuming you're using localStorage to save the todos
      let todos = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_SESSION) || "[]"
      );
      todos.push(todo);
      localStorage.setItem(LOCAL_STORAGE_SESSION, JSON.stringify(todos));

      dispatch({
        type: ADD_TODO,
        payload: todos,
      });
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

export const removeFromLocalStorage = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      let todos = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_SESSION) || "[]"
      );
      todos = todos.filter((todo: localStorageType) => todo._id !== id);
      localStorage.setItem(LOCAL_STORAGE_SESSION, JSON.stringify(todos));

      dispatch({
        type: REMOVE_FROM_LOCALSTORAGE_SUCCESS,
        payload: id,
      });
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };
};
export const viewTodoById = (id: string) => async (dispatch: Dispatch) => {
  try {
    console.log("Dispatching VIEW_TODO_REQUEST");
    dispatch({
      type: VIEW_LOCALSTORAGE_REQUEST,
    });

    const storedTodos = localStorage.getItem(LOCAL_STORAGE_SESSION);
    if (storedTodos) {
      const todos: localStorageType[] = JSON.parse(storedTodos);
      const todo = todos.find((todo) => todo._id === id) || null;
      console.log("Found todo:", todo);

      dispatch({
        type: VIEW_LOCALSTORAGE_SUCCESS,
        payload: todo,
      });
    } else {
      throw new Error("No todos found in local storage");
    }
  } catch (error: any) {
    console.error("Error in viewTodoById:", error.message);
    dispatch({
      type: VIEW_LOCALSTORAGE_FAIL,
      payload: error.message,
    });
  }
};

export const updateTodoById =
  (todo: localStorageType) => async (dispatch: Dispatch) => {
    try {
      console.log("Dispatching UPDATE_LOCALSTORAGE_REQUEST");
      dispatch({ type: UPDATE_LOCALSTORAGE_REQUEST });

      const storedTodos = localStorage.getItem(LOCAL_STORAGE_SESSION);
      if (storedTodos) {
        let todos: localStorageType[] = JSON.parse(storedTodos);
        todos = todos.map((t) => (t._id === todo._id ? todo : t));
        localStorage.setItem(LOCAL_STORAGE_SESSION, JSON.stringify(todos));
        console.log("Updated todos:", todos);

        console.log("Dispatching UPDATE_LOCALSTORAGE_SUCCESS");
        dispatch({
          type: UPDATE_LOCALSTORAGE_SUCCESS,
          payload: todo,
        });
      } else {
        throw new Error("No todos found in local storage");
      }
    } catch (error: any) {
      console.error("Error in updateTodoById:", error.message);
      console.log("Dispatching UPDATE_LOCALSTORAGE_FAIL");
      dispatch({
        type: UPDATE_LOCALSTORAGE_FAIL,
        payload: error.message,
      });
    }
  };

export const getAllLocalStorage = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "GET_ALL_LOCAL_STORAGE" });

    let todos = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_SESSION) || "[]"
    ) as localStorageType[];

    dispatch({
      type: "GET_ALL_LOCAL_STORAGE_SUCCESS",
      payload: todos,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_LOCAL_STORAGE_ERROR",
      payload: "Error fetching todos",
    });
  }
};
