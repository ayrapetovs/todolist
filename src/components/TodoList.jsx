const TodoList = (props) => {
  const { tasks = [], children, filteredTasks } = props;

  return <ul className="todo__list">{children}</ul>;
};

export default TodoList;
