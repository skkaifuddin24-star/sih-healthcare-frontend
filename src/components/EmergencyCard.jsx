function EmergencyCard({ onCallCaregiver, onEmergencyHelp }) {
  return (
    <section className="emergency-card" aria-labelledby="emergency-card-heading">
      <h2 id="emergency-card-heading" className="section-heading">
        Need Help?
      </h2>
      <div className="emergency-actions">
        <button type="button" className="btn btn-secondary btn-full" onClick={onCallCaregiver}>
          Call Caregiver
        </button>
        <button type="button" className="btn btn-danger btn-full" onClick={onEmergencyHelp}>
          Emergency Help
        </button>
      </div>
    </section>
  )
}

export default EmergencyCard
