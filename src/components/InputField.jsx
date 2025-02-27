function InputField({
  wrapperClassStr = "",
  idName = "",
  labelText = "Type here...",
  placeholderText = "Type here...",
  fieldClassStr,
  statusText = "",
  ...rest
}) {
  return (
    <div className={`input-field-wrapper ${wrapperClassStr}`}>
      <label htmlFor={idName} className="label-text">
        {labelText}
      </label>

      <input
        id={idName}
        placeholder={placeholderText}
        className={`input-field ${fieldClassStr}`}
        {...rest}
      />

      {statusText && <p className="status-text">{statusText}</p>}
    </div>
  );
}

export default InputField;
