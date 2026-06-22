import { memo, useContext } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { TasksContext } from "../../context/TasksContext.jsx";
const TodoList = () => {
  const { filteredTasks, tasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className="todo__empty-message">There are no tasks yet</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Tasks not found</div>;
  }
  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => {
        return <TodoItem {...task} key={task.id} className="todo__item" />;
      })}
    </ul>
  );
};

export default memo(TodoList);
