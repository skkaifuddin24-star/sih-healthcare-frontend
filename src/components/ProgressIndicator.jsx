function ProgressIndicator({ currentRound, totalRounds }) {
  const percentage = Math.round((currentRound / totalRounds) * 100)

  return (
    <div
      className="game-progress-container"
      aria-label={`Question ${currentRound} of ${totalRounds}`}
    >
      <div className="game-progress-info">
        <span className="game-progress-text">
          Question <strong>{currentRound}</strong> of <strong>{totalRounds}</strong>
        </span>
        <span className="game-progress-percentage">{percentage}%</span>
      </div>
      <div
        className="game-progress-bar-bg"
        role="progressbar"
        aria-valuenow={currentRound}
        aria-valuemin={1}
        aria-valuemax={totalRounds}
      >
        <div
          className="game-progress-bar-fill"
          style={{ width: `${(currentRound / totalRounds) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressIndicator
