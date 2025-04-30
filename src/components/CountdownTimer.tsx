import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
    
    // Set the initial timeLeft
    setTimeLeft(calculateTimeLeft())
    
    // Update timeLeft every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    
    // Clear the interval when component unmounts
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex justify-center items-center space-x-4 md:space-x-6 text-center">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
      ].map((item) => (
        <div key={item.label} className="flex flex-col">
          <div className="flex justify-center items-center w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-lg text-white font-bold text-2xl md:text-3xl mb-2">
            {String(item.value).padStart(2, '0')}
          </div>
          <span className="text-xs md:text-sm text-white/80">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
