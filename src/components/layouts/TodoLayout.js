import React from "react";

import "../../styles/layouts/todo-layout.css"

const TodoLayout = ({ children }) => {
  return (
    <div className="todo-layout">
      <div className="todo-layout__content">{children}</div>
    </div>
  );
};

export default TodoLayout;
