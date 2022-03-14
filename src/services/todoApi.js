import api from "../plugins/api";

export const getTodos = () => {
  return api.get("todos");
};

export const postTodo = (data) => {
  return api.post("todos", data);
};

export const updateTodo = (data) => {
  return api.put("todos", data);
};

export const updateTodoDone = ({ id, done }) => {
  return api.put(`todos/${id}/done`, { done });
};

export const removeTodo = (id) => {
  return api.delete(`todos/${id}`);
};
