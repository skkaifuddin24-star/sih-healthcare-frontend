function MemoryCard({ symbol, name, isFlipped, isMatched, disabled, onClick }) {
  const revealed = isFlipped || isMatched

  return (
    <button
      type="button"
      className={`memory-card ${revealed ? 'memory-card-revealed' : ''} ${
        isMatched ? 'memory-card-matched' : ''
      }`}
      onClick={onClick}
      disabled={disabled || isMatched}
      aria-label={revealed ? name : 'Face-down card. Tap to reveal.'}
      aria-pressed={revealed}
    >
      {revealed ? (
        <span className="memory-card-symbol" aria-hidden="true">
          {symbol}
        </span>
      ) : (
        <span className="memory-card-hidden" aria-hidden="true">
          ?
        </span>
      )}
      {isMatched && (
        <span className="memory-card-check" aria-hidden="true">
          ✔
        </span>
      )}
    </button>
  )
}

export default MemoryCard
