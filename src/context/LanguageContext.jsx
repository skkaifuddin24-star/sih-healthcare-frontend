import { createContext, useContext, useState } from 'react'
import translations from '../translations/index.js'

const LanguageContext = createContext()

const LANGUAGE_KEY = 'smriti_app_language'

const normalizeLang = (lang) => {
  if (!lang) return 'en'
  const l = String(lang).toLowerCase()
  if (l === 'hi' || l === 'hindi' || l === 'हिंदी') return 'hi'
  if (l === 'bn' || l === 'bengali' || l === 'বাংলা') return 'bn'
  if (l === 'as' || l === 'assamese' || l === 'অসমীয়া') return 'as'
  return 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY)
      return normalizeLang(saved)
    } catch {
      return 'en'
    }
  })

  const setLanguage = (newLang) => {
    const code = normalizeLang(newLang)
    setLanguageState(code)
    try {
      localStorage.setItem(LANGUAGE_KEY, code)
    } catch (e) {
      console.warn('Unable to save language preference to localStorage:', e)
    }
  }

  const t = (key, fallbackStr) => {
    if (!key) return fallbackStr || ''
    const currentDict = translations[language] || translations.en
    if (currentDict && currentDict[key] !== undefined) {
      return currentDict[key]
    }
    // Fallback to English
    if (translations.en && translations.en[key] !== undefined) {
      return translations.en[key]
    }
    return fallbackStr || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const useTranslation = useLanguage
