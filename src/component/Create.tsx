import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToLocalStorage } from "../redux/actions/Actions";
import { localStorageType } from "../redux/types/types";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";

const CreateTodo: React.FC = () => {
  const [todo, setTodo] = useState<localStorageType>({
    _id: "",
    username: "",
    title: "",
    text: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addToLocalStorage(todo));
      setSuccessMessage("Todo added successfully!");
      console.log("Todo added:", todo); // Log the added todo
      setTodo({
        _id: "",
        username: "",
        title: "",
        text: "",
      }); // Clear the form fields
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Create Todo
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
            value={todo._id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            value={todo.username}
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
            value={todo.title}
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
            value={todo.text}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
