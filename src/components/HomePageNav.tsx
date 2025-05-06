import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HomePageNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show after scrolling past the hero section
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5)
      
      // Determine active section based on scroll position
      const sections = [
        { id: 'hero', selector: '#hero' },
        { id: 'statistics', selector: '#statistics' },
        { id: 'why-no-ads', selector: '#why-no-ads' },
        { id: 'day-in-life', selector: '#day-in-life' },
        { id: 'participation', selector: '#participation' },
      ]
      
      for (const section of sections.reverse()) {
        const element = document.querySelector(section.selector)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`#${sectionId}`)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      })
    }
  }

  // Don't render if not visible
  if (!visible) return null

  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-md rounded-r-lg z-40 hidden lg:block"
    >
      <nav className="py-4 px-3">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => scrollToSection('hero')}
              className={`p-2 rounded-full transition-all ${activeSection === 'hero' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
              title="Top"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('statistics')}
              className={`p-2 rounded-full transition-all ${activeSection === 'statistics' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
              title="Statistics"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('why-no-ads')}
              className={`p-2 rounded-full transition-all ${activeSection === 'why-no-ads' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
              title="Why No Ads?"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('day-in-life')}
              className={`p-2 rounded-full transition-all ${activeSection === 'day-in-life' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
              title="Daily Impact"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('participation')}
              className={`p-2 rounded-full transition-all ${activeSection === 'participation' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
              title="Participate"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </motion.div>
  )
} 