import { useNavigate } from 'react-router-dom'
import GameCard from '../components/GameCard.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import '../styles/dashboard.css'
import '../styles/games.css'

function Games() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const games = [
    {
      id: 'memory',
      icon: '🧠',
      name: t('memoryMatch'),
      description: t('memoryMatchDesc'),
      difficulty: t('easy'),
      path: '/games/memory',
    },
    {
      id: 'pattern',
      icon: '🧩',
      name: t('patternRecognition'),
      description: t('patternRecognitionDesc'),
      difficulty: t('easy'),
      path: '/games/pattern',
    },
    {
      id: 'object',
      icon: '👁️',
      name: t('objectRecognition'),
      description: t('objectRecognitionDesc'),
      difficulty: t('easy'),
      path: '/games/object',
    },
    {
      id: 'routine',
      icon: '🗓️',
      name: t('routineRecall'),
      description: t('routineRecallDesc'),
      difficulty: t('easy'),
      path: '/games/routine',
    },
  ]

  return (
    <div className="dash-page">
      <div className="dash-container">
        <div className="games-page-header">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/patient')}
            aria-label={t('backToDashboard')}
          >
            {t('backToDashboard')}
          </button>
          <h1 className="dash-greeting">{t('cognitiveActivities')}</h1>
          <p className="dash-subtext">{t('chooseActivity')}</p>
        </div>

        <div className="game-card-grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              icon={game.icon}
              name={game.name}
              description={game.description}
              difficulty={game.difficulty}
              onPlay={() => navigate(game.path)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Games

