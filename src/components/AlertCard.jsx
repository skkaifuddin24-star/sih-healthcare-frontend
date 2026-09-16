function AlertCard({ alerts = [] }) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="alert-card alert-card-empty">
        <span className="alert-icon" aria-hidden="true">
          ✓
        </span>
        <p className="alert-text">No pending alerts. Patient routine is on track today.</p>
      </div>
    )
  }

  return (
    <div className="alert-card-container">
      <h3 className="alert-section-title">
        <span className="alert-heading-icon" aria-hidden="true">
          ⚠️
        </span>
        Needs Attention
      </h3>
      <div className="alert-list">
        {alerts.map((alert, idx) => (
          <div key={idx} className="alert-item">
            <span className="alert-item-icon" aria-hidden="true">
              ⚠️
            </span>
            <span className="alert-item-text">{alert}</span>
          </div>
        ))}
      </div>
      <p className="alert-disclaimer">
        Informational routine updates. No medical diagnosis provided.
      </p>
    </div>
  )
}

export default AlertCard
