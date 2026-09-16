function SelectionCard({ title, description, icon, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`selection-card ${selected ? 'selection-card-selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="selection-card-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="selection-card-title">{title}</span>
      <span className="selection-card-description">{description}</span>
    </button>
  )
}

export default SelectionCard
