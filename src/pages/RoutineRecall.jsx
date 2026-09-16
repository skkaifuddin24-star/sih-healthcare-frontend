import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameHeader from '../components/GameHeader.jsx'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import GameFeedback from '../components/GameFeedback.jsx'
import GameResult from '../components/GameResult.jsx'
import '../styles/dashboard.css'
import '../styles/games.css'

const ROUTINE_ROUNDS = [
  {
    id: 1,
    activities: [
      { id: 'act1', icon: '🍳', title: 'Breakfast' },
      { id: 'act2', icon: '💊', title: 'Take Medicine' },
      { id: 'act3', icon: '🛏️', title: 'Wake Up' },
      { id: 'act4', icon: '🚶', title: 'Take a Walk' },
    ],
    question: 'What should happen FIRST in the morning routine?',
    options: ['Wake Up', 'Breakfast', 'Take Medicine', 'Take a Walk'],
    correct: 'Wake Up',
    explanation: 'Waking up is the very first activity of your morning routine.',
  },
  {
    id: 2,
    activities: [
      { id: 'act1', icon: '🥣', title: 'Eat Dinner' },
      { id: 'act2', icon: '🪥', title: 'Brush Teeth' },
      { id: 'act3', icon: '💤', title: 'Go to Sleep' },
      { id: 'act4', icon: '🚿', title: 'Evening Bath' },
    ],
    question: 'What should happen LAST at the end of the day?',
    options: ['Go to Sleep', 'Eat Dinner', 'Brush Teeth', 'Evening Bath'],
    correct: 'Go to Sleep',
    explanation: 'Going to sleep is the final activity of the day.',
  },
  {
    id: 3,
    activities: [
      { id: 'act1', icon: '🪥', title: 'Brush Teeth' },
      { id: 'act2', icon: '🥣', title: 'Eat Breakfast' },
      { id: 'act3', icon: '🛏️', title: 'Wake Up' },
    ],
    question: 'Right after waking up in the morning, what comes next?',
    options: ['Brush Teeth', 'Go to Sleep', 'Evening Rest'],
    correct: 'Brush Teeth',
    explanation: 'Brushing teeth comes right after waking up in the morning.',
  },
  {
    id: 4,
    activities: [
      { id: 'act1', icon: '🚶', title: 'Go for a Walk' },
      { id: 'act2', icon: '👟', title: 'Put on Shoes' },
      { id: 'act3', icon: '🛋️', title: 'Rest on Sofa' },
    ],
    question: 'What should you do BEFORE going out for a walk?',
    options: ['Put on Shoes', 'Rest on Sofa', 'Go for a Walk'],
    correct: 'Put on Shoes',
    explanation: 'You put on your shoes before stepping outside to walk.',
  },
  {
    id: 5,
    activities: [
      { id: 'act1', icon: '🍽️', title: 'Eat Lunch' },
      { id: 'act2', icon: '💊', title: 'Take Medicine' },
      { id: 'act3', icon: '😴', title: 'Afternoon Nap' },
    ],
    question: 'What should happen FIRST before taking afternoon medicine?',
    options: ['Eat Lunch', 'Afternoon Nap', 'Take Medicine'],
    correct: 'Eat Lunch',
    explanation: 'Eating lunch comes first so you take medicine after your meal.',
  },
]

function RoutineRecall() {
  const navigate = useNavigate()
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const currentRound = ROUTINE_ROUNDS[currentRoundIndex]
  const totalRounds = ROUTINE_ROUNDS.length

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
          title="Routine Recall"
          instruction="Put the activities in the correct order."
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

            <div className="routine-activities-section">
              <span className="question-prompt-label">Daily Activities:</span>
              <div className="routine-cards-grid">
                {currentRound.activities.map((act) => (
                  <div key={act.id} className="routine-activity-card">
                    <span className="routine-activity-icon" aria-hidden="true">
                      {act.icon}
                    </span>
                    <span className="routine-activity-title">{act.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="routine-question-box">
              <h2 className="routine-question-title">{currentRound.question}</h2>
            </div>

            <div className="answer-section">
              <h3 className="answer-section-title">Select the correct activity:</h3>
              <div className="answer-grid answer-grid-text">
                {currentRound.options.map((option, idx) => {
                  const isSelected = selectedOption === option
                  const isCorrect = option === currentRound.correct

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

                  // Find matching icon if available in activities
                  const matchedAct = currentRound.activities.find(
                    (a) => a.title.toLowerCase() === option.toLowerCase()
                  )

                  return (
                    <button
                      key={idx}
                      type="button"
                      className={btnClass}
                      onClick={() => handleSelectOption(option)}
                      disabled={showFeedback}
                      aria-label={option}
                    >
                      {matchedAct && (
                        <span className="answer-btn-icon" aria-hidden="true">
                          {matchedAct.icon}
                        </span>
                      )}
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

export default RoutineRecall
