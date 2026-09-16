import { useState, useEffect, useRef, useCallback } from 'react'

const OBJECTS = [
  { id: 'apple', symbol: '🍎', name: 'Apple' },
  { id: 'flower', symbol: '🌸', name: 'Flower' },
  { id: 'house', symbol: '🏠', name: 'House' },
  { id: 'sun', symbol: '☀️', name: 'Sun' },
  { id: 'bird', symbol: '🐦', name: 'Bird' },
  { id: 'leaf', symbol: '🍃', name: 'Leaf' },
]

export const TOTAL_PAIRS = OBJECTS.length

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function createDeck() {
  const doubled = [...OBJECTS, ...OBJECTS].map((item, index) => ({
    ...item,
    cardId: `${item.id}-${index}`,
    isFlipped: false,
    isMatched: false,
  }))
  return shuffle(doubled)
}

const MATCH_DELAY = 600
const MISMATCH_DELAY = 900

export function useMemoryGame() {
  const [cards, setCards] = useState(createDeck)
  const [flippedIds, setFlippedIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const timeoutRef = useRef(null)

  // Timer - ticks every second while the game is in progress.
  useEffect(() => {
    if (isComplete) return undefined
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [isComplete])

  // Clean up any pending flip/unflip timeout on unmount.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCardClick = useCallback(
    (cardId) => {
      if (isChecking || isComplete) return

      const clickedCard = cards.find((c) => c.cardId === cardId)
      if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return
      if (flippedIds.length >= 2) return

      const nextFlippedIds = [...flippedIds, cardId]
      setCards((prev) =>
        prev.map((c) => (c.cardId === cardId ? { ...c, isFlipped: true } : c))
      )
      setFlippedIds(nextFlippedIds)

      if (nextFlippedIds.length === 2) {
        const [firstId, secondId] = nextFlippedIds
        const firstCard = cards.find((c) => c.cardId === firstId)
        const isMatch = firstCard.id === clickedCard.id

        setIsChecking(true)
        setMoves((prev) => prev + 1)

        timeoutRef.current = setTimeout(() => {
          if (isMatch) {
            setCards((prev) =>
              prev.map((c) =>
                c.cardId === firstId || c.cardId === secondId ? { ...c, isMatched: true } : c
              )
            )
            setMatches((prev) => {
              const next = prev + 1
              if (next === TOTAL_PAIRS) {
                setIsComplete(true)
              }
              return next
            })
          } else {
            setCards((prev) =>
              prev.map((c) =>
                c.cardId === firstId || c.cardId === secondId ? { ...c, isFlipped: false } : c
              )
            )
          }
          setFlippedIds([])
          setIsChecking(false)
        }, isMatch ? MATCH_DELAY : MISMATCH_DELAY)
      }
    },
    [cards, flippedIds, isChecking, isComplete]
  )

  const resetGame = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCards(createDeck())
    setFlippedIds([])
    setMoves(0)
    setMatches(0)
    setSeconds(0)
    setIsChecking(false)
    setIsComplete(false)
  }, [])

  return {
    cards,
    moves,
    matches,
    seconds,
    totalPairs: TOTAL_PAIRS,
    isChecking,
    isComplete,
    handleCardClick,
    resetGame,
  }
}
