import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import { gsap } from 'gsap'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const confettiRef = useRef<HTMLDivElement>(null)
  const [currentYear, setCurrentYear] = useState('2023') // Default value
  
  // Set the current year on the client side only
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (email.trim() === '') return
    
    // Show success message
    setIsSubmitted(true)
    
    // Create confetti animation
    if (confettiRef.current && typeof window !== 'undefined') {
      createConfetti()
    }
    
    // Reset form after delay
    setTimeout(() => {
      setEmail('')
      setIsSubmitted(false)
    }, 5000)
  }
  
  const createConfetti = () => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const container = confettiRef.current
    if (!container) return
    
    // Clear previous confetti
    container.innerHTML = ''
    
    const colors = ['#1a73e8', '#34a853', '#fa7b17', '#4285f4', '#fbbc05']
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div')
      const size = Math.random() * 10 + 5
      
      confetti.style.position = 'absolute'
      confetti.style.width = `${size}px`
      confetti.style.height = `${size}px`
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.borderRadius = '50%'
      confetti.style.left = `${Math.random() * 100}%`
      confetti.style.top = '0'
      confetti.style.opacity = '1'
      
      container.appendChild(confetti)
      
      // Animate each piece
      gsap.to(confetti, {
        y: `${Math.random() * 200 + 100}px`,
        x: `${(Math.random() - 0.5) * 200}px`,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: Math.random() * 1.5 + 1.5,
        ease: 'power4.out',
        onComplete: () => {
          if (container.contains(confetti)) {
            container.removeChild(confetti)
          }
        }
      })
    }
  }
  
  return (
    <footer id="footer" className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">National No-Ads Day</h3>
            <p className="text-white/70 mb-6">
              Join us on September 15th and experience a day without advertising distractions. Reclaim your attention and mental space.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram'].map((platform) => (
                <a 
                  key={platform}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={`Share on ${platform}`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    {platform === 'twitter' && <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>}
                    {platform === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>}
                    {platform === 'instagram' && <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              {/* Main Navigation Links */}
              <div>
                <ul className="space-y-3 mb-6">
                  <li>
                    <Link 
                      href="/"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/sources"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Sources
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="#footer-join"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Take Action
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Page Sections Navigation */}
              <div>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/#statistics"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Statistics
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/#why-no-ads"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Why No Ads?
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/#day-in-life"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Daily Impact
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/#participation"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Participate
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div id="footer-join">
            <h3 className="text-xl font-heading font-bold mb-6">Be part of National No-Ads Day</h3>
            <p className="text-white/70 mb-4">
              Leave your email to receive updates, get involved.
            </p>
            
            <div className="relative">
              {/* Confetti container */}
              <div 
                ref={confettiRef} 
                className="absolute inset-0 pointer-events-none overflow-hidden z-10"
              ></div>
              
              <form onSubmit={handleSubmit} className="mb-4 relative z-0">
                <div className="flex">
                  <input 
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 text-white placeholder:text-white/50 rounded-l-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={isSubmitted}
                  />
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 transition-colors rounded-r-lg px-4"
                    disabled={isSubmitted}
                  >
                    Join
                  </button>
                </div>
              </form>
              
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-secondary/20 text-secondary p-4 rounded-lg mb-4 text-center"
                  >
                    <p className="font-bold mb-1">Thank you for joining!</p>
                    <p className="text-sm">We'll keep you updated about National No-Ads Day.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <p className="text-sm mt-4 text-white/50 italic">
              <strong>Data Sources Note:</strong> All statistics on this site are based on verified academic research, industry reports, and trusted data sources related to attention, advertising, and digital media usage. For full references, visit the Resources section.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            &copy; {currentYear} National No-Ads Day | Educational Project
          </p>
        </div>
      </div>
      
      {/* Back to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => typeof window !== 'undefined' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Back to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </motion.button>
    </footer>
  )
}
