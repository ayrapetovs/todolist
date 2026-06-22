import { createContext } from "react";
import useTasks from "../hooks/useTasks";
import useInCompleteTaskScroll from "../hooks/useInCompleteTaskScroll";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

  const {
    tasks,
    filteredTasks,
    deleteTask,
    onClickDeleteAll,
    toggleTaskComplete,

    taskTitle,
    setTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId,
  } = useTasks();

  const { firstIncompleteTaskRef, firstIncompleteTaskId } =
    useInCompleteTaskScroll(tasks);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        deleteTask,
        onClickDeleteAll,
        toggleTaskComplete,
        taskTitle,
        setTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        disappearingTaskId,
        appearingTaskId,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
