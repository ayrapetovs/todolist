import styles from "./Field.module.css";

const Field = (props) => {
  const { className, label, id, type, onInput, value, ref, error } = props;
  return (
    <div className={`${styles.field} ${className}`}>
      <label
        className={`${styles.field__label} ${error ? styles["field__label--error"] : ""}`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`${styles.field__input} ${error ? styles["field__input--invalid"] : ""}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value}
        onInput={onInput}
        ref={ref}
      />

      {error && (
        <span
          className={`${styles.field__error} ${error ? styles["field__error--error"] : ""}`}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Field;
