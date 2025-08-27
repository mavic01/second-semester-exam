import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { fetchTodos } from "@/services/todoService"; // Api call
import axios from "axios";

import { Todo } from "@/types"

export default function Todos() {
  //Hooks
  const dialogRef = useRef(null);
  const [titleInput, setTitleInput] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [todosList, setTodosList] = useState([]);

  const perPage = 10;

  const {
    data: allTodos = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 5,
  });

  //Filter to by Title and Completion status
  const filteredTodos = [...todosList, ...allTodos]
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) => {
      if (status === "completed") return todo.completed;
      if (status === "uncompleted") return !todo.completed;
      return true;
    });

  //Pagination
  const totalPages = Math.ceil(filteredTodos.length / perPage);
  const startIndex = (page - 1) * perPage;
  const todos = filteredTodos.slice(startIndex, startIndex + perPage);

  //Add Todo
  const handleAddTodo = async (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: titleInput.trim(),
      completed: false,
    };

    try {
      await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTodosList((prev) => [newTodo, ...prev]);
      setTitleInput("");
      dialogRef.current?.close();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  if (isLoading) {
    return (
      <main
        className="max-w-xl mx-auto p-6"
        role="main"
        aria-busy="true"
        aria-live="polite"
      >
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
          Loading Todos...
        </h1>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6 text-center" role="main">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-red-600 font-semibold">Error loading todos.</p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-200 to-stone-100 text-stone-800"
      role="main"
    >
      <div className="max-w-2xl mx-auto p-6">
        <header className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h1 className="text-3xl font-extrabold text-teal-700">
            📋 Todo List
          </h1>
          <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
            <Button
              className="bg-teal-600 text-white w-full sm:w-auto"
              onClick={() => dialogRef.current?.showModal()}
            >
              + Add Todo
            </Button>
            <Link
              to="/"
              className="text-sm font-medium text-teal-700 hover:underline focus:outline focus-visible:ring-2 focus-visible:ring-teal-600 w-full sm:w-auto text-center"
            >
              ← Back Home
            </Link>
          </div>
        </header>

        <section
          role="search"
          aria-label="Todo search and filter controls"
          className="grid gap-4 md:grid-cols-2"
        >
          <div>
            <label htmlFor="search-todos" className="sr-only">
              Search todos
            </label>
            <input
              id="search-todos"
              type="text"
              placeholder="🔍 Search todos..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="filter-status" className="sr-only">
              Filter by status
            </label>
            <select
              id="filter-status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Filter todos by status"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </section>

        <ul className="mt-6 space-y-4" role="list" aria-label="Todo list">
          {todos.length === 0 ? (
            <li className="text-center text-gray-600">No todos found.</li>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                role="listitem"
                className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition focus-within:ring-2 focus-within:ring-teal-500"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-teal-800 mb-1">
                      {todo.title || "Untitled"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ID: {todo.id} • Status:{" "}
                      {todo.completed ? "✅ Completed" : "❌ Not completed"}
                    </p>
                  </div>

                  <Link
                    to={`/todos/${todo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 text-sm underline hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                    aria-label={`View details for todo ${todo.id}`}
                  >
                    View
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>

        <nav
          className="flex justify-between items-center mt-8"
          role="navigation"
          aria-label="Pagination navigation"
        >
          <Button
            className="bg-teal-700 hover:bg-teal-800 text-white focus-visible:ring-2 focus-visible:ring-teal-600"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ← Previous
          </Button>

          <span className="text-sm text-gray-700" aria-current="page">
            Page {page} of {totalPages || 1}
          </span>

          <Button
            className="bg-teal-700 hover:bg-teal-800 text-white focus-visible:ring-2 focus-visible:ring-teal-600"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            Next →
          </Button>
        </nav>

        {isFetching && (
          <div
            className="mt-6 space-y-2 text-center"
            aria-live="polite"
            aria-busy="true"
          >
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/3 mx-auto" />
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="rounded-xl max-w-md w-[90%] p-6 shadow-lg"
      >
        <form onSubmit={handleAddTodo} method="dialog" className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-teal-700">Add New Todo</h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="text-gray-500 hover:text-red-500 text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter todo title..."
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <Button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white w-full"
          >
            Submit
          </Button>
        </form>
      </dialog>
    </main>
  );
}
