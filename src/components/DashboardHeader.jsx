function DashboardHeader({ patientName, onProfileClick }) {
  return (
    <header className="dash-header">
      <div>
        <h1 className="dash-greeting">Good Morning, {patientName} 👋</h1>
        <p className="dash-subtext">Let's have a good day.</p>
      </div>
      <button
        type="button"
        className="dash-profile-btn"
        onClick={onProfileClick}
        aria-label="Profile and settings"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="13" stroke="#2563EB" strokeWidth="2" />
          <circle cx="14" cy="11" r="4" stroke="#2563EB" strokeWidth="2" />
          <path
            d="M6.5 22c1.4-3.4 4.3-5.2 7.5-5.2s6.1 1.8 7.5 5.2"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  )
}

export default DashboardHeader
