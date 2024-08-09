import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { viewTodoById } from "../redux/actions/Actions";
import { useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";

const ViewTodo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const todoDetails = useSelector((state: RootState) => state.viewTodoById);

  useEffect(() => {
    if (id) {
      dispatch(viewTodoById(id));
    }
  }, [dispatch, id]);

  console.log("Current todoDetails state: ", todoDetails);

  if (todoDetails.loading) {
    return <div>Loading...</div>;
  }

  if (todoDetails.error) {
    return <div>Error: {todoDetails.error}</div>;
  }

  if (!todoDetails.todo) {
    return <div>No todo found</div>;
  }

  const { username, title, text } = todoDetails.todo;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Todo</h1>
      <div>
        <h2 className="text-xl font-semibold">Username: {username}</h2>
        <h3 className="text-lg font-medium">Title: {title}</h3>
        <p className="text-md">{text}</p>
      </div>
    </div>
  );
};

export default ViewTodo;
