import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import '../styles/games.css'

function GamePlaceholder({ gameName }) {
  const navigate = useNavigate()

  return (
    <div className="dash-page">
      <div className="dash-container">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/games')}
          aria-label="Back to activities"
        >
          ← Back
        </button>

        <div className="game-placeholder-container">
          <h1 className="dash-greeting">{gameName}</h1>
          <p className="dash-subtext">Coming Soon</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/games')}>
            Back to Activities
          </button>
        </div>
      </div>
    </div>
  )
}

export default GamePlaceholder
