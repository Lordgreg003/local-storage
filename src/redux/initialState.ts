import localStorageType, { ReduxResponseType } from "./types/types";

export const initialState: ReduxResponseType = {
  loading: false,
  success: false,
  todo: null,
  serverResponse: {
    data: [],
    message: "",
    success: false,
  },
  error: "",
};

// import { localStorageType, ReduxResponseType } from "./types/types";

// export const initialState1: ReduxResponseType<localStorageType | null> = {
//   loading: false,
//   success: false,
//   todo: null,
//   serverResponse: {
//     data:  [] ,
//     message: "",
//     success: false,
//   },
//   error: "",
// };
