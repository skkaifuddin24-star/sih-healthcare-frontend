import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import TextInput from '../components/TextInput.jsx'
import PasswordInput from '../components/PasswordInput.jsx'
import Button from '../components/Button.jsx'
import RoleCard from '../components/RoleCard.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

function Signup() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    identifier: '',
    password: '',
    confirmPassword: '',
    age: '',
    role: '',
  })
  const [errors, setErrors] = useState({})

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
      newErrors.fullName = t('fullName')
    }

    if (!formData.identifier.trim()) {
      newErrors.identifier = t('emailOrPhone')
    }

    if (!formData.password) {
      newErrors.password = t('password')
    } else if (formData.password.length < 6) {
      newErrors.password = t('password')
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('confirmPassword')
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = t('confirmPassword')
    }

    if (!formData.age) {
      newErrors.age = t('age')
    }

    if (!formData.role) {
      newErrors.role = t('signingUpAs')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      navigate('/role-selection', { replace: true })
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Logo />
          <h1 className="app-name">{t('appName')}</h1>
          <p className="app-tagline">{t('tagline')}</p>
        </div>

        <h2 className="auth-heading">{t('signup')}</h2>

        <form onSubmit={handleSubmit} noValidate>
          <TextInput
            id="fullName"
            label={t('fullName')}
            value={formData.fullName}
            onChange={handleChange('fullName')}
            placeholder={t('fullName')}
            error={errors.fullName}
            autoComplete="name"
          />

          <TextInput
            id="identifier"
            label={t('emailOrPhone')}
            value={formData.identifier}
            onChange={handleChange('identifier')}
            placeholder={t('emailOrPhone')}
            error={errors.identifier}
            autoComplete="username"
            inputMode="email"
          />

          <PasswordInput
            id="password"
            label={t('password')}
            value={formData.password}
            onChange={handleChange('password')}
            placeholder={t('password')}
            error={errors.password}
            autoComplete="new-password"
          />

          <PasswordInput
            id="confirmPassword"
            label={t('confirmPassword')}
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            placeholder={t('confirmPassword')}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <TextInput
            id="age"
            label={t('age')}
            type="number"
            value={formData.age}
            onChange={handleChange('age')}
            placeholder={t('age')}
            error={errors.age}
            inputMode="numeric"
          />

          <div className="form-field">
            <p className="form-label">{t('signingUpAs')}</p>
            <div className="role-card-group">
              <RoleCard
                label={t('patient')}
                description={t('patientDesc')}
                icon="🧑"
                selected={formData.role === 'patient'}
                onSelect={() => handleRoleSelect('patient')}
              />
              <RoleCard
                label={t('caregiver')}
                description={t('caregiverDesc')}
                icon="🤝"
                selected={formData.role === 'caregiver'}
                onSelect={() => handleRoleSelect('caregiver')}
              />
            </div>
            {errors.role && <p className="form-error">{errors.role}</p>}
          </div>

          <Button type="submit">{t('createAccount')}</Button>
        </form>

        <p className="auth-footer-text">
          {t('alreadyHaveAccount')}{' '}
          <Link to="/login" className="link-text link-text-bold">
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup


