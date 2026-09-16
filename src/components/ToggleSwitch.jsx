function ToggleSwitch({ label, description, isOn, onToggle }) {
  return (
    <div className="toggle-switch-row">
      <div className="toggle-switch-info">
        <span className="toggle-switch-label">{label}</span>
        {description && <span className="toggle-switch-desc">{description}</span>}
      </div>
      <button
        type="button"
        className={`toggle-switch-btn ${isOn ? 'toggle-on' : 'toggle-off'}`}
        onClick={onToggle}
        role="switch"
        aria-checked={isOn}
        aria-label={label}
      >
        <span className="toggle-switch-pill">
          <span className="toggle-switch-handle" />
        </span>
        <span className="toggle-switch-text">{isOn ? 'ON' : 'OFF'}</span>
      </button>
    </div>
  )
}

export default ToggleSwitch
