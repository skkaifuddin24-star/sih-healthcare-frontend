import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../components/Logo.jsx'
import TextInput from '../components/TextInput.jsx'
import PasswordInput from '../components/PasswordInput.jsx'
import Button from '../components/Button.jsx'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Please enter your email or phone number.'
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      navigate('/role-selection')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Logo />
          <h1 className="app-name">Smriti</h1>
          <p className="app-tagline">Your cognitive companion is here to help you.</p>
        </div>

        <h2 className="auth-heading">Welcome Back</h2>

        <form onSubmit={handleSubmit} noValidate>
          <TextInput
            id="identifier"
            label="Email or Phone Number"
            value={formData.identifier}
            onChange={handleChange('identifier')}
            placeholder="Enter your email or phone number"
            error={errors.identifier}
            autoComplete="username"
            inputMode="email"
          />

          <PasswordInput
            id="password"
            label="Password"
            value={formData.password}
            onChange={handleChange('password')}
            placeholder="Enter your password"
            error={errors.password}
            autoComplete="current-password"
          />

          <div className="form-row-between">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <button type="button" className="link-text link-button">
              Forgot Password?
            </button>
          </div>

          <Button type="submit">Login</Button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{' '}
          <Link to="/signup" className="link-text link-text-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
