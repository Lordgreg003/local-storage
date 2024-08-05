import { ReduxResponseType } from "./types/types";

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
