import React, { useState } from "react";
import clsx from "clsx";
import { updateTodoDone, removeTodo } from "../services/todoApi";
import { useToast } from "../contexts/ToastContext";
import { IconButton } from "./elements";
import {
  DoneIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TimeIcon,
} from "./icons";
import "../styles/components/todo.css";

const Todo = ({ id, done, title, description, deadline, updateFn }) => {
  const [expanded, setExpended] = useState(false);
  const { success, error } = useToast();

  const onTodoClick = () => {
    updateTodoDone({ id, done: !done })
      .then(() => {
        success(`Todo item marked as ${done ? "undone" : "done"}.`);
        updateFn();
      })
      .catch((e) =>
        error(`faild marking todo item as ${done ? "done" : "undone"}.`)
      );
  };

  const remove = (e) => {
    e.stopPropagation();
    removeTodo(id)
      .then(() => {
        success("Todo item removed successfully.");
        updateFn();
      })
      .catch(() => error("Fail removing todo item"));
  };

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpended(!expanded);
  };

  const todoClasses = clsx({
    todo: true,
    "todo--done": done,
    "todo--expanded": expanded,
  });

  return (
    <div className={todoClasses}>
      <div className="todo__icon">
        {done ? (
          <DoneIcon className="w-6 h-6 text-green-600" />
        ) : (
          <TimeIcon className="w-6 h-6 text-gray-500" />
        )}
      </div>

      <div className="todo__content">
        <div className="todo__title">{title}</div>
        {deadline && (
          <p className="todo__deadline">before {deadline.split("T")[0]}</p>
        )}
        <div className="todo__description">
          <p className="todo__description-text">{description}</p>
          {description && (
            <IconButton onClick={toggleExpand}>
              {expanded ? (
                <ChevronUpIcon className="w-4 h-4 text-indigo-600" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-indigo-600" />
              )}
            </IconButton>
          )}
        </div>
      </div>

      <div className="todo__actions">
        <IconButton onClick={onTodoClick}>
          {done ? (
            <TimeIcon className="w-4 h-4 text-blue-600" />
          ) : (
            <DoneIcon className="w-4 h-4 text-green-600" />
          )}
        </IconButton>
        <IconButton onClick={remove}>
          <CloseIcon className="w-4 h-4 text-red-600" />
        </IconButton>
      </div>
    </div>
  );
};

export default Todo;
