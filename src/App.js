import { useState, useEffect } from "react";
import { getTodos } from "./services/todoApi";
import TodoLayout from "./components/layouts/TodoLayout";
import AddTodoDialog from "./components/AddTodoDialog";
import TodoList from "./components/TodoList";
import { Button } from "./components/elements";
import { DialogProvider, useDialog } from "./contexts/DialogContext";
import { ToastProvider } from "./contexts/ToastContext";
import "./styles/components/app.css";

const App = () => {
  const [todos, setTodos] = useState(null);

  const fetchTodos = () => {
    getTodos().then(({ data }) => setTodos(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <DialogProvider>
        <ToastProvider>
          <TodoLayout>
            <AddTodoButton></AddTodoButton>
            <div className="pt-12">
              <TodoList items={todos} updateFn={fetchTodos} />
            </div>
          </TodoLayout>

          <AddTodoDialog
            onClose={fetchTodos}
          />
        </ToastProvider>
      </DialogProvider>
    </div>
  );
};

const AddTodoButton = () => {
  const { showDialog } = useDialog();

  return (
    <Button block onClick={() => showDialog("ADD-TODO-DIALOG")}>
      Add New Todo Item
    </Button>
  );
};

export default App;
