import Field from "./Field";
import Button from "./Button";

const AddTaskForm = ({
  onSubmit,
  taskTitle,
  setTaskTitle,
  newTaskInputRef,
}) => {
  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        className="todo__field"
        label="Add task"
        id="add-task"
        type="text"
        value={taskTitle}
        onInput={(e) => setTaskTitle(e.target.value)}
        ref={newTaskInputRef}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddTaskForm;
