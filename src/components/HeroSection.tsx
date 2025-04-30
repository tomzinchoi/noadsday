import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'
import { motion } from 'framer-motion'
import CountdownTimer from './CountdownTimer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin)
}

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const adIconsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Typing effect for headline
    if (headlineRef.current) {
      const tl = gsap.timeline()
      
      tl.to(headlineRef.current, {
        duration: 2,
        text: "National No-Ads Day",
        ease: "power2.out",
        delay: 0.5
      })
    }
    
    // Fading ad icons animation - fixed to work properly
    if (adIconsRef.current) {
      const adIcons = adIconsRef.current.children
      
      // First reset all icons to invisible
      gsap.set(adIcons, { opacity: 0, scale: 0.5, y: 0 })
      
      // Create a repeating icon animation sequence
      const createIconAnimation = () => {
        // Clear any previous animations
        gsap.killTweensOf(adIcons)
        
        // Animate icons appearing
        gsap.to(adIcons, {
          opacity: 0.7,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          onComplete: () => {
            // Wait a bit before starting disappear animation
            gsap.delayedCall(1.5, () => {
              // Animate icons disappearing
              gsap.to(adIcons, {
                opacity: 0,
                y: -30,
                scale: 0.2,
                duration: 1.5,
                stagger: 0.08,
                ease: "power3.in",
                onComplete: () => {
                  // Reset positions for next animation cycle
                  gsap.set(adIcons, { y: 0, scale: 0.5 })
                  
                  // Wait before repeating the animation
                  gsap.delayedCall(1, createIconAnimation)
                }
              })
            })
          }
        })
      }
      
      // Start the animation cycle
      createIconAnimation()
    }
    
    // Subtle parallax effect for background
    if (sectionRef.current) {
      const parallaxElements = sectionRef.current.querySelectorAll('.parallax-layer')
      
      gsap.to(parallaxElements, {
        y: (i) => -30 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })
    }
    
    // Clean up animations when component unmounts
    return () => {
      if (adIconsRef.current) {
        gsap.killTweensOf(adIconsRef.current.children)
      }
    }
  }, [])
  
  // Next event date (September 15th of next year)
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const eventYear = currentMonth >= 8 ? currentYear + 1 : currentYear
  const eventDate = new Date(eventYear, 8, 15) // Month is 0-indexed, so 8 = September
  
  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex items-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #1a73e8 0%, #34a853 100%)'
      }}
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax-layer" style={{ opacity: 0.05 }}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
              }}
            />
          ))}
        </div>
        <div className="parallax-layer" style={{ opacity: 0.1 }}>
          <svg 
            viewBox="0 0 1440 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 w-full"
          >
            <path 
              d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,181.3C672,181,768,235,864,234.7C960,235,1056,181,1152,176C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="white"
            />
          </svg>
        </div>
      </div>
      
      {/* Ad icons that will fade away */}
      <div ref={adIconsRef} className="absolute inset-0 pointer-events-none">
        {['📱', '🛒', '📺', '💻', '🎮', '📢', '💰', '🔔', '📝', '📰', '🎬', '📈'].map((icon, i) => (
          <div 
            key={i}
            className="absolute text-4xl md:text-6xl"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
          >
            {icon}
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center text-white pt+10">
        {/* Reduced padding-top from pt-20 to pt-10 to move content higher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6" /* Reduced margin bottom from mb-6 to mb-4 */
        >
          <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
            September 15, {eventYear}
          </span>
        </motion.div>
        
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-4" /* Reduced margin */
        >&nbsp;</h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="text-xl md:text-2xl max-w-2xl mx-auto mb-4 text-white/90" /* Reduced margin */
        >
          Experience a day without advertising distractions. Reclaim your attention, rediscover your focus.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="text-lg md:text-xl italic max-w-2xl mx-auto mb-6 text-white/80" /* Reduced margin */
        >
          "One day of rest, a year of attention."
        </motion.p>
        
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="mb-10"
        >
          <CountdownTimer targetDate={eventDate} />
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom+30 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className="flex flex-col items-center"
          >
            <span className="text-white/80 text-sm mb-2">Scroll to explore</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/80"
            >
              <path 
                d="M12 5V19M12 19L5 12M12 19L19 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
