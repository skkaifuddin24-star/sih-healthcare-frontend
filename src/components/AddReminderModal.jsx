import { useState } from 'react'

const REMINDER_TYPES = [
  { label: '💊 Medicine', icon: '💊', value: 'Medicine' },
  { label: '💧 Hydration', icon: '💧', value: 'Hydration' },
  { label: '🏃 Daily Activity', icon: '🏃', value: 'Daily Activity' },
  { label: '🏥 Appointment', icon: '🏥', value: 'Appointment' },
  { label: '🥣 Meal', icon: '🥣', value: 'Meal' },
  { label: '💤 Rest', icon: '💤', value: 'Rest' },
]

function AddReminderModal({ isOpen, onClose, onAddReminder }) {
  const [selectedType, setSelectedType] = useState(REMINDER_TYPES[0])
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Please enter a title for the reminder.')
      return
    }

    if (!time.trim()) {
      setError('Please enter a time for the reminder.')
      return
    }

    onAddReminder({
      id: Date.now(),
      icon: selectedType.icon,
      type: selectedType.value,
      title: title.trim(),
      time: time.trim(),
      description: description.trim() || undefined,
      status: 'Pending',
    })

    // Reset form
    setTitle('')
    setTime('')
    setDescription('')
    setError('')
    onClose()
  }

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-reminder-title"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="add-reminder-title" className="modal-title">
            Add New Reminder
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {error && <div className="modal-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="reminder-type" className="form-label">
              Reminder Type
            </label>
            <select
              id="reminder-type"
              className="form-select"
              value={selectedType.value}
              onChange={(e) => {
                const found = REMINDER_TYPES.find(
                  (t) => t.value === e.target.value
                )
                if (found) setSelectedType(found)
              }}
            >
              {REMINDER_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reminder-title" className="form-label">
              Reminder Title *
            </label>
            <input
              id="reminder-title"
              type="text"
              className="form-input"
              placeholder="e.g. Evening Medicine"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (error) setError('')
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reminder-time" className="form-label">
              Time *
            </label>
            <input
              id="reminder-time"
              type="text"
              className="form-input"
              placeholder="e.g. 08:00 PM"
              value={time}
              onChange={(e) => {
                setTime(e.target.value)
                if (error) setError('')
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reminder-desc" className="form-label">
              Short Description / Note (Optional)
            </label>
            <input
              id="reminder-desc"
              type="text"
              className="form-input"
              placeholder="e.g. Take 1 pill with warm water after dinner"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary btn-full">
              Add Reminder
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-full"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddReminderModal
