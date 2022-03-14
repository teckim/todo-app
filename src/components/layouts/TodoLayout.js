import React from "react";

const TodoLayout = ({ children }) => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">{children}</div>
    </div>
  );
};

export default TodoLayout;
