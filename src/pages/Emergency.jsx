import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmergencyActionCard from '../components/EmergencyActionCard.jsx'
import ConfirmationModal from '../components/ConfirmationModal.jsx'
import '../styles/dashboard.css'

function Emergency() {
  const navigate = useNavigate()
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
          aria-label="Back to dashboard"
        >
          ← Back to Dashboard
        </button>

        <div className="emergency-header-section">
          <h1 className="dash-greeting">Need Help?</h1>
          <p className="dash-subtext">Choose who you want to contact.</p>
        </div>

        <div className="emergency-action-cards-grid">
          <EmergencyActionCard
            icon="👨‍👩‍👧"
            title="Call Caregiver"
            description="Contact your registered caregiver for assistance or routine help."
            buttonText="Call Caregiver"
            isDanger={false}
            onAction={handleOpenCaregiver}
          />

          <EmergencyActionCard
            icon="🚨"
            title="Emergency Help"
            description="Get immediate emergency assistance in case of an urgent medical situation."
            buttonText="Emergency Help"
            isDanger={true}
            onAction={handleOpenEmergency}
          />
        </div>

        {/* Caregiver Confirmation Modal */}
        <ConfirmationModal
          isOpen={activeModal === 'caregiver'}
          title="Call Caregiver"
          message="Do you want to call your registered caregiver now?"
          confirmText="Yes, Call Caregiver"
          confirmVariant="primary"
          onConfirm={handleConfirmCall}
          onCancel={handleCloseModal}
          isSimulating={isSimulating}
          simulatedMessage="Calling your caregiver Ramesh (Simulated Call). Please hold on..."
        />

        {/* Emergency Assistance Confirmation Modal */}
        <ConfirmationModal
          isOpen={activeModal === 'emergency'}
          title="Emergency Assistance"
          message="Are you sure you want to trigger Emergency Help? Your caregiver and local emergency contacts will be notified."
          confirmText="Yes, Send Emergency Help"
          confirmVariant="danger"
          onConfirm={handleConfirmCall}
          onCancel={handleCloseModal}
          isSimulating={isSimulating}
          simulatedMessage="Emergency Alert Dispatched! Caregiver and Medical Response team notified (Simulated Action)."
        />
      </div>
    </div>
  )
}

export default Emergency
