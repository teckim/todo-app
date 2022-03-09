import React from "react";
import clsx from "clsx";

const buttonTypes = {
  primary: "text-white bg-indigo-600 hover:bg-indigo-700",
  secondary: "text-gray-700 bg-transparent hover:bg-gray-100",
};

const buttonStyles = {
  block: "w-full",
};

function Button({ children, block = false, variant = "primary", onClick }) {
  const buttonClasses = clsx({
    [buttonTypes[variant]]: true,
    [buttonStyles.block]: block,
  });

  return (
    <button
      className={`${buttonClasses} whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-md shadow-md text-base font-medium`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}

export default Button;
