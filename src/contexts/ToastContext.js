import React, { createContext, useContext, useReducer } from "react";
import Snackbar from "../components/Snackbar";
import { v4 } from "uuid";

const ToastContext = createContext();

const toastReducer = (state, { payload, action }) => {
  switch (action) {
    case "ADD_NOTIFICATION":
      return [...state, payload];
    case "REMOVE_NOTIFICATION":
      return state.filter((item) => item.id !== payload.id);
    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useReducer(toastReducer, []);

  return (
    <ToastContext.Provider value={setToasts}>
      <div className="fixed z-50 top-0 left-0 flex flex-col space-y-4 p-4 sm:max-w-md w-full">
        {toasts.map(({ id, ...rest }) => (
          <Snackbar key={id} id={id} {...rest}></Snackbar>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const dispatch = useContext(ToastContext);

  const toast = {
    _timeout: 2000,
    dispatch: ({ action, payload }) => {
      dispatch({
        action: action || "ADD_NOTIFICATION",
        payload: {
          id: v4(),
          ...payload,
        },
      });
    },
    timeout(timeout) {
      toast._timeout = timeout;
      return toast;
    },
    success(text, timeout) {
      if (timeout) toast._timeout = timeout;

      dispatch({
        action: "ADD_NOTIFICATION",
        payload: {
          id: v4(),
          type: "success",
          timeout: toast._timeout,
          text,
        },
      });
    },
    error(text, timeout) {
      if (timeout) toast._timeout = timeout;

      dispatch({
        action: "ADD_NOTIFICATION",
        payload: {
          id: v4(),
          type: "error",
          timeout: toast._timeout,
          text,
        },
      });
    },
    close(id) {
      dispatch({
        action: "REMOVE_NOTIFICATION",
        payload: { id },
      });
    },
  };

  return toast;
};
