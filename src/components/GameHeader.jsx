import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

function GameHeader({ title, instruction, onBack }) {
  const navigate = useNavigate()
  const { t } = useLanguage()

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
        aria-label={t('backToActivities')}
      >
        {t('backToActivities')}
      </button>
      <h1 className="dash-greeting">{title}</h1>
      {instruction && <p className="dash-subtext">{instruction}</p>}
    </div>
  )
}

export default GameHeader

