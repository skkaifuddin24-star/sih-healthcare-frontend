import { useLanguage } from '../context/LanguageContext.jsx'

function GameFeedback({
  isCorrect,
  correctAnswerText,
  explanation,
  onNext,
  isLastQuestion,
}) {
  const { t } = useLanguage()

  return (
    <div
      className={`game-feedback-card ${
        isCorrect ? 'feedback-correct' : 'feedback-incorrect'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="feedback-content">
        <div
          className={`feedback-badge ${
            isCorrect ? 'badge-success' : 'badge-error'
          }`}
          aria-hidden="true"
        >
          {isCorrect ? '✓' : '✕'}
        </div>
        <div className="feedback-text-container">
          <h3 className="feedback-title">
            {isCorrect ? `✓ ${t('correct')}` : `✕ ${t('incorrect')}`}
          </h3>
          {!isCorrect && correctAnswerText && (
            <p className="feedback-correct-answer">
              <strong>{correctAnswerText}</strong>
            </p>
          )}
          {explanation && <p className="feedback-explanation">{explanation}</p>}
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-full feedback-next-btn"
        onClick={onNext}
      >
        {isLastQuestion ? `${t('score')} →` : `${t('nextQuestion')} →`}
      </button>
    </div>
  )
}

export default GameFeedback

