import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import RoleSelection from './pages/RoleSelection.jsx'
import Patient from './pages/Patient.jsx'
import Settings from './pages/Settings.jsx'
import Caregiver from './pages/Caregiver.jsx'
import CaregiverProgress from './pages/CaregiverProgress.jsx'
import CaregiverManage from './pages/CaregiverManage.jsx'
import Games from './pages/Games.jsx'
import MemoryMatch from './pages/MemoryMatch.jsx'
import PatternRecognition from './pages/PatternRecognition.jsx'
import ObjectRecognition from './pages/ObjectRecognition.jsx'
import RoutineRecall from './pages/RoutineRecall.jsx'
import Reminders from './pages/Reminders.jsx'
import Emergency from './pages/Emergency.jsx'

function App() {
  const basename = import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL.replace(/\/$/, '')
    : ''

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/caregiver" element={<Caregiver />} />
        <Route path="/caregiver/progress" element={<CaregiverProgress />} />
        <Route path="/caregiver/manage" element={<CaregiverManage />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/memory" element={<MemoryMatch />} />
        <Route path="/games/pattern" element={<PatternRecognition />} />
        <Route path="/games/object" element={<ObjectRecognition />} />
        <Route path="/games/routine" element={<RoutineRecall />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App




