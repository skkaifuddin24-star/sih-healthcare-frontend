import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReminderCard from '../components/ReminderCard.jsx'
import AddReminderModal from '../components/AddReminderModal.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import '../styles/dashboard.css'

function Reminders() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const initialReminders = [
    {
      id: 1,
      icon: '💊',
      title: t('morningMedicine'),
      time: '10:00 AM',
      type: 'Medicine',
      description: t('morningMedicineDesc'),
      status: 'Pending',
    },
    {
      id: 2,
      icon: '💧',
      title: t('drinkWater'),
      time: '11:30 AM',
      type: 'Hydration',
      description: t('drinkWaterDesc'),
      status: 'Completed',
    },
    {
      id: 3,
      icon: '🏃',
      title: t('walk'),
      time: '05:00 PM',
      type: 'Daily Activity',
      description: t('walkDesc'),
      status: 'Pending',
    },
    {
      id: 4,
      icon: '🏥',
      title: t('doctorAppointment'),
      time: '06:30 PM',
      type: 'Appointment',
      description: t('doctorAppointmentDesc'),
      status: 'Pending',
    },
  ]

  const [reminders, setReminders] = useState(initialReminders)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleToggleDone = (id) => {
    setReminders((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'Completed' ? 'Pending' : 'Completed'
          return { ...item, status: nextStatus }
        }
        return item
      })
    )
  }

  const handleDelete = (id) => {
    setReminders((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddReminder = (newReminder) => {
    setReminders((prev) => [newReminder, ...prev])
  }

  const completedCount = reminders.filter((r) => r.status === 'Completed').length
  const totalCount = reminders.length

  return (
    <div className="dash-page">
      <div className="dash-container reminders-page-container">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/patient')}
          aria-label={t('backToDashboard')}
        >
          {t('backToDashboard')}
        </button>

        <div className="reminders-header-section">
          <div>
            <h1 className="dash-greeting">{t('todaysReminders')}</h1>
            <p className="dash-subtext">{t('remindersSubtext')}</p>
          </div>
          <button
            type="button"
            className="btn btn-primary add-reminder-trigger-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            {t('addReminder')}
          </button>
        </div>

        {totalCount > 0 && (
          <div className="reminders-summary-bar">
            <span className="summary-text">
              {t('completedTasks').replace('{completed}', completedCount).replace('{total}', totalCount)}
            </span>
            <div className="summary-progress-bg">
              <div
                className="summary-progress-fill"
                style={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="reminders-list-section">
          {reminders.length === 0 ? (
            <div className="empty-reminders-card">
              <span className="empty-icon" aria-hidden="true">
                📋
              </span>
              <h3>{t('noReminders')}</h3>
              <p>{t('clickAddReminder')}</p>
            </div>
          ) : (
            <div className="reminder-card-list">
              {reminders.map((reminder) => (
                <ReminderCard
                  key={reminder.id}
                  icon={reminder.icon}
                  title={reminder.title}
                  time={reminder.time}
                  status={reminder.status}
                  description={reminder.description}
                  onToggleDone={() => handleToggleDone(reminder.id)}
                  onDelete={() => handleDelete(reminder.id)}
                />
              ))}
            </div>
          )}
        </div>

        <AddReminderModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddReminder={handleAddReminder}
        />
      </div>
    </div>
  )
}

export default Reminders

