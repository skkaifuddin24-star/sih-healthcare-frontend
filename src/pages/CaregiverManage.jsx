import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ManageSection from '../components/ManageSection.jsx'
import ReminderManagementCard from '../components/ReminderManagementCard.jsx'
import ActivityManagementCard from '../components/ActivityManagementCard.jsx'
import AddEditModal from '../components/AddEditModal.jsx'
import PreferenceControl from '../components/PreferenceControl.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import '../styles/dashboard.css'

function CaregiverManage() {
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()

  const initialReminders = [
    {
      id: 1,
      icon: '💊',
      title: t('morningMedicine'),
      time: '10:00 AM',
      frequency: t('daily'),
      type: t('medicine'),
    },
    {
      id: 2,
      icon: '💊',
      title: t('eveningMedicine'),
      time: '07:00 PM',
      frequency: t('daily'),
      type: t('medicine'),
    },
    {
      id: 3,
      icon: '💧',
      title: t('drinkWater'),
      time: '11:30 AM',
      frequency: t('daily'),
      type: t('hydration'),
    },
  ]

  const initialActivities = [
    {
      id: 101,
      icon: '🚶',
      title: t('walk'),
      time: '05:00 PM',
      description: t('walkDesc'),
    },
    {
      id: 102,
      icon: '🧠',
      title: t('memoryMatch'),
      time: '06:00 PM',
      description: t('memoryMatchDesc'),
    },
  ]

  // State lists
  const [reminders, setReminders] = useState(initialReminders)
  const [activities, setActivities] = useState(initialActivities)

  // Preferences State
  const [preferences, setPreferences] = useState({
    voiceAssistance: 'ON',
    largeText: 'ON',
  })

  // Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add', // 'add' | 'edit'
    targetType: 'reminder', // 'reminder' | 'activity'
    editingItem: null,
  })

  // Save Notification State
  const [showSaveToast, setShowSaveToast] = useState(false)

  // Open Modal Helpers
  const handleOpenAddReminder = () => {
    setModalState({
      isOpen: true,
      mode: 'add',
      targetType: 'reminder',
      editingItem: null,
    })
  }

  const handleOpenEditReminder = (item) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      targetType: 'reminder',
      editingItem: item,
    })
  }

  const handleOpenAddActivity = () => {
    setModalState({
      isOpen: true,
      mode: 'add',
      targetType: 'activity',
      editingItem: null,
    })
  }

  const handleOpenEditActivity = (item) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      targetType: 'activity',
      editingItem: item,
    })
  }

  // Delete Handlers
  const handleDeleteReminder = (id) => {
    setReminders((prev) => prev.filter((item) => item.id !== id))
  }

  const handleDeleteActivity = (id) => {
    setActivities((prev) => prev.filter((item) => item.id !== id))
  }

  // Save Modal Data Handler
  const handleSaveModalData = (savedItem) => {
    if (modalState.targetType === 'reminder') {
      if (modalState.mode === 'edit') {
        setReminders((prev) =>
          prev.map((r) => (r.id === savedItem.id ? savedItem : r))
        )
      } else {
        setReminders((prev) => [...prev, savedItem])
      }
    } else {
      if (modalState.mode === 'edit') {
        setActivities((prev) =>
          prev.map((a) => (a.id === savedItem.id ? savedItem : a))
        )
      } else {
        setActivities((prev) => [...prev, savedItem])
      }
    }
  }

  // Save Changes Handler
  const handleSaveChanges = () => {
    setShowSaveToast(true)
    setTimeout(() => {
      setShowSaveToast(false)
    }, 4000)
  }

  return (
    <div className="dash-page caregiver-page">
      <div className="dash-container caregiver-container">
        {/* Navigation Back */}
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/caregiver')}
          aria-label={t('backToCaregiver')}
        >
          {t('backToCaregiver')}
        </button>

        {/* Header Section */}
        <div className="caregiver-header">
          <div>
            <h1 className="dash-greeting">{t('managePatientTitle')}</h1>
            <p className="dash-subtext">
              {t('managePatientSubtext')}
            </p>
          </div>

          <div className="patient-selector-card">
            <span className="patient-avatar" aria-hidden="true">
              👴
            </span>
            <div className="patient-info">
              <span className="patient-label">{t('activePatient')}</span>
              <h2 className="patient-name">Ramesh Kumar</h2>
              <span className="patient-meta">{t('age')}: 72 {t('yearsOld')}</span>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showSaveToast && (
          <div className="toast-success-banner" role="status" aria-live="polite">
            <span className="toast-icon" aria-hidden="true">
              ✓
            </span>
            <span>{t('changesSaved')}</span>
          </div>
        )}

        {/* Section 1: Reminders */}
        <ManageSection
          title={t('todaysReminders')}
          icon="💊"
          actionButton={
            <button
              type="button"
              className="btn btn-primary btn-sm-action"
              onClick={handleOpenAddReminder}
            >
              {t('addReminder')}
            </button>
          }
        >
          {reminders.length === 0 ? (
            <div className="empty-manage-state">{t('noRemindersAdded')}</div>
          ) : (
            <div className="management-cards-list">
              {reminders.map((reminder) => (
                <ReminderManagementCard
                  key={reminder.id}
                  icon={reminder.icon}
                  title={reminder.title}
                  time={reminder.time}
                  frequency={reminder.frequency}
                  type={reminder.type}
                  onEdit={() => handleOpenEditReminder(reminder)}
                  onDelete={() => handleDeleteReminder(reminder.id)}
                />
              ))}
            </div>
          )}
        </ManageSection>

        {/* Section 2: Daily Activities */}
        <ManageSection
          title={t('todaysActivities')}
          icon="🏃"
          actionButton={
            <button
              type="button"
              className="btn btn-primary btn-sm-action"
              onClick={handleOpenAddActivity}
            >
              {t('addActivity')}
            </button>
          }
        >
          {activities.length === 0 ? (
            <div className="empty-manage-state">{t('noActivitiesAdded')}</div>
          ) : (
            <div className="management-cards-list">
              {activities.map((activity) => (
                <ActivityManagementCard
                  key={activity.id}
                  icon={activity.icon}
                  title={activity.title}
                  time={activity.time}
                  description={activity.description}
                  onEdit={() => handleOpenEditActivity(activity)}
                  onDelete={() => handleDeleteActivity(activity.id)}
                />
              ))}
            </div>
          )}
        </ManageSection>

        {/* Section 3: Patient Preferences */}
        <ManageSection title={t('patientPreferences')} icon="⚙️">
          <div className="preferences-group">
            <PreferenceControl
              label={t('language')}
              description={t('languageDesc')}
              value={language}
              options={[
                { label: 'English', value: 'en' },
                { label: 'Hindi (हिंदी)', value: 'hi' },
                { label: 'Bengali (বাংলা)', value: 'bn' },
                { label: 'Assamese (অসমীয়া)', value: 'as' },
              ]}
              onChange={(val) => setLanguage(val)}
            />

            <PreferenceControl
              label={t('voiceAssistance')}
              description={t('voiceAssistanceDesc')}
              value={preferences.voiceAssistance}
              options={[
                { label: 'ON', value: 'ON' },
                { label: 'OFF', value: 'OFF' },
              ]}
              onChange={(val) =>
                setPreferences((prev) => ({ ...prev, voiceAssistance: val }))
              }
            />

            <PreferenceControl
              label={t('largeText')}
              description={t('largeTextDesc')}
              value={preferences.largeText}
              options={[
                { label: 'ON', value: 'ON' },
                { label: 'OFF', value: 'OFF' },
              ]}
              onChange={(val) =>
                setPreferences((prev) => ({ ...prev, largeText: val }))
              }
            />
          </div>
        </ManageSection>

        {/* Section 4: Save Changes Button */}
        <div className="save-changes-footer">
          <button
            type="button"
            className="btn btn-primary btn-full save-changes-btn"
            onClick={handleSaveChanges}
          >
            {t('saveChanges')}
          </button>
        </div>

        {/* Add/Edit Modal */}
        <AddEditModal
          isOpen={modalState.isOpen}
          mode={modalState.mode}
          targetType={modalState.targetType}
          initialData={modalState.editingItem}
          onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
          onSave={handleSaveModalData}
        />
      </div>
    </div>
  )
}

export default CaregiverManage

