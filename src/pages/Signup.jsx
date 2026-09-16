import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import TextInput from '../components/TextInput.jsx'
import PasswordInput from '../components/PasswordInput.jsx'
import Button from '../components/Button.jsx'
import RoleCard from '../components/RoleCard.jsx'

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    identifier: '',
    password: '',
    confirmPassword: '',
    age: '',
    role: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }))
    setErrors((prev) => ({ ...prev, role: '' }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    }

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Please enter your email or phone number.'
    }

    if (!formData.password) {
      newErrors.password = 'Please create a password.'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    if (!formData.age) {
      newErrors.age = 'Please enter your age.'
    } else if (Number(formData.age) < 1 || Number(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age.'
    }

    if (!formData.role) {
      newErrors.role = 'Please select whether you are a patient or caregiver.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="success-state">
            <div className="success-icon" aria-hidden="true">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="28" fill="#16A34A" />
                <path
                  d="M17 29l7 7 15-15"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="auth-heading success-heading">Account Created</h2>
            <p className="success-message">
              Welcome, {formData.fullName || 'there'}. Your account has been created successfully.
            </p>
            <Link to="/login" className="btn btn-primary btn-full success-login-btn">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Logo />
          <h1 className="app-name">Smriti</h1>
          <p className="app-tagline">Create an account to get started.</p>
        </div>

        <h2 className="auth-heading">Sign Up</h2>

        <form onSubmit={handleSubmit} noValidate>
          <TextInput
            id="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange('fullName')}
            placeholder="Enter your full name"
            error={errors.fullName}
            autoComplete="name"
          />

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
            placeholder="Create a password"
            error={errors.password}
            autoComplete="new-password"
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            placeholder="Re-enter your password"
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <TextInput
            id="age"
            label="Age"
            type="number"
            value={formData.age}
            onChange={handleChange('age')}
            placeholder="Enter your age"
            error={errors.age}
            inputMode="numeric"
          />

          <div className="form-field">
            <p className="form-label">I am signing up as</p>
            <div className="role-card-group">
              <RoleCard
                label="Patient"
                description="I want cognitive support for myself."
                icon="🧑"
                selected={formData.role === 'patient'}
                onSelect={() => handleRoleSelect('patient')}
              />
              <RoleCard
                label="Caregiver"
                description="I support and care for a patient."
                icon="🤝"
                selected={formData.role === 'caregiver'}
                onSelect={() => handleRoleSelect('caregiver')}
              />
            </div>
            {errors.role && <p className="form-error">{errors.role}</p>}
          </div>

          <Button type="submit">Create Account</Button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{' '}
          <Link to="/login" className="link-text link-text-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
