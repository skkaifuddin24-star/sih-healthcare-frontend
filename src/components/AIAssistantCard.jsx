import { useState } from 'react'

const SUGGESTED_QUESTIONS = [
  'What do I need to do today?',
  'When is my next medicine?',
  'What games should I play?',
]

function AIAssistantCard() {
  const [message, setMessage] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    // UI only - no real AI is connected yet.
    setMessage('')
  }

  return (
    <section className="ai-card" aria-labelledby="ai-card-heading">
      <h2 id="ai-card-heading" className="ai-card-title">
        AI Memory Companion
      </h2>
      <p className="ai-card-description">
        Ask me about your day, reminders or things you want to remember.
      </p>

      <button type="button" className="ai-mic-btn" aria-label="Speak to your memory companion">
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
        <span>Tap to Speak</span>
      </button>

      <form className="ai-input-row" onSubmit={handleSend}>
        <label htmlFor="ai-message" className="sr-only">
          Type a message to your memory companion
        </label>
        <input
          id="ai-message"
          type="text"
          className="form-input ai-text-input"
          placeholder="Type your question here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ai-send-btn">
          Send
        </button>
      </form>

      <div className="ai-suggestions">
        {SUGGESTED_QUESTIONS.map((question) => (
          <button
            type="button"
            key={question}
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
