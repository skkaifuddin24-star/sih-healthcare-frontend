import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'

function Dashboard() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Logo />
          <h1 className="app-name">Smriti</h1>
        </div>
        <h2 className="auth-heading">You're Logged In</h2>
        <p className="app-tagline placeholder-text">
          This is a placeholder dashboard route. The real dashboard will be built separately.
        </p>
        <Link to="/login" className="btn btn-secondary btn-full">
          Back to Login
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
