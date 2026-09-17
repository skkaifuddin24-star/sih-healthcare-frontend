import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ToggleSwitch from '../components/ToggleSwitch.jsx'
import LanguageSelector from '../components/LanguageSelector.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import '../styles/dashboard.css'

const LANGUAGES = [
  { label: 'English', nativeName: 'English', value: 'en' },
  { label: 'Hindi', nativeName: 'हिंदी', value: 'hi' },
  { label: 'Bengali', nativeName: 'বাংলা', value: 'bn' },
  { label: 'Assamese', nativeName: 'অসমীয়া', value: 'as' },
]

function Settings() {
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()

  // Profile State
  const [profile, setProfile] = useState({
    name: 'Ramesh Kumar',
    age: 72,
  })
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [tempName, setTempName] = useState(profile.name)
  const [tempAge, setTempAge] = useState(profile.age)

  // Accessibility State
  const [accessibility, setAccessibility] = useState({
    voiceAssistance: true,
    largeText: true,
    highContrast: false,
  })

  // Notifications State
  const [notifications, setNotifications] = useState({
    medicine: true,
    activity: true,
    appointment: true,
  })

  // Handlers for Edit Profile
  const handleSaveProfile = (e) => {
    e.preventDefault()
    setProfile({
      name: tempName.trim() || 'Ramesh Kumar',
      age: Number(tempAge) || 72,
    })
    setIsEditingProfile(false)
  }

  const handleToggleAccessibility = (key) => {
    setAccessibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleLogOut = () => {
    navigate('/login')
  }

  // Dynamic root classes for immediate visual response
  const containerClass = `dash-container settings-page-container ${
    accessibility.largeText ? 'settings-large-text' : ''
  } ${accessibility.highContrast ? 'settings-high-contrast' : ''}`

  return (
    <div className="dash-page">
      <div className={containerClass}>
        {/* Header */}
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/patient')}
          aria-label={t('backToDashboard')}
        >
          {t('backToDashboard')}
        </button>

        <div className="settings-header-card">
          <h1 className="dash-greeting">{t('settings')}</h1>
          <p className="dash-subtext">{t('managePreferences')}</p>
        </div>

        {/* Section 1: Patient Profile */}
        <section aria-labelledby="profile-heading" className="settings-section-card">
          <h2 id="profile-heading" className="settings-section-title">
            👤 {t('patientProfile')}
          </h2>

          <div className="settings-profile-display">
            <div className="settings-avatar-icon" aria-hidden="true">
              👴
            </div>
            <div className="settings-profile-info">
              <h3 className="settings-profile-name">{profile.name}</h3>
              <p className="settings-profile-meta">
                {t('age')}: {profile.age} {t('yearsOld')}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-edit-profile"
              onClick={() => {
                setTempName(profile.name)
                setTempAge(profile.age)
                setIsEditingProfile(true)
              }}
            >
              {t('editProfile')}
            </button>
          </div>
        </section>

        {/* Section 2: Language */}
        <section aria-labelledby="language-heading" className="settings-section-card">
          <h2 id="language-heading" className="settings-section-title">
            🌐 {t('language')}
          </h2>
          <p className="settings-section-subtext">
            {t('languageDesc')}
          </p>
          <LanguageSelector
            languages={LANGUAGES}
            selectedLanguage={language}
            onSelectLanguage={setLanguage}
          />
        </section>

        {/* Section 3: Accessibility */}
        <section aria-labelledby="accessibility-heading" className="settings-section-card">
          <h2 id="accessibility-heading" className="settings-section-title">
            👁️ {t('accessibility')}
          </h2>
          <div className="settings-toggle-group">
            <ToggleSwitch
              label={t('voiceAssistance')}
              description={t('voiceAssistanceDesc')}
              isOn={accessibility.voiceAssistance}
              onToggle={() => handleToggleAccessibility('voiceAssistance')}
            />
            <ToggleSwitch
              label={t('largeText')}
              description={t('largeTextDesc')}
              isOn={accessibility.largeText}
              onToggle={() => handleToggleAccessibility('largeText')}
            />
            <ToggleSwitch
              label={t('highContrast')}
              description={t('highContrastDesc')}
              isOn={accessibility.highContrast}
              onToggle={() => handleToggleAccessibility('highContrast')}
            />
          </div>
        </section>

        {/* Section 4: Notifications */}
        <section aria-labelledby="notifications-heading" className="settings-section-card">
          <h2 id="notifications-heading" className="settings-section-title">
            🔔 {t('notifications')}
          </h2>
          <div className="settings-toggle-group">
            <ToggleSwitch
              label={t('medicineReminders')}
              description={t('medicineRemindersDesc')}
              isOn={notifications.medicine}
              onToggle={() => handleToggleNotification('medicine')}
            />
            <ToggleSwitch
              label={t('activityReminders')}
              description={t('activityRemindersDesc')}
              isOn={notifications.activity}
              onToggle={() => handleToggleNotification('activity')}
            />
            <ToggleSwitch
              label={t('appointmentReminders')}
              description={t('appointmentRemindersDesc')}
              isOn={notifications.appointment}
              onToggle={() => handleToggleNotification('appointment')}
            />
          </div>
        </section>

        {/* Section 5: Privacy */}
        <section aria-labelledby="privacy-heading" className="settings-section-card">
          <h2 id="privacy-heading" className="settings-section-title">
            🔒 {t('privacy')}
          </h2>
          <div className="privacy-info-box">
            <span className="privacy-icon" aria-hidden="true">
              🛡️
            </span>
            <p className="privacy-text">
              {t('privacyDesc')}
            </p>
          </div>
        </section>

        {/* Section 6: Log Out */}
        <div className="settings-logout-section">
          <button
            type="button"
            className="btn btn-danger btn-full settings-logout-btn"
            onClick={handleLogOut}
          >
            🚪 {t('logout')}
          </button>
        </div>

        {/* Edit Profile Modal */}
        {isEditingProfile && (
          <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
            onClick={() => setIsEditingProfile(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 id="edit-profile-title" className="modal-title">
                  {t('editPatientProfile')}
                </h2>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setIsEditingProfile(false)}
                  aria-label={t('close')}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="modal-form">
                <div className="form-group">
                  <label htmlFor="edit-name" className="form-label">
                    {t('fullName')} *
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    className="form-input"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-age" className="form-label">
                    {t('age')} *
                  </label>
                  <input
                    id="edit-age"
                    type="number"
                    className="form-input"
                    value={tempAge}
                    onChange={(e) => setTempAge(e.target.value)}
                    required
                    min="1"
                    max="120"
                  />
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary btn-full">
                    {t('saveProfile')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-full"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    {t('cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings

