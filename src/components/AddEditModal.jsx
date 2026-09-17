import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

const REMINDER_TYPES = ['Medicine', 'Hydration', 'Appointment', 'Meal', 'Rest', 'General']
const FREQUENCIES = ['Daily', 'Twice Daily', 'Weekly', 'As Needed']
const ICON_OPTIONS = ['💊', '💧', '🏥', '🏃', '🧠', '🧘', '🥣', '💤', '🚶', '🍎']

function AddEditModal({
  isOpen,
  mode = 'add',
  targetType = 'reminder', // 'reminder' | 'activity'
  initialData = null,
  onClose,
  onSave,
}) {
  const { t } = useLanguage()
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [type, setType] = useState('Medicine')
  const [frequency, setFrequency] = useState('Daily')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('💊')
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setTime(initialData.time || '')
      setType(initialData.type || 'Medicine')
      setFrequency(initialData.frequency || 'Daily')
      setDescription(initialData.description || '')
      setIcon(initialData.icon || (targetType === 'activity' ? '🚶' : '💊'))
    } else {
      setTitle('')
      setTime('')
      setType('Medicine')
      setFrequency('Daily')
      setDescription('')
      setIcon(targetType === 'activity' ? '🚶' : '💊')
    }
    setError('')
  }, [initialData, isOpen, targetType])

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

    onSave({
      id: initialData ? initialData.id : Date.now(),
      title: title.trim(),
      time: time.trim(),
      icon,
      ...(targetType === 'reminder'
        ? { type, frequency, status: initialData?.status || 'Pending' }
        : { description: description.trim() }),
    })

    onClose()
  }

  const modalTitle = `${mode === 'edit' ? t('edit') : t('addReminder')} ${
    targetType === 'reminder' ? t('reminderType') : t('dailyActivity')
  }`

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-modal-title"
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="manage-modal-title" className="modal-title">
            {modalTitle}
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
            <label htmlFor="item-icon" className="form-label">
              Choose Icon
            </label>
            <div className="icon-selector-grid">
              {ICON_OPTIONS.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  className={`icon-option-btn ${icon === ic ? 'icon-selected' : ''}`}
                  onClick={() => setIcon(ic)}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="item-title" className="form-label">
              {targetType === 'reminder' ? `${t('reminderTitle')} *` : `${t('dailyActivity')} *`}
            </label>
            <input
              id="item-title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (error) setError('')
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="item-time" className="form-label">
              {t('time')} *
            </label>
            <input
              id="item-time"
              type="text"
              className="form-input"
              value={time}
              onChange={(e) => {
                setTime(e.target.value)
                if (error) setError('')
              }}
            />
          </div>

          {targetType === 'reminder' ? (
            <>
              <div className="form-group">
                <label htmlFor="item-type" className="form-label">
                  {t('reminderType')}
                </label>
                <select
                  id="item-type"
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {REMINDER_TYPES.map((tItem) => (
                    <option key={tItem} value={tItem}>
                      {tItem}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="item-freq" className="form-label">
                  {t('frequency')}
                </label>
                <select
                  id="item-freq"
                  className="form-select"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  {FREQUENCIES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <div className="form-group">
              <label htmlFor="item-desc" className="form-label">
                {t('description')}
              </label>
              <input
                id="item-desc"
                type="text"
                className="form-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          )}

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary btn-full">
              {t('save')}
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

export default AddEditModal

