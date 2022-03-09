import api from "../plugins/api";

export const getTodos = function () {
  return api.get("todos");
};

export const postTodo = function (data) {
  return api.post("todos", data);
};
