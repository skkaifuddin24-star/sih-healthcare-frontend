import { useLanguage } from '../context/LanguageContext.jsx'

function EmergencyCard({ onCallCaregiver, onEmergencyHelp }) {
  const { t } = useLanguage()

  return (
    <section className="emergency-card" aria-labelledby="emergency-card-heading">
      <h2 id="emergency-card-heading" className="section-heading">
        {t('needHelp')}
      </h2>
      <div className="emergency-actions">
        <button type="button" className="btn btn-secondary btn-full" onClick={onCallCaregiver}>
          {t('callCaregiver')}
        </button>
        <button type="button" className="btn btn-danger btn-full" onClick={onEmergencyHelp}>
          {t('emergencyHelp')}
        </button>
      </div>
    </section>
  )
}

export default EmergencyCard

