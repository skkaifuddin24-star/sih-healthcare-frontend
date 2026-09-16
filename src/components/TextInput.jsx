function TextInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  inputMode,
}) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p className="form-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

export default TextInput
