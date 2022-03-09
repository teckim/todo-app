import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { ErrorIcon, DoneIcon } from "../icons";
import { useToast } from "../../contexts/ToastContext";

const Snackbar = ({ id, text, type, timeout }) => {
  const [exit, setExit] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const { close } = useToast();

  useEffect(
    () => percentage === 100 && handleCloseNotification(),
    [percentage]
  );

  useEffect(() => timeout && handleStartTimer(), []);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) return prev + 0.5;

        clearInterval(id);
        return prev;
      });
    }, timeout / 200);

    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => close(id), 400);
  };

  const snackbarClasses = clsx({
    "ease-in-out inline-block align-bottom bg-white border border-slate-300 rounded-lg text-left overflow-hidden shadow-xl transition-all duration-150 cursor-pointer": true,
    "-translate-y-6 opacity-0": exit,
  });

  const iconWrapperClasses = clsx({
    "p-1 rounded-full": true,
    "bg-green-100": type === "success",
    "bg-red-100": type === "error",
  });

  const iconClasses = clsx({
    "h-6 w-6": true,
    "text-green-600": type === "success",
    "text-red-600": type === "error",
  });

  return (
    <div
      className={snackbarClasses}
      onClick={handleCloseNotification}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
    >
      <div
        className="bg-slate-200 h-1"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="bg-white px-4 py-2">
        <div className="flex items-center">
          <div className={iconWrapperClasses}>
            {type === "success" ? (
              <DoneIcon className={iconClasses} />
            ) : (
              <ErrorIcon className={iconClasses} />
            )}
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Snackbar;
