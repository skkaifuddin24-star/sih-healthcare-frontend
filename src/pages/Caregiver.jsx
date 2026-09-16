import { useNavigate } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard.jsx'
import TaskStatusCard from '../components/TaskStatusCard.jsx'
import AlertCard from '../components/AlertCard.jsx'
import '../styles/dashboard.css'

const PATIENT_DATA = {
  name: 'Ramesh Kumar',
  age: 72,
  condition: 'Mild Cognitive Impairment',
  avatarIcon: '👴',
}

const OVERVIEW_METRICS = [
  {
    icon: '🧠',
    title: 'Cognitive Activities',
    value: '3 / 4 completed',
    subtext: '75% Daily Goal',
  },
  {
    icon: '💊',
    title: 'Medicine',
    value: '2 / 3 taken',
    subtext: '1 Pending Dose',
  },
  {
    icon: '💧',
    title: 'Hydration',
    value: '5 / 6 completed',
    subtext: 'On track',
  },
  {
    icon: '🏃',
    title: 'Daily Activities',
    value: '3 / 4 completed',
    subtext: '1 Walk Pending',
  },
]

const TODAY_TASKS = [
  {
    icon: '💊',
    name: 'Morning Medicine',
    time: '10:00 AM',
    status: 'Completed',
  },
  {
    icon: '💧',
    name: 'Drink Water',
    time: '11:30 AM',
    status: 'Completed',
  },
  {
    icon: '🧠',
    name: 'Memory Game',
    time: '02:00 PM',
    status: 'Completed',
  },
  {
    icon: '🏃',
    name: '15 Minute Walk',
    time: '05:00 PM',
    status: 'Pending',
  },
  {
    icon: '💊',
    name: 'Evening Medicine',
    time: '08:00 PM',
    status: 'Pending',
  },
]

const ALERTS = [
  'Evening medicine is still pending.',
  'Patient has not completed today’s walk.',
]

const RECENT_COGNITIVE_ACTIVITIES = [
  { name: 'Memory Match', icon: '🧠', score: '8/10', date: 'Today' },
  { name: 'Pattern Recognition', icon: '🧩', score: '6/10', date: 'Today' },
  { name: 'Object Recognition', icon: '👁️', score: '9/10', date: 'Yesterday' },
]

function Caregiver() {
  const navigate = useNavigate()

  return (
    <div className="dash-page caregiver-page">
      <div className="dash-container caregiver-container">
        {/* Header Section */}
        <header className="caregiver-header">
          <div className="caregiver-header-text">
            <h1 className="dash-greeting">Good Morning, Caregiver 👋</h1>
            <p className="dash-subtext">
              Here’s how <strong>{PATIENT_DATA.name}</strong> is doing today.
            </p>
          </div>

          <div className="patient-selector-card">
            <div className="patient-avatar" aria-hidden="true">
              {PATIENT_DATA.avatarIcon}
            </div>
            <div className="patient-info">
              <span className="patient-label">Active Patient</span>
              <h2 className="patient-name">{PATIENT_DATA.name}</h2>
              <span className="patient-meta">Age: {PATIENT_DATA.age} years</span>
            </div>
            <button
              type="button"
              className="switch-role-btn"
              onClick={() => navigate('/role-selection')}
              title="Switch Role"
            >
              Switch Role
            </button>
          </div>
        </header>

        {/* Quick Actions Bar */}
        <div className="quick-actions-bar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/caregiver/progress')}
          >
            📊 View Weekly Progress
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/caregiver/manage')}
          >
            ⚙️ Manage Patient
          </button>
        </div>

        {/* Section A: Today's Overview */}
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="section-heading">
            Today's Overview
          </h2>
          <div className="summary-cards-grid">
            {OVERVIEW_METRICS.map((metric, idx) => (
              <SummaryCard
                key={idx}
                icon={metric.icon}
                title={metric.title}
                value={metric.value}
                subtext={metric.subtext}
              />
            ))}
          </div>
        </section>

        {/* Layout Grid: Tasks & Alerts */}
        <div className="caregiver-main-grid">
          {/* Section B: Today's Tasks */}
          <section aria-labelledby="tasks-heading" className="caregiver-section">
            <h2 id="tasks-heading" className="section-heading">
              Today's Tasks
            </h2>
            <div className="task-status-list">
              {TODAY_TASKS.map((task, idx) => (
                <TaskStatusCard
                  key={idx}
                  icon={task.icon}
                  name={task.name}
                  time={task.time}
                  status={task.status}
                />
              ))}
            </div>
          </section>

          {/* Section C: Alerts / Attention */}
          <section aria-labelledby="alerts-heading" className="caregiver-section">
            <AlertCard alerts={ALERTS} />

            {/* Section D: Recent Cognitive Activity */}
            <div className="recent-activity-card">
              <div className="recent-activity-header">
                <h3 className="recent-activity-title">
                  🧠 Recent Cognitive Activity
                </h3>
              </div>
              <div className="recent-activity-list">
                {RECENT_COGNITIVE_ACTIVITIES.map((act, idx) => (
                  <div key={idx} className="recent-activity-item">
                    <span className="recent-icon" aria-hidden="true">
                      {act.icon}
                    </span>
                    <div className="recent-details">
                      <span className="recent-name">{act.name}</span>
                      <span className="recent-date">{act.date}</span>
                    </div>
                    <span className="recent-score-badge">Score: {act.score}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-full view-progress-link-btn"
                onClick={() => navigate('/caregiver/progress')}
              >
                View Full Weekly Progress →
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Caregiver
