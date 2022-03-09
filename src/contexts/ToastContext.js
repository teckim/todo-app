import { createContext, useContext, useReducer } from "react";
import { Snackbar } from "../components/elements";
import { v4 } from "uuid";

const ToastContext = createContext();

const reducer = (state, { payload, action }) => {
  if (action === "ADD_NOTIFICATION") return [...state, payload];
  else if (action === "REMOVE_NOTIFICATION")
    return state.filter((item) => item.id !== payload.id);
  else return state;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useReducer(reducer, []);

  return (
    <ToastContext.Provider value={setToasts}>
      <div className="fixed top-0 left-0 flex flex-col space-y-4 p-4 sm:max-w-md w-full">
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

  return {
    dispatch: ({ action, payload }) => {
      dispatch({
        action: action || "ADD_NOTIFICATION",
        payload: {
          id: v4(),
          ...payload,
        },
      });
    },
    success: (payload) => {
      dispatch({
        action: "ADD_NOTIFICATION",
        payload: {
          id: v4(),
          type: "success",
          ...payload,
        },
      });
    },
    error: (payload) => {
      dispatch({
        action: "ADD_NOTIFICATION",
        payload: {
          id: v4(),
          type: "error",
          ...payload,
        },
      });
    },
    close: (id) => {
      dispatch({
        action: "REMOVE_NOTIFICATION",
        payload: { id },
      });
    },
  };
};
