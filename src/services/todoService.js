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


