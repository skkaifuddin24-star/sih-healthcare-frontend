import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ManageSection from '../components/ManageSection.jsx'
import ReminderManagementCard from '../components/ReminderManagementCard.jsx'
import ActivityManagementCard from '../components/ActivityManagementCard.jsx'
import AddEditModal from '../components/AddEditModal.jsx'
import PreferenceControl from '../components/PreferenceControl.jsx'
import '../styles/dashboard.css'

const INITIAL_REMINDERS = [
  {
    id: 1,
    icon: '💊',
    title: 'Morning Medicine',
    time: '10:00 AM',
    frequency: 'Daily',
    type: 'Medicine',
  },
  {
    id: 2,
    icon: '💊',
    title: 'Evening Medicine',
    time: '07:00 PM',
    frequency: 'Daily',
    type: 'Medicine',
  },
  {
    id: 3,
    icon: '💧',
    title: 'Drink Water',
    time: '11:30 AM',
    frequency: 'Daily',
    type: 'Hydration',
  },
]

const INITIAL_ACTIVITIES = [
  {
    id: 101,
    icon: '🚶',
    title: '15 Minute Walk',
    time: '05:00 PM',
    description: 'Gentle walk in garden or balcony',
  },
  {
    id: 102,
    icon: '🧠',
    title: 'Memory Practice',
    time: '06:00 PM',
    description: 'Cognitive activity session',
  },
  {
    id: 103,
    icon: '🧘',
    title: 'Relaxation Activity',
    time: '08:00 PM',
    description: 'Evening calm and rest',
  },
]

function CaregiverManage() {
  const navigate = useNavigate()

  // State lists
  const [reminders, setReminders] = useState(INITIAL_REMINDERS)
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES)

  // Preferences State
  const [preferences, setPreferences] = useState({
    language: 'English',
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
          aria-label="Back to caregiver dashboard"
        >
          ← Back to Caregiver Dashboard
        </button>

        {/* Header Section */}
        <div className="caregiver-header">
          <div>
            <h1 className="dash-greeting">Manage Patient</h1>
            <p className="dash-subtext">
              Manage <strong>Ramesh Kumar</strong>'s daily routine and activities.
            </p>
          </div>

          <div className="patient-selector-card">
            <span className="patient-avatar" aria-hidden="true">
              👴
            </span>
            <div className="patient-info">
              <span className="patient-label">Active Patient</span>
              <h2 className="patient-name">Ramesh Kumar</h2>
              <span className="patient-meta">Age: 72 years</span>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showSaveToast && (
          <div className="toast-success-banner" role="status" aria-live="polite">
            <span className="toast-icon" aria-hidden="true">
              ✓
            </span>
            <span>Changes saved successfully.</span>
          </div>
        )}

        {/* Section 1: Reminders */}
        <ManageSection
          title="Reminders"
          icon="💊"
          actionButton={
            <button
              type="button"
              className="btn btn-primary btn-sm-action"
              onClick={handleOpenAddReminder}
            >
              + Add Reminder
            </button>
          }
        >
          {reminders.length === 0 ? (
            <div className="empty-manage-state">No reminders added yet.</div>
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
          title="Daily Activities"
          icon="🏃"
          actionButton={
            <button
              type="button"
              className="btn btn-primary btn-sm-action"
              onClick={handleOpenAddActivity}
            >
              + Add Activity
            </button>
          }
        >
          {activities.length === 0 ? (
            <div className="empty-manage-state">No daily activities added yet.</div>
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
        <ManageSection title="Patient Preferences" icon="⚙️">
          <div className="preferences-group">
            <PreferenceControl
              label="Language"
              description="Preferred interface display language for the patient"
              value={preferences.language}
              options={[
                { label: 'English', value: 'English' },
                { label: 'Hindi', value: 'Hindi' },
                { label: 'Tamil', value: 'Tamil' },
                { label: 'Telugu', value: 'Telugu' },
                { label: 'Bengali', value: 'Bengali' },
              ]}
              onChange={(val) =>
                setPreferences((prev) => ({ ...prev, language: val }))
              }
            />

            <PreferenceControl
              label="Voice Assistance"
              description="Enable spoken text & audio guidance for activities"
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
              label="Large Text"
              description="Use enlarged typography & high-contrast cards"
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
            Save Changes
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
