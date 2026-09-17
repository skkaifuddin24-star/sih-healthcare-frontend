import { useLanguage } from '../context/LanguageContext.jsx'

function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText,
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
  isSimulating = false,
  simulatedMessage = '',
}) {
  const { t } = useLanguage()

  if (!isOpen) return null

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onClick={onCancel}
    >
      <div
        className="modal-content confirmation-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="confirm-modal-title" className="modal-title">
            {title}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onCancel}
            aria-label={t('close')}
          >
            ✕
          </button>
        </div>

        {isSimulating ? (
          <div className="simulated-call-body">
            <div className="pulse-icon-container" aria-hidden="true">
              {confirmVariant === 'danger' ? '🚨' : '📞'}
            </div>
            <h3 className="simulated-status-heading">
              {confirmVariant === 'danger'
                ? t('emergencyAssistanceTitle')
                : t('callCaregiver')}
            </h3>
            <p className="simulated-status-text">
              {simulatedMessage}
            </p>
            <div className="simulated-badge">Simulated Action</div>
            <button
              type="button"
              className="btn btn-secondary btn-full"
              onClick={onCancel}
            >
              {t('close')}
            </button>
          </div>
        ) : (
          <div className="modal-body">
            <p className="confirmation-modal-message">{message}</p>

            <div className="modal-actions">
              <button
                type="button"
                className={`btn ${
                  confirmVariant === 'danger' ? 'btn-danger' : 'btn-primary'
                } btn-full`}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-full"
                onClick={onCancel}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfirmationModal

