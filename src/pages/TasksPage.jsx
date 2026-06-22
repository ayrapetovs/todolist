import { TasksProvider } from "../context/TasksContext.jsx";
import Todo from "../components/Todo/Todo.jsx";

export const TasksPage = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};
