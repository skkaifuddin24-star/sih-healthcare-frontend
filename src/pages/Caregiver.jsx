import { useNavigate } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard.jsx'
import TaskStatusCard from '../components/TaskStatusCard.jsx'
import AlertCard from '../components/AlertCard.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import '../styles/dashboard.css'

const PATIENT_DATA = {
  name: 'Ramesh Kumar',
  age: 72,
  condition: 'Mild Cognitive Impairment',
  avatarIcon: '👴',
}

function Caregiver() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const overviewMetrics = [
    {
      icon: '🧠',
      title: t('cognitiveActivities'),
      value: '3 / 4',
      subtext: t('completed'),
    },
    {
      icon: '💊',
      title: t('medicine'),
      value: '2 / 3',
      subtext: t('completed'),
    },
    {
      icon: '💧',
      title: t('hydration'),
      value: '5 / 6',
      subtext: t('completed'),
    },
    {
      icon: '🏃',
      title: t('dailyActivity'),
      value: '3 / 4',
      subtext: t('completed'),
    },
  ]

  const todayTasks = [
    {
      icon: '💊',
      name: t('morningMedicine'),
      time: '10:00 AM',
      status: 'Completed',
    },
    {
      icon: '💧',
      name: t('drinkWater'),
      time: '11:30 AM',
      status: 'Completed',
    },
    {
      icon: '🧠',
      name: t('memoryMatch'),
      time: '02:00 PM',
      status: 'Completed',
    },
    {
      icon: '🏃',
      name: t('walk'),
      time: '05:00 PM',
      status: 'Pending',
    },
    {
      icon: '💊',
      name: t('eveningMedicine'),
      time: '08:00 PM',
      status: 'Pending',
    },
  ]

  const alerts = [
    t('eveningMedicine') + ' - ' + t('pending'),
    t('walk') + ' - ' + t('pending'),
  ]

  const recentCognitiveActivities = [
    { name: t('memoryMatch'), icon: '🧠', score: '8/10', date: 'Today' },
    { name: t('patternRecognition'), icon: '🧩', score: '6/10', date: 'Today' },
    { name: t('objectRecognition'), icon: '👁️', score: '9/10', date: 'Yesterday' },
  ]

  return (
    <div className="dash-page caregiver-page">
      <div className="dash-container caregiver-container">
        {/* Header Section */}
        <header className="caregiver-header">
          <div className="caregiver-header-text">
            <h1 className="dash-greeting">{t('goodMorningCaregiver')}</h1>
            <p className="dash-subtext">
              {t('patientDoingToday')}
            </p>
          </div>

          <div className="patient-selector-card">
            <div className="patient-avatar" aria-hidden="true">
              {PATIENT_DATA.avatarIcon}
            </div>
            <div className="patient-info">
              <span className="patient-label">{t('activePatient')}</span>
              <h2 className="patient-name">{PATIENT_DATA.name}</h2>
              <span className="patient-meta">{t('age')}: {PATIENT_DATA.age} {t('yearsOld')}</span>
            </div>
            <button
              type="button"
              className="switch-role-btn"
              onClick={() => navigate('/role-selection')}
              title={t('switchRole')}
            >
              {t('switchRole')}
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
            {t('viewWeeklyProgress')}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/caregiver/manage')}
          >
            {t('managePatient')}
          </button>
        </div>

        {/* Section A: Today's Overview */}
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="section-heading">
            {t('todaysOverview')}
          </h2>
          <div className="summary-cards-grid">
            {overviewMetrics.map((metric, idx) => (
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
              {t('todaysTasks')}
            </h2>
            <div className="task-status-list">
              {todayTasks.map((task, idx) => (
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
            <AlertCard alerts={alerts} />

            {/* Section D: Recent Cognitive Activity */}
            <div className="recent-activity-card">
              <div className="recent-activity-header">
                <h3 className="recent-activity-title">
                  {t('recentCognitiveActivity')}
                </h3>
              </div>
              <div className="recent-activity-list">
                {recentCognitiveActivities.map((act, idx) => (
                  <div key={idx} className="recent-activity-item">
                    <span className="recent-icon" aria-hidden="true">
                      {act.icon}
                    </span>
                    <div className="recent-details">
                      <span className="recent-name">{act.name}</span>
                      <span className="recent-date">{act.date}</span>
                    </div>
                    <span className="recent-score-badge">{t('score')}: {act.score}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-full view-progress-link-btn"
                onClick={() => navigate('/caregiver/progress')}
              >
                {t('viewFullWeeklyProgress')}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Caregiver

