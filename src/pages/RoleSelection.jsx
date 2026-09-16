import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import SelectionCard from '../components/SelectionCard.jsx'
import PatientIcon from '../components/PatientIcon.jsx'
import CaregiverIcon from '../components/CaregiverIcon.jsx'

function RoleSelection() {
  const navigate = useNavigate()

  return (
    <div className="auth-page">
      <div className="auth-card selection-card-wrapper">
        <div className="auth-header">
          <Logo />
          <h1 className="app-name">Smriti</h1>
        </div>

        <h2 className="auth-heading">How will you use the app?</h2>

        <div className="selection-card-group">
          <SelectionCard
            title="Patient"
            description="Get memory assistance, cognitive activities and daily reminders."
            icon={<PatientIcon />}
            onSelect={() => navigate('/patient')}
          />
          <SelectionCard
            title="Caregiver"
            description="Monitor patient progress, routines and activities."
            icon={<CaregiverIcon />}
            onSelect={() => navigate('/caregiver')}
          />
        </div>
      </div>
    </div>
  )
}

export default RoleSelection
