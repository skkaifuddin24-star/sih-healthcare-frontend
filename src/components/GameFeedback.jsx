function GameFeedback({
  isCorrect,
  correctAnswerText,
  explanation,
  onNext,
  isLastQuestion,
}) {
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
            {isCorrect ? '✓ Correct! Well done.' : '✕ Not quite right.'}
          </h3>
          {!isCorrect && correctAnswerText && (
            <p className="feedback-correct-answer">
              The correct answer is: <strong>{correctAnswerText}</strong>
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
        {isLastQuestion ? 'See Final Results →' : 'Next Question →'}
      </button>
    </div>
  )
}

export default GameFeedback
