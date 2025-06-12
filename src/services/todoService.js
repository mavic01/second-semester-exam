// src/services/todoService.js
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

// Get all todos
export const fetchTodos = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// Get single todo
export const fetchTodoById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

// Create a new todo
export const createTodo = async (newTodo) => {
  const res = await axios.post(BASE_URL, newTodo);
  return res.data;
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
  const res = await axios.put(`${BASE_URL}/${id}`, updatedTodo);
  return res.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
};
