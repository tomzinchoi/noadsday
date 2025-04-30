import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const adIcons = ['📱', '🛒', '📺', '💻', '🎮', '📢', '💰', '🔔', '📝', '📰', '🎬', '📈']

export default function CounterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const adIconsContainerRef = useRef<HTMLDivElement>(null)
  const [counterComplete, setCounterComplete] = useState(false)
  
  useEffect(() => {
    if (!counterRef.current || !adIconsContainerRef.current || !sectionRef.current) return
    
    const counter = counterRef.current
    const adIconsContainer = adIconsContainerRef.current
    
    // Create animation context
    const ctx = gsap.context(() => {
      // Create ScrollTrigger for the counter animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          // Animate counter from 0 to 4000
          gsap.to(counter, {
            innerHTML: "4,000",
            duration: 3,
            snap: { innerHTML: 1 },
            ease: "power2.out",
            onUpdate: function() {
              // Make the counter speed up as the number grows
              const progress = this.progress()
              const currentValue = parseInt(counter.innerHTML.replace(/,/g, ''))
              
              if (progress < 0.5) {
                // Slow start
                counter.innerHTML = Math.round(currentValue).toLocaleString()
              } else if (progress < 0.8) {
                // Medium speed
                counter.innerHTML = Math.round(currentValue).toLocaleString()
              } else {
                // Rapid finish
                counter.innerHTML = Math.round(currentValue).toLocaleString()
              }
            },
            onComplete: () => {
              setCounterComplete(true)
            }
          })
          
          // Animate ad icons appearing as counter increases
          for (let i = 0; i < 30; i++) {
            const icon = document.createElement('div')
            const randomIcon = adIcons[Math.floor(Math.random() * adIcons.length)]
            
            icon.innerHTML = randomIcon
            icon.className = 'absolute text-xl md:text-2xl opacity-0'
            icon.style.top = `${Math.random() * 100}%`
            icon.style.left = `${Math.random() * 100}%`
            adIconsContainer.appendChild(icon)
            
            gsap.to(icon, {
              opacity: 0.7,
              duration: 0.3,
              delay: (i / 30) * 3, // Spread across the counter duration
              ease: "power1.out",
              onComplete: () => {
                gsap.to(icon, {
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                  opacity: 0,
                  scale: 0.5,
                  duration: 1.5,
                  delay: Math.random() * 0.5,
                  ease: "power2.in"
                })
              }
            })
          }
        },
        once: true
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section 
      ref={sectionRef}
      id="about"
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold mb-8 gradient-text"
          >
            Daily Ad Exposure Counter
          </motion.h2>
          
          <div className="relative h-60 md:h-80 flex items-center justify-center mb-10">
            {/* Ad icons container */}
            <div 
              ref={adIconsContainerRef}
              className="absolute inset-0 pointer-events-none"
            ></div>
            
            {/* Counter */}
            <div className="text-center z-10">
              <div 
                ref={counterRef}
                className="text-6xl md:text-8xl font-heading font-bold text-primary mb-2"
              >
                0
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={counterComplete ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-dark/80 italic"
              >
                and counting...
              </motion.div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-lg text-dark/80 mb-6">
              The average person is bombarded with thousands of advertisements daily across various media. This constant exposure fragments our attention and affects our ability to focus deeply.
            </p>
            
            <div className="bg-light p-6 rounded-lg">
              <h3 className="text-xl font-heading font-semibold mb-3">Impact of Information Overload:</h3>
              <ul className="space-y-2 text-dark/80 list-disc list-inside text-left">
                <li>Constant information exposure leads to reduced focus, memory loss, and impaired decision-making <span className="text-dark/60 text-sm">(Harvard Business Review)</span></li>
                <li>Digital fatigue is linked to stress, anxiety, and sleep disorders <span className="text-dark/60 text-sm">(American Psychological Association study)</span></li>
                <li>Smartphone users spend an average of 3 hours daily on apps, with 25% of that time exposed to ads <span className="text-dark/60 text-sm">(App Annie data)</span></li>
              </ul>
            </div>
            
            <p className="text-sm text-dark/60 italic mt-6">
              Source: Estimates suggest individuals may be exposed to thousands of ads daily, with figures ranging widely from 4,000 to over 10,000, depending on lifestyle and media consumption (Source: Marketing industry estimates, Forbes, Digital Marketing Institute).
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
