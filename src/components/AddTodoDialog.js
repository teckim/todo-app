import React, { useState } from "react";
import { useDialog } from "../contexts/DialogContext";
import { useToast } from "../contexts/ToastContext";
import { postTodo } from "../services/todoApi";
import { Button, Dialog, Input, Textarea } from "./elements";

const DIALOG_ID = "ADD-TODO-DIALOG";

const AddTodoDialog = ({ visible, onClose }) => {
  const [form, setForm] = useState({});
  const { success, error } = useToast();
  const { hideDialog, isVisibleDialog } = useDialog();

  const handleInputChange = ([key, value]) => {
    const data = form;
    data[key] = value;
    setForm(data);
  };

  const handleSubmit = (event) => {
    form.user_id = 1;
    event.preventDefault();

    postTodo(form)
      .then(({ data }) => {
        handleClose();
        success("New todo item has been added successfully.");
      })
      .catch(() => error("Faild to add new todo item, please try again"));
  };

  const handleClose = () => {
    hideDialog(DIALOG_ID);
    onClose();
  };

  return (
    <Dialog open={visible || isVisibleDialog(DIALOG_ID)} onClose={handleClose}>
      <form className="todo-form space-y-4" onSubmit={handleSubmit}>
        <div className="text-lg">What's on your mind?</div>
        <div className="col-span-6">
          <Input
            name="todo"
            id="todo"
            required
            placeholder="Title"
            onChange={(e) => handleInputChange(["title", e.target.value])}
          />
        </div>
        <div className="col-span-6">
          <Input
            name="deadline"
            id="deadline"
            required
            placeholder="Before: dd-mm-yyyy"
            onChange={(e) => handleInputChange(["deadline", e.target.value])}
          />
        </div>
        <div className="col-span-6">
          <div className="mt-1">
            <Textarea
              name="description"
              rows="3"
              placeholder="Description ..."
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
};

export default AddTodoDialog;
