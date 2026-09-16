function ActivityManagementCard({
  icon,
  title,
  time,
  description,
  onEdit,
  onDelete,
}) {
  return (
    <div className="management-card activity-manage-card">
      <span className="management-card-icon" aria-hidden="true">
        {icon}
      </span>
      <div className="management-card-content">
        <h3 className="management-card-title">{title}</h3>
        <div className="management-card-meta">
          <span className="meta-badge meta-time">⏰ {time}</span>
        </div>
        {description && (
          <p className="management-card-desc">{description}</p>
        )}
      </div>
      <div className="management-card-actions">
        <button
          type="button"
          className="btn btn-secondary btn-icon-action"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
        >
          ✏️ Edit
        </button>
        <button
          type="button"
          className="btn btn-danger btn-icon-action"
          onClick={onDelete}
          aria-label={`Delete ${title}`}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}

export default ActivityManagementCard
