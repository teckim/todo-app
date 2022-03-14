import React from "react";
import Todo from "./Todo";
import "../styles/components/todo-list.css"

const TodoList = ({ items, ...rest }) => {
  if (!items || !items.length)
    return <div className="todo-list__no-data">No Data</div>;

  return (
    <div className="todo-list">
      {items.map((item) => (
        <Todo {...item} {...rest} key={item.id} />
      ))}
    </div>
  );
};

export default TodoList;
