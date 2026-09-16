function SummaryCard({ icon, title, value, subtext }) {
  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <span className="summary-card-icon" aria-hidden="true">
          {icon}
        </span>
        <h3 className="summary-card-title">{title}</h3>
      </div>
      <div className="summary-card-body">
        <span className="summary-card-value">{value}</span>
        {subtext && <span className="summary-card-subtext">{subtext}</span>}
      </div>
    </div>
  )
}

export default SummaryCard
