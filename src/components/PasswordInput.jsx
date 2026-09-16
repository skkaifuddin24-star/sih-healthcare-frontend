import { useState } from 'react'

function PasswordInput({ id, label, value, onChange, placeholder, error, autoComplete }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="password-wrapper">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          className={`form-input ${error ? 'form-input-error' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {error && (
        <p className="form-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

export default PasswordInput
