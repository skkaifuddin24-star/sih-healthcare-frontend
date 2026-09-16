import { useNavigate } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader.jsx'
import AIAssistantCard from '../components/AIAssistantCard.jsx'
import ProgressCard from '../components/ProgressCard.jsx'
import GameCard from '../components/GameCard.jsx'
import ReminderCard from '../components/ReminderCard.jsx'
import EmergencyCard from '../components/EmergencyCard.jsx'
import '../styles/dashboard.css'

// Dummy data only - no backend or API is connected yet.
const PATIENT_NAME = 'Ramesh'

const PROGRESS_DATA = {
  gamesCompleted: 3,
  gamesTotal: 4,
  performance: 75,
  streak: 5,
}

const GAMES = [
  {
    id: 'memory-match',
    icon: '🧠',
    name: 'Memory Match',
    description: 'Improve memory',
  },
  {
    id: 'pattern-recognition',
    icon: '🧩',
    name: 'Pattern Recognition',
    description: 'Improve attention',
  },
  {
    id: 'object-recognition',
    icon: '👁️',
    name: 'Object Recognition',
    description: 'Recognize familiar objects',
  },
  {
    id: 'routine-recall',
    icon: '🗓️',
    name: 'Routine Recall',
    description: 'Remember daily routines',
  },
]

const REMINDERS = [
  {
    id: 1,
    icon: '💊',
    title: 'Morning Medicine',
    time: '10:00 AM',
    status: 'Pending',
  },
  {
    id: 2,
    icon: '💧',
    title: 'Drink Water',
    time: '11:30 AM',
    status: 'Completed',
  },
  {
    id: 3,
    icon: '🏃',
    title: '15 Minute Walk',
    time: '05:00 PM',
    status: 'Pending',
  },
  {
    id: 4,
    icon: '🏥',
    title: 'Doctor Appointment',
    time: '06:30 PM',
    status: 'Pending',
  },
]

function Patient() {
  const navigate = useNavigate()

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
            Today's Cognitive Activities
          </h2>
          <div className="game-card-grid">
            {GAMES.map((game) => (
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
              Today's Reminders
            </h2>
            <button
              type="button"
              className="view-all-link-btn"
              onClick={() => navigate('/reminders')}
            >
              View All Reminders →
            </button>
          </div>
          <div className="reminder-card-list">
            {REMINDERS.map((reminder) => (
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
