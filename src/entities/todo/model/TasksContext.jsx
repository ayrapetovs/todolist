import {createContext, useMemo} from "react";
import useTasks from "./useTasks";
import useInCompleteTaskScroll from "./useInCompleteTaskScroll";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
    const {children} = props;

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

    const {firstIncompleteTaskRef, firstIncompleteTaskId} = useInCompleteTaskScroll(tasks);

    const value = useMemo(() => ({
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
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    }), [tasks, filteredTasks, deleteTask, onClickDeleteAll, toggleTaskComplete,

        taskTitle, setTaskTitle, searchQuery, setSearchQuery, newTaskInputRef, addTask, disappearingTaskId, appearingTaskId, firstIncompleteTaskRef, firstIncompleteTaskId])

    return (<TasksContext.Provider
            value={value}
        >
            {children}
        </TasksContext.Provider>);
};
