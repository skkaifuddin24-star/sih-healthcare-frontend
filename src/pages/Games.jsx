import { useNavigate } from 'react-router-dom'
import GameCard from '../components/GameCard.jsx'
import '../styles/dashboard.css'
import '../styles/games.css'

const GAMES = [
  {
    id: 'memory',
    icon: '🧠',
    name: 'Memory Match',
    description: 'Match the same objects and exercise your memory.',
    difficulty: 'Easy',
    path: '/games/memory',
  },
  {
    id: 'pattern',
    icon: '🧩',
    name: 'Pattern Recognition',
    description: 'Find the pattern and choose what comes next.',
    difficulty: 'Easy',
    path: '/games/pattern',
  },
  {
    id: 'object',
    icon: '👁️',
    name: 'Object Recognition',
    description: 'Identify familiar objects from everyday life.',
    difficulty: 'Easy',
    path: '/games/object',
  },
  {
    id: 'routine',
    icon: '🗓️',
    name: 'Routine Recall',
    description: 'Remember the correct order of your daily activities.',
    difficulty: 'Easy',
    path: '/games/routine',
  },
]

function Games() {
  const navigate = useNavigate()

  return (
    <div className="dash-page">
      <div className="dash-container">
        <div className="games-page-header">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/patient')}
            aria-label="Back to dashboard"
          >
            ← Back
          </button>
          <h1 className="dash-greeting">Cognitive Activities</h1>
          <p className="dash-subtext">Choose an activity for today</p>
        </div>

        <div className="game-card-grid">
          {GAMES.map((game) => (
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
