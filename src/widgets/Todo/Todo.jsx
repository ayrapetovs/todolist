import { useContext } from "react";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm.jsx";
import SearchTaskForm from "../../components/SearchTaskForm/SearchTaskForm.jsx";
import TodoInfo from "../../components/TodoInfo/TodoInfo.jsx";
import TodoList from "../../components/TodoList/TodoList.jsx";
import Button from "../../components/Button/Button.jsx";
import { TasksContext } from "../../context/TasksContext.jsx";

import "./Todo.css";

const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <TodoInfo />
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Show first incomplete task
      </Button>
      <TodoList />
    </div>
  );
};

export default Todo;
