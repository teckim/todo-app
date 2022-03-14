import React, { createContext, useContext, useReducer } from "react";

const DialogContext = createContext();

const dialogReducer = (state, [action, id]) => {
  if (action === "ADD_DIALOG") return [...state, id];
  else if (action === "REMOVE_DIALOG") return state.filter((id) => id !== id);
  else return state;
};

export const DialogProvider = ({ children }) => {
  const [dialogIds, dispatch] = useReducer(dialogReducer, []);
  const value = {dialogIds, dispatch}

  return (
    <DialogContext.Provider value={value}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const { dialogIds, dispatch }  = useContext(DialogContext);

  return {
    showDialog: (id) => dispatch(["ADD_DIALOG", id]),
    hideDialog: (id) => dispatch(["REMOVE_DIALOG", id]),
    isVisibleDialog: (id) => dialogIds.some(dialogId => dialogId === id),
    dialogIds,
  };
};
