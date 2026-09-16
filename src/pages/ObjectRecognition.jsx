import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameHeader from '../components/GameHeader.jsx'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import GameFeedback from '../components/GameFeedback.jsx'
import GameResult from '../components/GameResult.jsx'
import '../styles/dashboard.css'
import '../styles/games.css'

const OBJECT_ROUNDS = [
  {
    id: 1,
    symbol: '🍎',
    objectName: 'Apple',
    question: 'What is this object?',
    options: ['Apple', 'Chair', 'Cup', 'Book'],
    explanation: 'This is a red apple.',
  },
  {
    id: 2,
    symbol: '🪑',
    objectName: 'Chair',
    question: 'What is this object?',
    options: ['Table', 'Chair', 'Clock', 'Spoon'],
    explanation: 'This is a wooden chair used for sitting.',
  },
  {
    id: 3,
    symbol: '☕',
    objectName: 'Cup',
    question: 'What is this object?',
    options: ['Bottle', 'House', 'Cup', 'Flower'],
    explanation: 'This is a tea/coffee cup.',
  },
  {
    id: 4,
    symbol: '📖',
    objectName: 'Book',
    question: 'What is this object?',
    options: ['Umbrella', 'Book', 'Pencil', 'Clock'],
    explanation: 'This is an open book used for reading.',
  },
  {
    id: 5,
    symbol: '⏰',
    objectName: 'Clock',
    question: 'What is this object?',
    options: ['Clock', 'Phone', 'Spoon', 'House'],
    explanation: 'This is an alarm clock that displays the time.',
  },
]

function ObjectRecognition() {
  const navigate = useNavigate()
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const currentRound = OBJECT_ROUNDS[currentRoundIndex]
  const totalRounds = OBJECT_ROUNDS.length

  const handleSelectOption = (option) => {
    if (showFeedback) return
    setSelectedOption(option)
    setShowFeedback(true)

    if (option === currentRound.objectName) {
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
          title="Object Recognition"
          instruction="Look at the picture and identify the object."
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

            <div className="object-question-card">
              <div
                className="object-symbol-display"
                role="img"
                aria-label={`Object picture: ${currentRound.objectName}`}
              >
                {currentRound.symbol}
              </div>
              <h2 className="object-question-title">{currentRound.question}</h2>
            </div>

            <div className="answer-section">
              <div className="answer-grid answer-grid-text">
                {currentRound.options.map((option, idx) => {
                  const isSelected = selectedOption === option
                  const isCorrect = option === currentRound.objectName

                  let btnClass = 'answer-btn answer-btn-text-mode'
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
                      aria-label={option}
                    >
                      <span className="answer-text">{option}</span>
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
                isCorrect={selectedOption === currentRound.objectName}
                correctAnswerText={currentRound.objectName}
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

export default ObjectRecognition
