import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Expert quotes data with verified sources
const expertQuotes = [
  {
    id: 1,
    quote: "Today our attention has become the new economic resource being harvested. Protecting and managing it is essential to personal wellbeing.",
    author: "Catherine Price",
    title: "Science Journalist and Author of \"How to Break Up With Your Phone\"",
    source: "Price, C. (2018). How to Break Up With Your Phone: The 30-Day Plan to Take Back Your Life."
  },
  {
    id: 2,
    quote: "Constant digital interruptions force our brains to divide attention, making it difficult to engage in deep, sustained thought.",
    author: "Dr. Adam Gazzaley",
    title: "Neuroscientist and Author of \"The Distracted Mind\"",
    source: "Gazzaley, A., & Rosen, L. (2016). The Distracted Mind: Ancient Brains in a High-Tech World."
  },
  {
    id: 3,
    quote: "Companies are beginning to understand that interrupting customers with ads erodes goodwill. True value exchange brings more long-term success than ad bombardment.",
    author: "Tim Wu",
    title: "Professor at Columbia Law School and Author of \"The Attention Merchants\"",
    source: "Wu, T. (2016). The Attention Merchants: The Epic Scramble to Get Inside Our Heads."
  }
]

export default function ExpertQuotesSection() {
  const [activeQuote, setActiveQuote] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Improved autoplay with clear cleanup
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
      
      autoPlayTimerRef.current = setTimeout(() => {
        setActiveQuote(prev => (prev + 1) % expertQuotes.length);
      }, 8000);
    };
    
    if (isAutoPlaying) {
      startAutoPlay();
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [activeQuote, isAutoPlaying]);
  
  const handleQuoteChange = (index: number) => {
    setActiveQuote(index);
    // Reset timer when manually changing
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setTimeout(() => {
        setActiveQuote(prev => (prev + 1) % expertQuotes.length);
      }, 8000);
    }
  };
  
  const handlePrevQuote = () => {
    handleQuoteChange((activeQuote - 1 + expertQuotes.length) % expertQuotes.length);
  };
  
  const handleNextQuote = () => {
    handleQuoteChange((activeQuote + 1) % expertQuotes.length);
  };
  
  return (
    <section className="py-20 md:py-32 bg-light relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center gradient-text"
        >
          Expert Insights
        </motion.h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Simplified Quote Carousel with improved transitions */}
          <div className="relative bg-white rounded-xl shadow-xl p-8 md:p-12">
            {/* Background decoration */}
            <div className="absolute top-4 left-8 text-primary/10 text-9xl font-serif">"</div>
            
            {/* Quotes with AnimatePresence for smoother transitions */}
            <div className="relative z-10 min-h-[220px]">
              <AnimatePresence mode="wait">
                {expertQuotes.map((quote, index) => (
                  activeQuote === index && (
                    <motion.div
                      key={quote.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-4"
                    >
                      {/* Quote Content - Simplified */}
                      <blockquote className="text-lg md:text-xl mb-4 italic text-dark/90">
                        "{quote.quote}"
                      </blockquote>
                      
                      <div className="flex flex-col">
                        <cite className="not-italic font-bold text-primary">
                          {quote.author}
                        </cite>
                        <span className="text-dark/70 text-sm">
                          {quote.title}
                        </span>
                        <span className="text-dark/50 text-xs mt-2">
                          Source: {quote.source}
                        </span>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            
            {/* Navigation Arrows - Simplified */}
            <div className="flex justify-between mt-6">
              <button 
                onClick={handlePrevQuote}
                className="px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                aria-label="Previous quote"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                Previous
              </button>
              
              <button 
                onClick={handleNextQuote}
                className="px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                aria-label="Next quote"
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Quote Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {expertQuotes.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuoteChange(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeQuote === index ? 'bg-primary' : 'bg-primary/30'
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Autoplay toggle */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-primary/70 hover:text-primary flex items-center gap-2"
            >
              {isAutoPlaying ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                  Pause Autoplay
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Resume Autoplay
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
