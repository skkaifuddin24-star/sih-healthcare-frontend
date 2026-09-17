import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

function AddReminderModal({ isOpen, onClose, onAddReminder }) {
  const { t } = useLanguage()

  const reminderTypes = [
    { label: `💊 ${t('medicine')}`, icon: '💊', value: 'Medicine' },
    { label: `💧 ${t('hydration')}`, icon: '💧', value: 'Hydration' },
    { label: `🏃 ${t('dailyActivity')}`, icon: '🏃', value: 'Daily Activity' },
    { label: `🏥 ${t('appointment')}`, icon: '🏥', value: 'Appointment' },
    { label: `🥣 ${t('meal')}`, icon: '🥣', value: 'Meal' },
    { label: `💤 ${t('rest')}`, icon: '💤', value: 'Rest' },
  ]

  const [selectedType, setSelectedType] = useState(reminderTypes[0])
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError(t('reminderTitle'))
      return
    }

    if (!time.trim()) {
      setError(t('time'))
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
            {t('addReminder')}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label={t('close')}
          >
            ✕
          </button>
        </div>

        {error && <div className="modal-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="reminder-type" className="form-label">
              {t('reminderType')}
            </label>
            <select
              id="reminder-type"
              className="form-select"
              value={selectedType.value}
              onChange={(e) => {
                const found = reminderTypes.find(
                  (t) => t.value === e.target.value
                )
                if (found) setSelectedType(found)
              }}
            >
              {reminderTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reminder-title" className="form-label">
              {t('reminderTitle')}
            </label>
            <input
              id="reminder-title"
              type="text"
              className="form-input"
              placeholder={t('reminderTitle')}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (error) setError('')
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reminder-time" className="form-label">
              {t('time')}
            </label>
            <input
              id="reminder-time"
              type="text"
              className="form-input"
              placeholder={t('time')}
              value={time}
              onChange={(e) => {
                setTime(e.target.value)
                if (error) setError('')
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reminder-desc" className="form-label">
              {t('shortDesc')}
            </label>
            <input
              id="reminder-desc"
              type="text"
              className="form-input"
              placeholder={t('shortDesc')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary btn-full">
              {t('addReminder')}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-full"
              onClick={onClose}
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddReminderModal

