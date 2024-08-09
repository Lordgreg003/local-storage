import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoById, viewTodoById } from "../redux/actions/Actions";
import { RootState } from "../redux/store"; // Adjust import according to your setup
import { localStorageType } from "../redux/types/types";
import { useNavigate, useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";

const UpdateTodo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const { todo, loading, success, error } = useSelector(
    (state: RootState) => state.viewTodoById // Adjust selector based on your store setup
  );

  const [formTodo, setFormTodo] = useState<localStorageType>({
    _id: "",
    username: "",
    title: "",
    text: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(viewTodoById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (todo) {
      setFormTodo(todo);
    }
  }, [todo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateTodoById(formTodo));
    if (success) {
      navigate("/"); // Navigate to another page on successful update
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Update Todo
        </h2>
        <div className="mb-4">
          <label
            htmlFor="_id"
            className="block text-sm font-medium text-gray-600"
          >
            ID
          </label>
          <input
            type="text"
            name="_id"
            id="_id"
            placeholder="ID"
            value={formTodo._id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={formTodo.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={formTodo.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-600"
          >
            Text
          </label>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Text"
            value={formTodo.text}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {loading && <div className="mb-4 text-blue-600">Loading...</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
