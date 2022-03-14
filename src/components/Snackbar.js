import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { ErrorIcon, DoneIcon } from "./icons";
import { useToast } from "../contexts/ToastContext";
import "../styles/components/snackbar.css";

const Snackbar = ({ id, text, type, timeout }) => {
  const [exit, setExit] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const { close } = useToast();

  useEffect(
    () => percentage === 100 && handleCloseNotification(),
    [percentage]
  );

  useEffect(() => handleStartTimer(), []);

  const handleStartTimer = () => {
    if (!timeout) return;

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
    "snackbar": true,
    "snackbar--exit": exit,
    "snackbar--success": type === "success",
    "snackbar--error": type === "error",
  });

  return (
    <div
      className={snackbarClasses}
      onClick={handleCloseNotification}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
    >
      <div
        className="snackbar__progress-bar"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="bg-white px-4 py-2">
        <div className="flex items-center">
          <div className="snackbar__icon-wrapper">
            {type === "success" ? (
              <DoneIcon className="snackbar__icon" />
            ) : (
              <ErrorIcon className="snackbar__icon" />
            )}
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
