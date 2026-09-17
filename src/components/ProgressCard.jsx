import { useLanguage } from '../context/LanguageContext.jsx'

function ProgressCard({ gamesCompleted, gamesTotal, performance, streak }) {
  const { t } = useLanguage()

  return (
    <section className="progress-card" aria-labelledby="progress-card-heading">
      <h2 id="progress-card-heading" className="section-heading">
        {t('dailyCognitiveProgress')}
      </h2>
      <p className="progress-note">{t('cognitiveProgressDesc')}</p>

      <div className="progress-stats">
        <div className="progress-stat">
          <span className="progress-stat-value">
            {gamesCompleted}/{gamesTotal}
          </span>
          <span className="progress-stat-label">{t('gamesCompleted')}</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat-value">{performance}%</span>
          <span className="progress-stat-label">{t('performanceScore')}</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat-value">{streak} {t('days')}</span>
          <span className="progress-stat-label">{t('dailyStreak')}</span>
        </div>
      </div>

      <div className="progress-bar-track" role="img" aria-label={`Activity performance ${performance}%`}>
        <div className="progress-bar-fill" style={{ width: `${performance}%` }} />
      </div>
    </section>
  )
}

export default ProgressCard

