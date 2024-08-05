import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewTodoById } from "../redux/actions/Actions";
import { RootState } from "../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { useParams } from "react-router-dom";

const ViewLocalStorage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const todoState = useSelector((state: RootState) => state.viewTodoById);

  useEffect(() => {
    if (id) {
      dispatch(viewTodoById(id));
    }
  }, [dispatch, id]);

  if (todoState.loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (todoState.error) {
    return <p className="text-center text-red-500">{todoState.error}</p>;
  }

  const todo = todoState.serverResponse;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Todo Details</h2>
      {todo ? (
        <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <p className="text-gray-700 font-semibold">
              ID: <span className="text-gray-500">{todo._id}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Username: <span className="text-gray-500">{todo.username}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Title: <span className="text-gray-500">{todo.title}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Text: <span className="text-gray-500">{todo.text}</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No todo found</p>
      )}
    </div>
  );
};

export default ViewLocalStorage;
