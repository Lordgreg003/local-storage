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
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export const ADD_TODO = "ADD_TODO";

export const addToLocalStorage =
  (todo: localStorageType) => async (dispatch: Dispatch) => {
    try {
      // Assuming you're using localStorage to save the todos
      let todos = JSON.parse(localStorage.getItem("todos") || "[]");
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));

      dispatch({
        type: ADD_TODO,
        payload: todos,
      });
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

export const removeFromLocalStorage =
  (item: localStorageType) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: REMOVE_FROM_LOCALSTORAGE_REQUEST,
      });

      // get existing wishlist from local storage
      const existingWishlist: localStorageType[] =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSION) as any) || [];

      // Check if item already exists in wishlist
      const existingItem = existingWishlist.find(
        (wishlistItem) => wishlistItem._id === item._id
      );

      // removing item from wishlist
      existingWishlist.splice(existingWishlist.indexOf(existingItem!), 1);

      // Save updated wishlist to localStorage
      localStorage.setItem(
        LOCAL_STORAGE_SESSION,
        JSON.stringify(existingWishlist)
      );

      dispatch({
        type: REMOVE_FROM_LOCALSTORAGE_SUCCESS,
        payload: {
          message: "Item removed successfully",
          data: existingItem,
        },
      });
    } catch (error: any) {
      dispatch({
        type: REMOVE_FROM_LOCALSTORAGE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const viewTodoById = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: VIEW_LOCALSTORAGE_REQUEST,
    });

    // get existing todos from local storage
    const existingTodos: localStorageType[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    console.log("Fetched todos from local storage:", existingTodos);

    // find the todo by id
    const todo = existingTodos.find((todo) => todo._id === id);
    console.log("Found todo:", todo);

    if (todo) {
      dispatch({
        type: VIEW_LOCALSTORAGE_SUCCESS,
        payload: todo,
      });
    } else {
      dispatch({
        type: VIEW_LOCALSTORAGE_FAIL,
        payload: "Todo not found",
      });
    }
  } catch (error: any) {
    console.error("Error fetching todo by ID:", error);
    dispatch({
      type: VIEW_LOCALSTORAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateLocalStorage =
  (item: localStorageType) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_LOCALSTORAGE_REQUEST });

      // Get existing wishlist from local storage
      const existingWishlist: localStorageType[] =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSION) as any) || [];

      // Find index of the item to update
      const index = existingWishlist.findIndex(
        (wishlistItem) => wishlistItem._id === item._id
      );

      if (index !== -1) {
        // Update the item
        existingWishlist[index] = item;

        // Save updated wishlist to localStorage
        localStorage.setItem(
          LOCAL_STORAGE_SESSION,
          JSON.stringify(existingWishlist)
        );

        dispatch({
          type: UPDATE_LOCALSTORAGE_SUCCESS,
          payload: {
            message: "Item updated successfully",
            data: existingWishlist,
          },
        });
      } else {
        dispatch({
          type: UPDATE_LOCALSTORAGE_FAIL,
          payload: "Item not found",
        });
      }
    } catch (error: any) {
      dispatch({
        type: UPDATE_LOCALSTORAGE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const getAllLocalStorage = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_ALL_LOCAL_STORAGE_REQUEST });
  try {
    // Simulate API call or direct access from localStorage
    const todos: localStorageType[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    dispatch({ type: GET_ALL_LOCAL_STORAGE_SUCCESS, payload: todos });
  } catch (error: any) {
    dispatch({
      type: GET_ALL_LOCAL_STORAGE_FAILURE,
      payload: error?.message || "Failed to fetch from local storage",
    });
  }
};
