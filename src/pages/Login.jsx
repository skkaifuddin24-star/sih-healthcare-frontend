import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../components/Logo.jsx'
import TextInput from '../components/TextInput.jsx'
import PasswordInput from '../components/PasswordInput.jsx'
import Button from '../components/Button.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

function Login() {
  const navigate = useNavigate()
  const { t } = useLanguage()

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
      newErrors.identifier = t('emailOrPhone')
    }

    if (!formData.password) {
      newErrors.password = t('password')
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
          <h1 className="app-name">{t('appName')}</h1>
          <p className="app-tagline">{t('tagline')}</p>
        </div>

        <h2 className="auth-heading">{t('welcomeBack')}</h2>

        <form onSubmit={handleSubmit} noValidate>
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
              <span>{t('rememberMe')}</span>
            </label>

            <button type="button" className="link-text link-button">
              {t('forgotPassword')}
            </button>
          </div>

          <Button type="submit">{t('login')}</Button>
        </form>

        <p className="auth-footer-text">
          {t('dontHaveAccount')}{' '}
          <Link to="/signup" className="link-text link-text-bold">
            {t('signup')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

