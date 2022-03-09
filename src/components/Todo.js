import React from "react";
import { useToast } from "../contexts/ToastContext";
import { IconButton } from "./elements";
import { DoneIcon, CloseIcon, EditIcon, TimeIcon } from "./icons";

function Todo({ item }) {
  const { success } = useToast();

  const remove = () => {
    success({ text: "success!" });
  };

  return (
    <div className="p-4 flex gap-x-4 shadow-md rounded-md">
      {item.done ? (
        <DoneIcon className="w-6 h-6 text-green-600" />
      ) : (
        <TimeIcon className="w-6 h-6 text-gray-500" />
      )}

      <div className="grow">
        <p className="text-base font-medium text-gray-900">{item.title}</p>
        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
      </div>

      <div className="flex items-start gap-x-2">
        <IconButton>
          <EditIcon className="w-4 h-4 text-blue-600" />
        </IconButton>
        <IconButton onClick={remove}>
          <CloseIcon className="w-4 h-4 text-red-600" />
        </IconButton>
      </div>
    </div>
  );
}

export default Todo;
