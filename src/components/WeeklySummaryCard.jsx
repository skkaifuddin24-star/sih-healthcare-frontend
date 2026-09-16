function WeeklySummaryCard({ title, value, label, icon }) {
  return (
    <div className="weekly-summary-card">
      <div className="weekly-card-header">
        {icon && <span className="weekly-card-icon" aria-hidden="true">{icon}</span>}
        <span className="weekly-card-label">{label || title}</span>
      </div>
      <div className="weekly-card-value">{value}</div>
    </div>
  )
}

export default WeeklySummaryCard
