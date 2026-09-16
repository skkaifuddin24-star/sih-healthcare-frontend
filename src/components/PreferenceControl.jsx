function PreferenceControl({ label, description, value, options, onChange }) {
  return (
    <div className="preference-control-row">
      <div className="preference-info">
        <span className="preference-label">{label}</span>
        {description && <span className="preference-desc">{description}</span>}
      </div>
      <div className="preference-input">
        <select
          className="form-select preference-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default PreferenceControl
