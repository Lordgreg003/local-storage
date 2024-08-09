import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { localStorageType, ReduxResponseType } from "../redux/types/types";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLocalStorage,
  removeFromLocalStorage,
} from "../redux/actions/Actions";
import { RootState } from "../redux/store";
import { ThunkDispatch } from "redux-thunk";

const GetAllLocalStorage: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  // Fetching todos
  const productsRedux = useSelector(
    (state: RootState) => state.getAllLocalStorage
  ) as ReduxResponseType<localStorageType[]>;

  // Fetching delete status
  const deleteStatus = useSelector(
    (state: RootState) => state.removeFromLocalStorage
  ) as ReduxResponseType<localStorageType[]>;

  useEffect(() => {
    // Fetch todos when the component mounts
    dispatch(getAllLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    // Refresh todos if delete operation was successful
    if (deleteStatus.serverResponse?.success) {
      dispatch(getAllLocalStorage());
    }
  }, [deleteStatus, dispatch]);

  const handleDelete = (id: string) => {
    console.log("Deleting todo with ID:", id);
    dispatch(removeFromLocalStorage(id));
    dispatch(getAllLocalStorage());
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-2 sm:mb-0">Todos</h2>
        <Link
          to="/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Todo
        </Link>
      </div>
      {productsRedux.loading ? (
        <p>Loading...</p>
      ) : productsRedux.error ? (
        <p className="text-red-500">{productsRedux.error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Text</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsRedux.serverResponse?.data?.length > 0 ? (
                productsRedux.serverResponse.data.map(
                  (todo: localStorageType) => {
                    console.log("Rendering todo with _id:", todo._id); // Debugging line
                    return (
                      <tr key={todo._id} className="border-b">
                        <td className="py-2 px-4">{todo._id}</td>
                        <td className="py-2 px-4">{todo.username}</td>
                        <td className="py-2 px-4">{todo.title}</td>
                        <td className="py-2 px-4">{todo.text}</td>
                        <td className="py-2 px-4 flex space-x-2">
                          <Link
                            to={`/view/${todo._id}`}
                            className="text-blue-500 hover:underline"
                          >
                            View
                          </Link>
                          <Link
                            to={`/update/${todo._id}`}
                            className="text-yellow-500 hover:underline"
                          >
                            Update
                          </Link>
                          <button
                            onClick={() => handleDelete(todo._id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td colSpan={5} className="py-2 px-4 text-center">
                    No todos found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetAllLocalStorage;
