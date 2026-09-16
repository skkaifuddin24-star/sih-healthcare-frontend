const DEFAULT_COUNT_DATA = [
  { day: 'Monday', completed: 7, total: 8 },
  { day: 'Tuesday', completed: 8, total: 8 },
  { day: 'Wednesday', completed: 6, total: 8 },
  { day: 'Thursday', completed: 8, total: 8 },
  { day: 'Friday', completed: 7, total: 8 },
  { day: 'Saturday', completed: 8, total: 8 },
  { day: 'Sunday', completed: 6, total: 8 },
]

const DEFAULT_PERCENT_DATA = [
  { day: 'Monday', value: 72 },
  { day: 'Tuesday', value: 78 },
  { day: 'Wednesday', value: 65 },
  { day: 'Thursday', value: 82 },
  { day: 'Friday', value: 80 },
  { day: 'Saturday', value: 85 },
  { day: 'Sunday', value: 76 },
]

function ProgressChart({ title, data, type = 'count' }) {
  const chartData =
    data && data.length > 0
      ? data
      : type === 'count'
      ? DEFAULT_COUNT_DATA
      : DEFAULT_PERCENT_DATA

  return (
    <div className="progress-chart-card">
      <h3 className="chart-title">{title}</h3>

      <div className="chart-bars-container">
        {chartData.map((item, idx) => {
          let percentage = 0
          let displayLabel = ''

          if (type === 'count') {
            const completed = item.completed ?? 0
            const total = item.total || 1
            percentage = Math.round((completed / total) * 100)
            displayLabel = `${completed}/${total}`
          } else {
            percentage = item.value ?? 0
            displayLabel = `${percentage}%`
          }

          return (
            <div key={idx} className="chart-bar-column">
              <span className="bar-top-value">{displayLabel}</span>
              <div className="bar-track">
                <div
                  className={`bar-fill ${
                    percentage >= 80
                      ? 'bar-high'
                      : percentage >= 65
                      ? 'bar-mid'
                      : 'bar-low'
                  }`}
                  style={{ height: `${Math.max(percentage, 6)}%` }}
                />
              </div>
              <span className="bar-day-label">
                {(item.day || '').substring(0, 3)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressChart
