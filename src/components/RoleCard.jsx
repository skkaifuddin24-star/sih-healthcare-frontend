function RoleCard({ label, description, selected, onSelect, icon }) {
  return (
    <button
      type="button"
      className={`role-card ${selected ? 'role-card-selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="role-card-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="role-card-text">
        <span className="role-card-label">{label}</span>
        <span className="role-card-description">{description}</span>
      </span>
      <span className="role-card-radio" aria-hidden="true">
        {selected && <span className="role-card-radio-dot" />}
      </span>
    </button>
  )
}

export default RoleCard
