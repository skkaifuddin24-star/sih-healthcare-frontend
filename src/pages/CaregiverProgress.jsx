import { useNavigate } from 'react-router-dom'
import ProgressChart from '../components/ProgressChart.jsx'
import WeeklySummaryCard from '../components/WeeklySummaryCard.jsx'
import '../styles/dashboard.css'

const ROUTINE_COMPLETION_DATA = [
  { day: 'Monday', completed: 7, total: 8 },
  { day: 'Tuesday', completed: 8, total: 8 },
  { day: 'Wednesday', completed: 6, total: 8 },
  { day: 'Thursday', completed: 8, total: 8 },
  { day: 'Friday', completed: 7, total: 8 },
  { day: 'Saturday', completed: 8, total: 8 },
  { day: 'Sunday', completed: 6, total: 8 },
]

const PERFORMANCE_DATA = [
  { day: 'Monday', value: 72 },
  { day: 'Tuesday', value: 78 },
  { day: 'Wednesday', value: 65 },
  { day: 'Thursday', value: 82 },
  { day: 'Friday', value: 80 },
  { day: 'Saturday', value: 85 },
  { day: 'Sunday', value: 76 },
]

const GAME_BREAKDOWN = [
  { name: 'Memory Match', icon: '🧠', plays: 18, total: 20 },
  { name: 'Object Recognition', icon: '👁️', plays: 15, total: 20 },
  { name: 'Pattern Recognition', icon: '🧩', plays: 12, total: 20 },
  { name: 'Routine Recall', icon: '🗓️', plays: 10, total: 20 },
]

function CaregiverProgress() {
  const navigate = useNavigate()

  return (
    <div className="dash-page caregiver-page">
      <div className="dash-container caregiver-container">
        {/* Header */}
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/caregiver')}
          aria-label="Back to caregiver dashboard"
        >
          ← Back to Caregiver Dashboard
        </button>

        <div className="caregiver-header">
          <div>
            <h1 className="dash-greeting">Weekly Progress</h1>
            <p className="dash-subtext">
              Patient activity over the last 7 days for <strong>Ramesh Kumar</strong>
            </p>
          </div>
        </div>

        {/* Section C: Weekly Summary Cards */}
        <section aria-labelledby="weekly-summary-heading">
          <h2 id="weekly-summary-heading" className="section-heading">
            Weekly Summary Overview
          </h2>
          <div className="weekly-summary-grid">
            <WeeklySummaryCard
              icon="📋"
              title="Total Activities"
              value="24"
              label="Total Activities Scheduled"
            />
            <WeeklySummaryCard
              icon="📈"
              title="Average Completion"
              value="78%"
              label="Average Completion Rate"
            />
            <WeeklySummaryCard
              icon="🎮"
              title="Games Completed"
              value="18"
              label="Cognitive Games Completed"
            />
          </div>
        </section>

        {/* Section A & B: Charts Grid */}
        <div className="charts-grid">
          {/* Section A: Routine Completion Graph */}
          <section aria-labelledby="routine-chart-heading">
            <h2 id="routine-chart-heading" className="sr-only">
              Daily Routine Completion Chart
            </h2>
            <ProgressChart
              title="Daily Routine Completion"
              data={ROUTINE_COMPLETION_DATA}
              type="count"
            />
          </section>

          {/* Section B: Cognitive Activity Performance */}
          <section aria-labelledby="performance-chart-heading">
            <h2 id="performance-chart-heading" className="sr-only">
              Cognitive Activity Performance Chart
            </h2>
            <ProgressChart
              title="Cognitive Activity Performance"
              data={PERFORMANCE_DATA}
              type="percentage"
            />
            <p className="chart-disclaimer-text">
              Note: This metric reflects cognitive activity engagement and completion performance. It is not a clinical or medical assessment.
            </p>
          </section>
        </div>

        {/* Layout Grid: Breakdown & AI Insight */}
        <div className="caregiver-main-grid">
          {/* Section D: Activity Breakdown */}
          <section aria-labelledby="breakdown-heading" className="caregiver-section">
            <h2 id="breakdown-heading" className="section-heading">
              Cognitive Activity Breakdown
            </h2>
            <div className="breakdown-list-card">
              {GAME_BREAKDOWN.map((game, idx) => {
                const percentage = Math.round((game.plays / game.total) * 100)
                return (
                  <div key={idx} className="breakdown-item">
                    <div className="breakdown-header">
                      <span className="breakdown-icon" aria-hidden="true">
                        {game.icon}
                      </span>
                      <span className="breakdown-name">{game.name}</span>
                      <span className="breakdown-plays-count">
                        <strong>{game.plays}</strong> plays
                      </span>
                    </div>
                    <div className="breakdown-track">
                      <div
                        className="breakdown-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Section E: AI Activity Insight UI */}
          <section aria-labelledby="insight-heading" className="caregiver-section">
            <h2 id="insight-heading" className="section-heading">
              AI Activity Insights
            </h2>
            <div className="ai-insight-card">
              <div className="ai-insight-badge">
                <span className="insight-sparkle" aria-hidden="true">
                  ✨
                </span>
                Activity Insight (Prototype)
              </div>
              <ul className="ai-insight-list">
                <li className="ai-insight-item">
                  Patient has been consistently completing memory activities this week.
                </li>
                <li className="ai-insight-item">
                  Pattern activities were completed less frequently this week.
                </li>
              </ul>
              <p className="ai-insight-disclaimer">
                Static sample observations generated from activity completion patterns. Non-medical reference only.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CaregiverProgress
