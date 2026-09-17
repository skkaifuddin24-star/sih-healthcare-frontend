import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

function AIAssistantCard() {
  const { t } = useLanguage()
  const [message, setMessage] = useState('')

  const suggestedQuestions = [
    t('suggestedQuestion1'),
    t('suggestedQuestion2'),
    t('suggestedQuestion3'),
  ]

  const handleSend = (e) => {
    e.preventDefault()
    // UI only - no real AI is connected yet.
    setMessage('')
  }

  return (
    <section className="ai-card" aria-labelledby="ai-card-heading">
      <h2 id="ai-card-heading" className="ai-card-title">
        {t('aiCompanionTitle')}
      </h2>
      <p className="ai-card-description">
        {t('aiCompanionDesc')}
      </p>

      <button type="button" className="ai-mic-btn" aria-label={t('tapToSpeak')}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="12" y="4" width="8" height="15" rx="4" fill="#FFFFFF" />
          <path
            d="M8 15v1c0 4.4 3.6 8 8 8s8-3.6 8-8v-1"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M16 24v4" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <span>{t('tapToSpeak')}</span>
      </button>

      <form className="ai-input-row" onSubmit={handleSend}>
        <label htmlFor="ai-message" className="sr-only">
          {t('aiCompanionTitle')}
        </label>
        <input
          id="ai-message"
          type="text"
          className="form-input ai-text-input"
          placeholder={t('typeQuestion')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ai-send-btn">
          {t('send')}
        </button>
      </form>

      <div className="ai-suggestions">
        {suggestedQuestions.map((question, idx) => (
          <button
            type="button"
            key={idx}
            className="ai-suggestion-chip"
            onClick={() => setMessage(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </section>
  )
}

export default AIAssistantCard

