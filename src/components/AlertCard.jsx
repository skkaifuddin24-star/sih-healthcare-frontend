import { useLanguage } from '../context/LanguageContext.jsx'

function AlertCard({ alerts = [] }) {
  const { t } = useLanguage()

  if (!alerts || alerts.length === 0) {
    return (
      <div className="alert-card alert-card-empty">
        <span className="alert-icon" aria-hidden="true">
          ✓
        </span>
        <p className="alert-text">{t('alertsAndAttention')}</p>
      </div>
    )
  }

  return (
    <div className="alert-card-container">
      <h3 className="alert-section-title">
        <span className="alert-heading-icon" aria-hidden="true">
          ⚠️
        </span>
        {t('alertsAndAttention')}
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
    </div>
  )
}

export default AlertCard

