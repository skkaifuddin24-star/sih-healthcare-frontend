import { useNavigate } from 'react-router-dom'
import { useMemoryGame } from '../hooks/useMemoryGame.js'
import MemoryCard from '../components/MemoryCard.jsx'
import GameResult from '../components/GameResult.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import '../styles/dashboard.css'
import '../styles/games.css'

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0')
  const secs = (totalSeconds % 60).toString().padStart(2, '0')
  return `${minutes}:${secs}`
}

function MemoryMatch() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const {
    cards,
    moves,
    matches,
    seconds,
    totalPairs,
    isChecking,
    isComplete,
    handleCardClick,
    resetGame,
  } = useMemoryGame()

  return (
    <div className="dash-page">
      <div className="dash-container memory-container">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/games')}
          aria-label={t('backToActivities')}
        >
          {t('backToActivities')}
        </button>

        <div className="games-page-header">
          <h1 className="dash-greeting">{t('memoryMatch')}</h1>
          <p className="dash-subtext">{t('memoryInstruction')}</p>
        </div>

        <div className="memory-stats" role="status" aria-live="polite">
          <div className="memory-stat">
            <span className="memory-stat-value">{moves}</span>
            <span className="memory-stat-label">{t('totalMoves')}</span>
          </div>
          <div className="memory-stat">
            <span className="memory-stat-value">
              {matches}/{totalPairs}
            </span>
            <span className="memory-stat-label">{t('matches')}</span>
          </div>
          <div className="memory-stat">
            <span className="memory-stat-value">{formatTime(seconds)}</span>
            <span className="memory-stat-label">{t('timeTaken')}</span>
          </div>
        </div>

        {isComplete ? (
          <GameResult
            moves={moves}
            time={formatTime(seconds)}
            matches={matches}
            totalPairs={totalPairs}
            onPlayAgain={resetGame}
            onBack={() => navigate('/games')}
          />
        ) : (
          <div className="memory-grid">
            {cards.map((card) => (
              <MemoryCard
                key={card.cardId}
                symbol={card.symbol}
                name={card.name}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                disabled={isChecking}
                onClick={() => handleCardClick(card.cardId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MemoryMatch

