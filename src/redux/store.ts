import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  addToLocalStorageReducer,
  removeFromLocalStorageReducer,
  viewTodoByIdReducer,
  updateTodoByIdReducer,
  getAllLocalStorageReducer,
} from "./reducers/localReducer";
// import {viewTodoByIdReducer} from "./reducers/localReducer";
import { ReduxResponseType } from "./types/types";

export interface RootState {
  addToLocalStorage: any; // Define the actual type based on your application
  updateTodoById: any;
  removeFromLocalStorage: any;
  viewTodoById: any;
  getAllLocalStorage: any;
}

export type ReducersType = {
  //localStorage system
  addToLocalStorage: ReduxResponseType;
  removeFromLocalStorage: ReduxResponseType;
  viewTodoById: ReduxResponseType;
  updateTodoById: ReduxResponseType;
  getAllLocalStorage: ReduxResponseType;
};

const reducer = combineReducers<ReducersType>({
  //wishlist system
  addToLocalStorage: addToLocalStorageReducer,
  removeFromLocalStorage: removeFromLocalStorageReducer,
  viewTodoById: viewTodoByIdReducer,
  updateTodoById: updateTodoByIdReducer,
  getAllLocalStorage: getAllLocalStorageReducer,
});

const middleware = [thunk];

// const initialState: any = {
//   login:
//     typeof window !== "undefined" && localStorage.getItem(LOGIN_SESSION)
//       ? JSON.parse(localStorage.getItem(LOGIN_SESSION) as any)
//       : initialStateReducer,
// };

export const store = createStore(
  reducer,
  //   initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
