import React from "react";

function IconButton({ children, onClick }) {
  return (
    <button
      type="button"
      className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;
