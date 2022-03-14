import React from "react";
import clsx from "clsx";
import "./button.css";

const buttonTypes = {
  primary: "button--primary",
  secondary: "button--secondary",
};

const buttonStyles = {
  block: "button--block",
};

function Button({ children, block = false, variant = "primary", ...rest }) {
  const buttonClasses = clsx({
    [`button--${variant}`]: true,
    "button--block": block,
  });

  return (
    <button className={`${buttonClasses} button`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
