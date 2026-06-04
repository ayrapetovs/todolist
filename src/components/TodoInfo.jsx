const TodoInfo = (props) => {
  const { total, done, onClickDeleteAll } = props;
  const hasTasks = total > 0;
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

export default TodoInfo;
