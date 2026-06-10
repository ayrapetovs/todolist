import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
  const { savedTasks, saveTasks } = useTasksLocalStorage();
  const [tasks, setTasks] = useState(savedTasks ?? []);

  const [taskTitle, setTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const newTaskInputRef = useRef(null);

  const onClickDeleteAll = useCallback(() => {
    setTasks([]);
  }, []);

  const deleteTask = useCallback(
    (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (id) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isDone: !task.isDone } : task,
        ),
      );
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    const newTask = {
      id: crypto?.randomUUID() ?? tasks.length + 1,
      title,
      isDone: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskTitle("");
    setSearchQuery("");
    newTaskInputRef.current?.focus();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current?.focus();
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  }, [searchQuery, tasks]);

  return {
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
  };
};

export default useTasks;
