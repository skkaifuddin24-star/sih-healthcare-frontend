function TaskStatusCard({ icon, name, time, status }) {
  const isCompleted = status === 'Completed'

  return (
    <div className={`task-status-card ${isCompleted ? 'task-completed' : 'task-pending'}`}>
      <span className="task-icon" aria-hidden="true">
        {icon}
      </span>
      <div className="task-info">
        <span className="task-name">{name}</span>
        <span className="task-time">{time}</span>
      </div>
      <span
        className={`task-badge ${
          isCompleted ? 'badge-task-done' : 'badge-task-pending'
        }`}
      >
        <span className="task-badge-icon" aria-hidden="true">
          {isCompleted ? '✓' : '○'}
        </span>
        {status}
      </span>
    </div>
  )
}

export default TaskStatusCard
