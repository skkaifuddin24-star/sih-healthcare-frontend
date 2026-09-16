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
  // If score is provided (for Pattern Recognition, Object Recognition, Routine Recall)
  if (score !== undefined && totalQuestions !== undefined) {
    const percentage = Math.round((score / totalQuestions) * 100)
    let encouragement = 'Great job exercising your mind today!'
    if (percentage === 100) {
      encouragement = 'Perfect score! Outstanding performance!'
    } else if (percentage >= 60) {
      encouragement = 'Well done! Keep practicing every day.'
    }

    return (
      <div className="game-result-card">
        <h2 className="game-result-title">Well Done! 🎉</h2>
        <p className="game-result-subtitle">{encouragement}</p>

        <div className="game-result-stats">
          <div className="game-result-stat">
            <span className="game-result-value">
              {score} / {totalQuestions}
            </span>
            <span className="game-result-label">Score</span>
          </div>
          <div className="game-result-stat">
            <span className="game-result-value">{percentage}%</span>
            <span className="game-result-label">Accuracy</span>
          </div>
          <div className="game-result-stat">
            <span className="game-result-value">{totalQuestions}</span>
            <span className="game-result-label">Questions</span>
          </div>
        </div>

        <div className="game-result-actions">
          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={onPlayAgain}
          >
            Play Again
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-full"
            onClick={onBack}
          >
            Back to Activities
          </button>
        </div>
      </div>
    )
  }

  // Memory Match default view
  return (
    <div className="game-result-card">
      <h2 className="game-result-title">Well Done! 🎉</h2>
      <p className="game-result-subtitle">You matched all the pairs.</p>

      <div className="game-result-stats">
        <div className="game-result-stat">
          <span className="game-result-value">{moves}</span>
          <span className="game-result-label">Total Moves</span>
        </div>
        <div className="game-result-stat">
          <span className="game-result-value">{time}</span>
          <span className="game-result-label">Time Taken</span>
        </div>
        <div className="game-result-stat">
          <span className="game-result-value">
            {matches}/{totalPairs}
          </span>
          <span className="game-result-label">Matches</span>
        </div>
      </div>

      <div className="game-result-actions">
        <button
          type="button"
          className="btn btn-primary btn-full"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-full"
          onClick={onBack}
        >
          Back to Activities
        </button>
      </div>
    </div>
  )
}

export default GameResult

