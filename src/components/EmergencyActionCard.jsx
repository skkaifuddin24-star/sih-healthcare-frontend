function EmergencyActionCard({
  icon,
  title,
  description,
  buttonText,
  isDanger = false,
  onAction,
}) {
  return (
    <div
      className={`emergency-action-card ${
        isDanger ? 'emergency-card-danger' : 'emergency-card-caregiver'
      }`}
    >
      <div className="emergency-card-top">
        <span className="emergency-action-icon" aria-hidden="true">
          {icon}
        </span>
        <div className="emergency-action-details">
          <h2 className="emergency-action-title">{title}</h2>
          <p className="emergency-action-desc">{description}</p>
        </div>
      </div>
      <button
        type="button"
        className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'} btn-full emergency-action-btn`}
        onClick={onAction}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default EmergencyActionCard
