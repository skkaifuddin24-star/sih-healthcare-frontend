import { useLanguage } from '../context/LanguageContext.jsx'

function GameResult({
  moves,
  time,
  matches,
  totalPairs,
  score,
  totalQuestions,
  onPlayAgain,
  onBack,
}) {
  const { t } = useLanguage()

  // If score is provided (for Pattern Recognition, Object Recognition, Routine Recall)
  if (score !== undefined && totalQuestions !== undefined) {
    const percentage = Math.round((score / totalQuestions) * 100)
    let encouragement = t('greatJob')
    if (percentage === 100) {
      encouragement = t('perfectScore')
    } else if (percentage >= 60) {
      encouragement = t('wellDoneKeepPracticing')
    }

    return (
      <div className="game-result-card">
        <h2 className="game-result-title">{t('wellDone')}</h2>
        <p className="game-result-subtitle">{encouragement}</p>

        <div className="game-result-stats">
          <div className="game-result-stat">
            <span className="game-result-value">
              {score} / {totalQuestions}
            </span>
            <span className="game-result-label">{t('score')}</span>
          </div>
          <div className="game-result-stat">
            <span className="game-result-value">{percentage}%</span>
            <span className="game-result-label">{t('accuracy')}</span>
          </div>
          <div className="game-result-stat">
            <span className="game-result-value">{totalQuestions}</span>
            <span className="game-result-label">{t('questions')}</span>
          </div>
        </div>

        <div className="game-result-actions">
          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={onPlayAgain}
          >
            {t('playAgain')}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-full"
            onClick={onBack}
          >
            {t('backToActivities')}
          </button>
        </div>
      </div>
    )
  }

  // Memory Match default view
  return (
    <div className="game-result-card">
      <h2 className="game-result-title">{t('wellDone')}</h2>
      <p className="game-result-subtitle">{t('matchedAllPairs')}</p>

      <div className="game-result-stats">
        <div className="game-result-stat">
          <span className="game-result-value">{moves}</span>
          <span className="game-result-label">{t('totalMoves')}</span>
        </div>
        <div className="game-result-stat">
          <span className="game-result-value">{time}</span>
          <span className="game-result-label">{t('timeTaken')}</span>
        </div>
        <div className="game-result-stat">
          <span className="game-result-value">
            {matches}/{totalPairs}
          </span>
          <span className="game-result-label">{t('matches')}</span>
        </div>
      </div>

      <div className="game-result-actions">
        <button
          type="button"
          className="btn btn-primary btn-full"
          onClick={onPlayAgain}
        >
          {t('playAgain')}
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-full"
          onClick={onBack}
        >
          {t('backToActivities')}
        </button>
      </div>
    </div>
  )
}

export default GameResult


