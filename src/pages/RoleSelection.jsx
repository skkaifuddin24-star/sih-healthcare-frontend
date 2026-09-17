import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import SelectionCard from '../components/SelectionCard.jsx'
import PatientIcon from '../components/PatientIcon.jsx'
import CaregiverIcon from '../components/CaregiverIcon.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

function RoleSelection() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <div className="auth-page">
      <div className="auth-card selection-card-wrapper">
        <div className="auth-header">
          <Logo />
          <h1 className="app-name">{t('appName')}</h1>
        </div>

        <h2 className="auth-heading">{t('howWillYouUse')}</h2>

        <div className="selection-card-group">
          <SelectionCard
            title={t('patient')}
            description={t('patientDesc')}
            icon={<PatientIcon />}
            onSelect={() => navigate('/patient')}
          />
          <SelectionCard
            title={t('caregiver')}
            description={t('caregiverDesc')}
            icon={<CaregiverIcon />}
            onSelect={() => navigate('/caregiver')}
          />
        </div>
      </div>
    </div>
  )
}

export default RoleSelection

