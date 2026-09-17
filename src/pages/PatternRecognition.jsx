import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameHeader from '../components/GameHeader.jsx'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import GameFeedback from '../components/GameFeedback.jsx'
import GameResult from '../components/GameResult.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import '../styles/dashboard.css'
import '../styles/games.css'

const PATTERN_ROUNDS = [
  {
    id: 1,
    sequence: ['🍎', '🍌', '🍎', '🍌'],
    options: ['🍎', '🍊', '🍇', '🥕'],
    correct: '🍎',
    explanation: 'The pattern alternates between Apple and Banana.',
  },
  {
    id: 2,
    sequence: ['🔴', '🔵', '🟢', '🔴', '🔵'],
    options: ['🟢', '🟡', '🔴', '🟣'],
    correct: '🟢',
    explanation: 'The colors repeat Red, Blue, Green in order.',
  },
  {
    id: 3,
    sequence: ['⭐️', '⭐️', '🌙', '⭐️', '⭐️'],
    options: ['🌙', '⭐️', '☀️', '☁️'],
    correct: '🌙',
    explanation: 'The pattern repeats two Stars followed by one Moon.',
  },
  {
    id: 4,
    sequence: ['🐱', '🐶', '🐱', '🐶'],
    options: ['🐱', '🐶', '🐰', '🦊'],
    correct: '🐱',
    explanation: 'The pattern alternates between Cat and Dog.',
  },
  {
    id: 5,
    sequence: ['☀️', '🌧️', '☀️', '🌧️'],
    options: ['☀️', '🌈', '🌧️', '⚡'],
    correct: '☀️',
    explanation: 'The weather icons alternate between Sun and Rain.',
  },
]

function PatternRecognition() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const currentRound = PATTERN_ROUNDS[currentRoundIndex]
  const totalRounds = PATTERN_ROUNDS.length

  const handleSelectOption = (option) => {
    if (showFeedback) return
    setSelectedOption(option)
    setShowFeedback(true)

    if (option === currentRound.correct) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNextRound = () => {
    if (currentRoundIndex + 1 < totalRounds) {
      setCurrentRoundIndex((prev) => prev + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    } else {
      setIsComplete(true)
    }
  }

  const handlePlayAgain = () => {
    setCurrentRoundIndex(0)
    setScore(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setIsComplete(false)
  }

  return (
    <div className="dash-page">
      <div className="dash-container quiz-game-container">
        <GameHeader
          title={t('patternRecognition')}
          instruction={t('patternInstruction')}
          onBack={() => navigate('/games')}
        />

        {isComplete ? (
          <GameResult
            score={score}
            totalQuestions={totalRounds}
            onPlayAgain={handlePlayAgain}
            onBack={() => navigate('/games')}
          />
        ) : (
          <div className="game-card-body">
            <ProgressIndicator
              currentRound={currentRoundIndex + 1}
              totalRounds={totalRounds}
            />

            <div className="pattern-question-card">
              <span className="question-prompt-label">Sequence:</span>
              <div className="pattern-sequence-display">
                {currentRound.sequence.map((item, idx) => (
                  <div key={idx} className="pattern-item-wrapper">
                    <div className="pattern-item-box">{item}</div>
                    <span className="pattern-arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                ))}
                <div className="pattern-item-box pattern-question-box">?</div>
              </div>
            </div>

            <div className="answer-section">
              <h3 className="answer-section-title">{t('patternInstruction')}</h3>
              <div className="answer-grid">
                {currentRound.options.map((option, idx) => {
                  const isSelected = selectedOption === option
                  const isCorrect = option === currentRound.correct

                  let btnClass = 'answer-btn'
                  if (showFeedback) {
                    if (isCorrect) {
                      btnClass += ' answer-btn-correct'
                    } else if (isSelected) {
                      btnClass += ' answer-btn-incorrect'
                    } else {
                      btnClass += ' answer-btn-disabled'
                    }
                  } else if (isSelected) {
                    btnClass += ' answer-btn-selected'
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      className={btnClass}
                      onClick={() => handleSelectOption(option)}
                      disabled={showFeedback}
                      aria-label={`Option ${option}`}
                    >
                      <span className="answer-emoji">{option}</span>
                      {showFeedback && isCorrect && (
                        <span className="answer-badge badge-correct-icon">
                          ✓
                        </span>
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <span className="answer-badge badge-incorrect-icon">
                          ✕
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {showFeedback && (
              <GameFeedback
                isCorrect={selectedOption === currentRound.correct}
                correctAnswerText={currentRound.correct}
                explanation={currentRound.explanation}
                onNext={handleNextRound}
                isLastQuestion={currentRoundIndex + 1 === totalRounds}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PatternRecognition

