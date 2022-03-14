import React from "react";
import "./icon-button.css"

function IconButton({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={`${className} icon-button`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default IconButton;
