import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Star {
  id: string
  x: number
  y: number
}

interface StarBackgroundProps {
  todoCount: number
}

const StarBackground: React.FC<StarBackgroundProps> = ({ todoCount }) => {
  const [stars, setStars] = useState<Star[]>([])

  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

  const createStar = (): Star => ({
    id: uuidv4(),
    x: getRandomNumber(0, window.innerWidth),
    y: getRandomNumber(0, window.innerHeight),
  })

  useEffect(() => {
    const addStar = () => setStars((prevStars) => [...prevStars, createStar()])

    const initialStars = Array.from({ length: todoCount }, createStar)
    setStars(initialStars)

    const intervalId = setInterval(() => {
      addStar()

      setTimeout(() => {
        setStars((prevStars) => {
          const randomIndex = Math.floor(Math.random() * prevStars.length)
          return prevStars.filter((_, index) => index !== randomIndex)
        })
      }, 1000)
    }, 2000)

    return () => clearInterval(intervalId)
  }, [todoCount])

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute h-0.5 w-0.5 animate-pulse rounded bg-red-400"
          style={{ top: star.y, left: star.x, transition: 'opacity 0.5s ease-in-out' }}
        />
      ))}
    </div>
  )
}

export default StarBackground
