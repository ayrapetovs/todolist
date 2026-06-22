import { memo, useContext, useMemo } from "react";
import { TasksContext } from "../../context/TasksContext.jsx";
const TodoInfo = () => {
  const { tasks, onClickDeleteAll } = useContext(TasksContext);
  const total = tasks.length;
  const hasTasks = total > 0;
  const done = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length;
  }, [tasks]);
  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        Total tasks: <span>{done}</span>/<span>{total}</span>
      </div>
      {hasTasks && (
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={onClickDeleteAll}
        >
          Delete all
        </button>
      )}
    </div>
  );
};

export default memo(TodoInfo);
