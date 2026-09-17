import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmergencyActionCard from '../components/EmergencyActionCard.jsx'
import ConfirmationModal from '../components/ConfirmationModal.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import '../styles/dashboard.css'

function Emergency() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [activeModal, setActiveModal] = useState(null) // 'caregiver' | 'emergency' | null
  const [isSimulating, setIsSimulating] = useState(false)

  const handleOpenCaregiver = () => {
    setActiveModal('caregiver')
    setIsSimulating(false)
  }

  const handleOpenEmergency = () => {
    setActiveModal('emergency')
    setIsSimulating(false)
  }

  const handleConfirmCall = () => {
    setIsSimulating(true)
  }

  const handleCloseModal = () => {
    setActiveModal(null)
    setIsSimulating(false)
  }

  return (
    <div className="dash-page">
      <div className="dash-container emergency-page-container">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/patient')}
          aria-label={t('backToDashboard')}
        >
          {t('backToDashboard')}
        </button>

        <div className="emergency-header-section">
          <h1 className="dash-greeting">{t('needHelp')}</h1>
          <p className="dash-subtext">{t('chooseContact')}</p>
        </div>

        <div className="emergency-action-cards-grid">
          <EmergencyActionCard
            icon="👨‍👩‍👧"
            title={t('callCaregiver')}
            description={t('callCaregiverDesc')}
            buttonText={t('callCaregiver')}
            isDanger={false}
            onAction={handleOpenCaregiver}
          />

          <EmergencyActionCard
            icon="🚨"
            title={t('emergencyHelp')}
            description={t('emergencyHelpDesc')}
            buttonText={t('emergencyHelp')}
            isDanger={true}
            onAction={handleOpenEmergency}
          />
        </div>

        {/* Caregiver Confirmation Modal */}
        <ConfirmationModal
          isOpen={activeModal === 'caregiver'}
          title={t('callCaregiver')}
          message={t('confirmCallCaregiverMsg')}
          confirmText={t('yesCallCaregiver')}
          confirmVariant="primary"
          onConfirm={handleConfirmCall}
          onCancel={handleCloseModal}
          isSimulating={isSimulating}
          simulatedMessage={t('simulatingCaregiverCall')}
        />

        {/* Emergency Assistance Confirmation Modal */}
        <ConfirmationModal
          isOpen={activeModal === 'emergency'}
          title={t('emergencyAssistanceTitle')}
          message={t('confirmEmergencyMsg')}
          confirmText={t('yesSendEmergencyHelp')}
          confirmVariant="danger"
          onConfirm={handleConfirmCall}
          onCancel={handleCloseModal}
          isSimulating={isSimulating}
          simulatedMessage={t('simulatingEmergencyCall')}
        />
      </div>
    </div>
  )
}

export default Emergency

