import {memo, useContext} from "react";
import {TasksContext} from '@/entities/todo'
import RouterLink from "@/shared/ui/RouterLink";

import styles from "./TodoItem.module.css";
import {highlightCaseInsensitive} from "@/shared/utils/highlight";

const TodoItem = (props) => {
    const {title, isDone, className, id} = props;
    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteTask,
        toggleTaskComplete,
        disappearingTaskId,
        appearingTaskId,
        searchQuery
    } = useContext(TasksContext);

    const highlightedTitle = highlightCaseInsensitive(title, searchQuery)

    return (
        <li
            className={`
        ${styles["todo-item"]}
        ${className}
        ${disappearingTaskId === id ? styles["is-disappearing"] : ""}
        ${appearingTaskId === id ? styles["is-appearing"] : ""}
      `}
            ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
        >
            <input
                className={`${styles["todo-item__checkbox"]}`}
                id={id}
                type="checkbox"
                checked={isDone}
                onChange={() => toggleTaskComplete(id, !isDone)}
            />
            <RouterLink to={`/tasks/${id}`} aria-label="detail page">
                <span dangerouslySetInnerHTML={{__html: highlightedTitle}}/>
            </RouterLink>
            <label
                className={`${styles["todo-item__label"]} visually-hidden`}
                htmlFor={id}
            >
                {title}

            </label>

            <button
                className={`${styles["todo-item__delete-button"]}`}
                aria-label="Delete"
                title="Delete"
                onClick={() => deleteTask(id)}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15 5L5 15M5 5L15 15"
                        stroke="#757575"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </li>
    );
};

export default memo(TodoItem);
