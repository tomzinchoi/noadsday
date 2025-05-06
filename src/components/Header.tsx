import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className={`text-2xl font-heading font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}>
              NoAdsDay
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation - Streamlined */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`font-medium ${
              isScrolled ? 'text-dark hover:text-primary' : 'text-white/90 hover:text-white'
            } transition-colors`}
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`font-medium ${
              isScrolled ? 'text-dark hover:text-primary' : 'text-white/90 hover:text-white'
            } transition-colors`}
            onClick={handleLinkClick}
          >
            About
          </Link>
          <Link
            href="/sources"
            className={`font-medium ${
              isScrolled ? 'text-dark hover:text-primary' : 'text-white/90 hover:text-white'
            } transition-colors`}
            onClick={handleLinkClick}
          >
            Sources
          </Link>
          <a
            href="#footer-join"
            className={`font-medium ${
              isScrolled ? 'text-primary hover:text-primary/80' : 'text-white hover:text-white/80'
            } transition-colors`}
            onClick={handleLinkClick}
          >
            Take Action
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col space-y-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            isScrolled ? 'bg-dark' : 'bg-white'
          } ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            isScrolled ? 'bg-dark' : 'bg-white'
          } ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            isScrolled ? 'bg-dark' : 'bg-white'
          } ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu - Streamlined */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="font-medium text-dark hover:text-primary transition-colors"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="font-medium text-dark hover:text-primary transition-colors"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
                <Link
                  href="/sources"
                  className="font-medium text-dark hover:text-primary transition-colors"
                  onClick={handleLinkClick}
                >
                  Sources
                </Link>
                <a 
                  href="#footer-join" 
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={handleLinkClick}
                >
                  Take Action
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
