import {useContext, useState} from "react";
import Field from "@/shared/ui/Field";
import Button from "@/shared/ui/Button";
import {TasksContext} from "@/entities/todo";

const AddTaskForm = () => {

    const [taskTitle, setTaskTitle] = useState("");
    const {newTaskInputRef, addTask} =
        useContext(TasksContext);
    const [error, setError] = useState("");
    const clearNewTaskTitle = taskTitle.trim();
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

    const onSubmit = (event) => {
        event.preventDefault();
        if (!isNewTaskTitleEmpty) {
            addTask(clearNewTaskTitle, () => {
                setTaskTitle('')
            });
        }
    };
    const onInput = (e) => {
        const {value} = e.target;
        const clearValue = taskTitle.trim();
        const hasError = value.length > 0 && clearValue.length === 0;
        setTaskTitle(value);
        setError(hasError ? "The task cannot be empty" : "");
    };
    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Field
                className="todo__field"
                label="Add task"
                id="add-task"
                type="text"
                value={taskTitle}
                onInput={onInput}
                error={error}
                ref={newTaskInputRef}
            />
            <Button type="submit" isDisabled={taskTitle.trim().length === 0}>
                Add
            </Button>
        </form>
    );
};

export default AddTaskForm;
