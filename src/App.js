import { useState, useEffect } from "react";
import { getTodos } from "./services/todoApi";
import TodoLayout from "./components/layouts/TodoLayout";
import AddTodoDialog from "./components/AddTodoDialog";
import TodoList from "./components/TodoList";
import { Button } from "./components/elements";
import { ToastProvider } from "./contexts/ToastContext";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [addTodoDialogVisible, setAddTodoDialogVisible] = useState(false);

  useEffect(() => {
    getTodos().then(({ data }) => setTodos(data));
  }, []);

  return (
    <div className="App">
      <ToastProvider>
        <TodoLayout>
          <Button block onClick={() => setAddTodoDialogVisible(true)}>
            Add New Todo Item
          </Button>
          <TodoList items={todos} />
        </TodoLayout>

        <AddTodoDialog
          visible={addTodoDialogVisible}
          onClose={() => setAddTodoDialogVisible(false)}
        />
      </ToastProvider>
    </div>
  );
};

export default App;
