import React from "react";
import Todo from "./Todo";

const TodoList = ({ items }) => {
  if (!items || !items.length)
    return <div className="text-center text-gray-600">No Data</div>;

  return items.map((item) => <Todo item={item} key={item.id} />);
};

export default TodoList;
