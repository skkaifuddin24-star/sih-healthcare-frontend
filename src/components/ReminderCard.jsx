function ReminderCard({
  icon,
  title,
  time,
  status,
  description,
  onToggleDone,
  onDelete,
}) {
  const isCompleted = status === 'Completed'

  return (
    <div className={`reminder-card ${isCompleted ? 'reminder-card-completed' : ''}`}>
      <span className="reminder-card-icon" aria-hidden="true">
        {icon}
      </span>
      <div className="reminder-card-body">
        <div className="reminder-card-header-row">
          <span className="reminder-card-title">{title}</span>
          <span className="reminder-card-time">{time}</span>
        </div>
        {description && (
          <p className="reminder-card-description">{description}</p>
        )}
        <div className="reminder-card-footer">
          <span
            className={`reminder-status ${
              isCompleted ? 'reminder-status-done' : 'reminder-status-pending'
            }`}
          >
            <span className="reminder-status-icon" aria-hidden="true">
              {isCompleted ? '✔' : '○'}
            </span>
            {status}
          </span>

          {onToggleDone && (
            <button
              type="button"
              className={`btn ${
                isCompleted ? 'btn-secondary' : 'btn-primary'
              } reminder-action-btn`}
              onClick={onToggleDone}
              aria-label={
                isCompleted
                  ? `Mark ${title} as pending`
                  : `Mark ${title} as completed`
              }
            >
              {isCompleted ? '✓ Done (Undo)' : 'Mark as Done'}
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              className="reminder-delete-btn"
              onClick={onDelete}
              aria-label={`Delete ${title} reminder`}
              title="Delete Reminder"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReminderCard
