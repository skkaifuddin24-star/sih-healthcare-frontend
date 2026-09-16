function ManageSection({ title, icon, actionButton, children }) {
  return (
    <section className="manage-section-card">
      <div className="manage-section-header">
        <div className="manage-section-title-group">
          {icon && (
            <span className="manage-section-icon" aria-hidden="true">
              {icon}
            </span>
          )}
          <h2 className="manage-section-title">{title}</h2>
        </div>
        {actionButton && <div className="manage-section-action">{actionButton}</div>}
      </div>
      <div className="manage-section-body">{children}</div>
    </section>
  )
}

export default ManageSection
