function ProgressCard({ gamesCompleted, gamesTotal, performance, streak }) {
  return (
    <section className="progress-card" aria-labelledby="progress-card-heading">
      <h2 id="progress-card-heading" className="section-heading">
        Today's Progress
      </h2>
      <p className="progress-note">Based on today's activity and engagement.</p>

      <div className="progress-stats">
        <div className="progress-stat">
          <span className="progress-stat-value">
            {gamesCompleted}/{gamesTotal}
          </span>
          <span className="progress-stat-label">Games Completed</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat-value">{performance}%</span>
          <span className="progress-stat-label">Activity Performance</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat-value">{streak} days</span>
          <span className="progress-stat-label">Daily Streak</span>
        </div>
      </div>

      <div className="progress-bar-track" role="img" aria-label={`Activity performance ${performance}%`}>
        <div className="progress-bar-fill" style={{ width: `${performance}%` }} />
      </div>
    </section>
  )
}

export default ProgressCard
