import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { localStorageType } from "../redux/types/types";

const GetAllLocalStorage: React.FC = () => {
  const [todos, setTodos] = useState<localStorageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const todosFromStorage = JSON.parse(
        localStorage.getItem("todos") || "[]"
      );
      setTodos(todosFromStorage);
    } catch (error) {
      setError("Failed to load todos.");
    } finally {
      setLoading(false);
    }
  }, []);

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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
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
              {todos.length > 0 ? (
                todos.map((todo) => (
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
                        onClick={() => {
                          // Call delete action here
                        }}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
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
