import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import tasksAPI from "@/shared/api/tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [taskTitle, setTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);
  const newTaskInputRef = useRef(null);

  const onClickDeleteAll = useCallback(() => {
    tasksAPI.deleteAll(tasks).then(() => {
      setTasks([]);
    });
  }, [tasks]);

  const deleteTask = useCallback(
    (id) => {
      tasksAPI.delete(id).then(() => {
        setDisappearingTaskId(id);
        console.log(id);
        setTimeout(() => {
          setTasks(tasks.filter((task) => task.id !== id));

          setDisappearingTaskId(null);
        }, 400);
      });
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (id, isDone) => {
      tasksAPI.toggleComplete(id, isDone).then(() =>
        setTasks(
          tasks.map((task) => {
            if (task.id === id) {
              return { ...task, isDone };
            }

            return task;
          }),
        ),
      );
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current?.focus();

      setAppearingTaskId(addedTask.id);
      console.log(appearingTaskId);
      setTimeout(() => {
        setAppearingTaskId(null);
      }, 400);
    });
  }, []);

  useEffect(() => {
    newTaskInputRef.current?.focus();

    tasksAPI.getAll().then(setTasks);
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
    disappearingTaskId,
    appearingTaskId,
    taskTitle,
    setTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  };
};

export default useTasks;
