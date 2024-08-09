import { Action } from "redux";
import { RootState } from "../store";
import { ThunkAction } from "redux-thunk";

export type ImageType = {
  url: string;
  public_id: string;
  folder: string;
  _id: string;
};

export type localStorageType = {
  _id: string;
  username: string;
  title: string;
  text: string;
  // data : [];

  image?: ImageType[];
};

export type WishlistItemType = localStorageType & {
  isProduct: boolean;
};

export default localStorageType;
export type ReduxResponseType<T = any> = {
  loading: boolean;
  success: boolean;
  todo: localStorageType | null;
  serverResponse: {
    // length: number;
    // map(arg0: (todo: localStorageType) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    data: T;
    message: string;
    success: boolean;
  };
  error: any;
};
export type ActionType = {
  type: string;
  payload: any;
};

export type ThunkResult<R> = ThunkAction<
  R,
  RootState,
  undefined,
  Action<string>
>;
