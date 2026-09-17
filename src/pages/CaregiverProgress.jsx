import { useNavigate } from 'react-router-dom'
import ProgressChart from '../components/ProgressChart.jsx'
import WeeklySummaryCard from '../components/WeeklySummaryCard.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import '../styles/dashboard.css'

const ROUTINE_COMPLETION_DATA = [
  { day: 'Mon', completed: 7, total: 8 },
  { day: 'Tue', completed: 8, total: 8 },
  { day: 'Wed', completed: 6, total: 8 },
  { day: 'Thu', completed: 8, total: 8 },
  { day: 'Fri', completed: 7, total: 8 },
  { day: 'Sat', completed: 8, total: 8 },
  { day: 'Sun', completed: 6, total: 8 },
]

const PERFORMANCE_DATA = [
  { day: 'Mon', value: 72 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 65 },
  { day: 'Thu', value: 82 },
  { day: 'Fri', value: 80 },
  { day: 'Sat', value: 85 },
  { day: 'Sun', value: 76 },
]

function CaregiverProgress() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const gameBreakdown = [
    { name: t('memoryMatch'), icon: '🧠', plays: 18, total: 20 },
    { name: t('objectRecognition'), icon: '👁️', plays: 15, total: 20 },
    { name: t('patternRecognition'), icon: '🧩', plays: 12, total: 20 },
    { name: t('routineRecall'), icon: '🗓️', plays: 10, total: 20 },
  ]

  return (
    <div className="dash-page caregiver-page">
      <div className="dash-container caregiver-container">
        {/* Header */}
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/caregiver')}
          aria-label={t('backToCaregiver')}
        >
          {t('backToCaregiver')}
        </button>

        <div className="caregiver-header">
          <div>
            <h1 className="dash-greeting">{t('weeklyProgress')}</h1>
            <p className="dash-subtext">
              {t('patientActivity7Days').replace('{name}', 'Ramesh Kumar')}
            </p>
          </div>
        </div>

        {/* Section C: Weekly Summary Cards */}
        <section aria-labelledby="weekly-summary-heading">
          <h2 id="weekly-summary-heading" className="section-heading">
            {t('weeklySummaryOverview')}
          </h2>
          <div className="weekly-summary-grid">
            <WeeklySummaryCard
              icon="📋"
              title={t('totalActivities')}
              value="24"
              label={t('totalActivitiesScheduled')}
            />
            <WeeklySummaryCard
              icon="📈"
              title={t('averageCompletion')}
              value="78%"
              label={t('averageCompletionRate')}
            />
            <WeeklySummaryCard
              icon="🎮"
              title={t('gamesCompleted')}
              value="18"
              label={t('cognitiveGamesCompleted')}
            />
          </div>
        </section>

        {/* Section A & B: Charts Grid */}
        <div className="charts-grid">
          {/* Section A: Routine Completion Graph */}
          <section aria-labelledby="routine-chart-heading">
            <h2 id="routine-chart-heading" className="sr-only">
              {t('dailyRoutineCompletion')}
            </h2>
            <ProgressChart
              title={t('dailyRoutineCompletion')}
              data={ROUTINE_COMPLETION_DATA}
              type="count"
            />
          </section>

          {/* Section B: Cognitive Activity Performance */}
          <section aria-labelledby="performance-chart-heading">
            <h2 id="performance-chart-heading" className="sr-only">
              {t('cognitiveActivityPerformance')}
            </h2>
            <ProgressChart
              title={t('cognitiveActivityPerformance')}
              data={PERFORMANCE_DATA}
              type="percentage"
            />
          </section>
        </div>

        {/* Layout Grid: Breakdown & AI Insight */}
        <div className="caregiver-main-grid">
          {/* Section D: Activity Breakdown */}
          <section aria-labelledby="breakdown-heading" className="caregiver-section">
            <h2 id="breakdown-heading" className="section-heading">
              {t('cognitiveBreakdown')}
            </h2>
            <div className="breakdown-list-card">
              {gameBreakdown.map((game, idx) => {
                const percentage = Math.round((game.plays / game.total) * 100)
                return (
                  <div key={idx} className="breakdown-item">
                    <div className="breakdown-header">
                      <span className="breakdown-icon" aria-hidden="true">
                        {game.icon}
                      </span>
                      <span className="breakdown-name">{game.name}</span>
                      <span className="breakdown-plays-count">
                        <strong>{game.plays}</strong>
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
              {t('aiActivityInsights')}
            </h2>
            <div className="ai-insight-card">
              <div className="ai-insight-badge">
                <span className="insight-sparkle" aria-hidden="true">
                  ✨
                </span>
                {t('aiActivityInsights')}
              </div>
              <ul className="ai-insight-list">
                <li className="ai-insight-item">
                  {t('goodJob')}
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CaregiverProgress

