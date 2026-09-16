import { useNavigate } from 'react-router-dom'

function GameHeader({ title, instruction, onBack }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate('/games')
    }
  }

  return (
    <div className="games-page-header">
      <button
        type="button"
        className="back-btn"
        onClick={handleBack}
        aria-label="Back to activities"
      >
        ← Back to Activities
      </button>
      <h1 className="dash-greeting">{title}</h1>
      {instruction && <p className="dash-subtext">{instruction}</p>}
    </div>
  )
}

export default GameHeader
