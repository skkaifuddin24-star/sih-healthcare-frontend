import { useNavigate } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader.jsx'
import AIAssistantCard from '../components/AIAssistantCard.jsx'
import ProgressCard from '../components/ProgressCard.jsx'
import GameCard from '../components/GameCard.jsx'
import ReminderCard from '../components/ReminderCard.jsx'
import EmergencyCard from '../components/EmergencyCard.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import '../styles/dashboard.css'

// Dummy data only - no backend or API is connected yet.
const PATIENT_NAME = 'Ramesh'

const PROGRESS_DATA = {
  gamesCompleted: 3,
  gamesTotal: 4,
  performance: 75,
  streak: 5,
}

function Patient() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const games = [
    {
      id: 'memory-match',
      icon: '🧠',
      name: t('memoryMatch'),
      description: t('memoryMatchDesc'),
    },
    {
      id: 'pattern-recognition',
      icon: '🧩',
      name: t('patternRecognition'),
      description: t('patternRecognitionDesc'),
    },
    {
      id: 'object-recognition',
      icon: '👁️',
      name: t('objectRecognition'),
      description: t('objectRecognitionDesc'),
    },
    {
      id: 'routine-recall',
      icon: '🗓️',
      name: t('routineRecall'),
      description: t('routineRecallDesc'),
    },
  ]

  const reminders = [
    {
      id: 1,
      icon: '💊',
      title: t('morningMedicine'),
      time: '10:00 AM',
      status: 'Pending',
    },
    {
      id: 2,
      icon: '💧',
      title: t('drinkWater'),
      time: '11:30 AM',
      status: 'Completed',
    },
    {
      id: 3,
      icon: '🏃',
      title: t('walk'),
      time: '05:00 PM',
      status: 'Pending',
    },
    {
      id: 4,
      icon: '🏥',
      title: t('doctorAppointment'),
      time: '06:30 PM',
      status: 'Pending',
    },
  ]

  const handlePlayGame = () => {
    navigate('/games')
  }

  return (
    <div className="dash-page">
      <div className="dash-container">
        <DashboardHeader
          patientName={PATIENT_NAME}
          onProfileClick={() => navigate('/settings')}
        />

        <AIAssistantCard />

        <ProgressCard
          gamesCompleted={PROGRESS_DATA.gamesCompleted}
          gamesTotal={PROGRESS_DATA.gamesTotal}
          performance={PROGRESS_DATA.performance}
          streak={PROGRESS_DATA.streak}
        />

        <section aria-labelledby="games-heading">
          <h2 id="games-heading" className="section-heading">
            {t('todaysActivities')}
          </h2>
          <div className="game-card-grid">
            {games.map((game) => (
              <GameCard
                key={game.id}
                icon={game.icon}
                name={game.name}
                description={game.description}
                onPlay={() => handlePlayGame(game.id)}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="reminders-heading">
          <div className="section-header-row">
            <h2 id="reminders-heading" className="section-heading">
              {t('todaysReminders')}
            </h2>
            <button
              type="button"
              className="view-all-link-btn"
              onClick={() => navigate('/reminders')}
            >
              {t('viewAllReminders')}
            </button>
          </div>
          <div className="reminder-card-list">
            {reminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                icon={reminder.icon}
                title={reminder.title}
                time={reminder.time}
                status={reminder.status}
              />
            ))}
          </div>
        </section>

        <EmergencyCard
          onCallCaregiver={() => navigate('/emergency')}
          onEmergencyHelp={() => navigate('/emergency')}
        />
      </div>
    </div>
  )
}

export default Patient

