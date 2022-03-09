import React, { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { postTodo } from "../services/todoApi";
import { Button, Dialog } from "./elements";

const AddTodoDialog = ({ visible, onClose }) => {
  const [form, setForm] = useState({});
  const { success } = useToast();

  const handleInputChange = ([key, value]) => {
    const data = form;
    data[key] = value;
    setForm(data);
  };

  const handleSubmit = (event) => {
    console.log(form);
    form.user_id = 1;
    event.preventDefault();

    postTodo(form).then(({ data }) => {
      success({ type: "Success", text: "error!", timeout: 4000 });
    });
  };

  return (
    <Dialog open={visible} onClose={onClose}>
      <form className="todo-form space-y-3" onSubmit={handleSubmit}>
        <div className="text-lg">What's on your mind?</div>
        <div className="col-span-6">
          <label
            htmlFor="todo"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            name="todo"
            id="todo"
            placeholder="Title"
            autoComplete="given-name"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={(e) => handleInputChange(["title", e.target.value])}
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            About
          </label>
          <div className="mt-1">
            <textarea
              name="description"
              rows="3"
              placeholder="your text..."
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              onChange={(e) =>
                handleInputChange(["description", e.target.value])
              }
            />
          </div>
        </div>
        <div className="col-span-6 flex space-x-4 pt-4">
          <Button block type="submit">
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export default AddTodoDialog;
