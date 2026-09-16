import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReminderCard from '../components/ReminderCard.jsx'
import AddReminderModal from '../components/AddReminderModal.jsx'
import '../styles/dashboard.css'

const INITIAL_REMINDERS = [
  {
    id: 1,
    icon: '💊',
    title: 'Morning Medicine',
    time: '10:00 AM',
    type: 'Medicine',
    description: 'Take blood pressure tablet with water after breakfast.',
    status: 'Pending',
  },
  {
    id: 2,
    icon: '💧',
    title: 'Drink Water',
    time: '11:30 AM',
    type: 'Hydration',
    description: 'Drink a full glass of fresh water to stay hydrated.',
    status: 'Completed',
  },
  {
    id: 3,
    icon: '🏃',
    title: '15 Minute Walk',
    time: '05:00 PM',
    type: 'Daily Activity',
    description: 'Take a gentle stroll in the garden or balcony.',
    status: 'Pending',
  },
  {
    id: 4,
    icon: '🏥',
    title: 'Doctor Appointment',
    time: '06:30 PM',
    type: 'Appointment',
    description: 'Routine checkup with Dr. Sharma.',
    status: 'Pending',
  },
]

function Reminders() {
  const navigate = useNavigate()
  const [reminders, setReminders] = useState(INITIAL_REMINDERS)
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
          aria-label="Back to dashboard"
        >
          ← Back to Dashboard
        </button>

        <div className="reminders-header-section">
          <div>
            <h1 className="dash-greeting">Today's Reminders</h1>
            <p className="dash-subtext">Here is what you need to do today.</p>
          </div>
          <button
            type="button"
            className="btn btn-primary add-reminder-trigger-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add Reminder
          </button>
        </div>

        {totalCount > 0 && (
          <div className="reminders-summary-bar">
            <span className="summary-text">
              Completed <strong>{completedCount}</strong> of <strong>{totalCount}</strong> tasks today
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
              <h3>No reminders for today</h3>
              <p>Click "Add Reminder" above to create a new reminder.</p>
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
