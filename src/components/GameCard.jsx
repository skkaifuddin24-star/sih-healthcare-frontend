function GameCard({ icon, name, description, difficulty, onPlay }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onPlay()
    }
  }

  return (
    <div
      className="game-card"
      role="button"
      tabIndex={0}
      onClick={onPlay}
      onKeyDown={handleKeyDown}
    >
      <span className="game-card-icon" aria-hidden="true">
        {icon}
      </span>
      <h3 className="game-card-name">{name}</h3>
      <p className="game-card-description">{description}</p>
      {difficulty && <span className="game-card-difficulty">{difficulty}</span>}
      <button
        type="button"
        className="btn btn-primary btn-full game-card-play"
        onClick={(e) => {
          e.stopPropagation()
          onPlay()
        }}
      >
        Play
      </button>
    </div>
  )
}

export default GameCard
