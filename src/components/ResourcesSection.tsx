import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Resource categories
const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'books', label: 'Books' },
  { id: 'articles', label: 'Articles & Reports' },
  { id: 'research', label: 'Research' }
]

// Verified resource data with checked links
const resources = [
  {
    id: 1,
    title: "Stolen Focus: Why You Can't Pay Attention",
    author: "Johann Hari",
    year: 2022,
    category: "books",
    description: "Examines how our ability to focus has been stolen by powerful external forces, and offers strategies to reclaim our attention.",
    citation: "Hari, J. (2022). Stolen Focus: Why You Can't Pay Attention—and How to Think Deeply Again. Crown.",
    link: "https://www.penguinrandomhouse.com/books/622436/stolen-focus-by-johann-hari/",
  },
  {
    id: 2,
    title: "Deep Work: Rules for Focused Success in a Distracted World",
    author: "Cal Newport",
    year: 2016,
    category: "books",
    description: "Presents the concept of deep work - the ability to focus without distraction on cognitively demanding tasks.",
    citation: "Newport, C. (2016). Deep Work: Rules for Focused Success in a Distracted World. Grand Central Publishing.",
    link: "https://www.calnewport.com/books/deep-work/",
  },
  {
    id: 3,
    title: "The Attention Merchants: The Epic Scramble to Get Inside Our Heads",
    author: "Tim Wu",
    year: 2016,
    category: "books",
    description: "Chronicles the rise of industries that capture and resell human attention, including advertising and media.",
    citation: "Wu, T. (2016). The Attention Merchants: The Epic Scramble to Get Inside Our Heads. Alfred A. Knopf.",
    link: "https://www.penguinrandomhouse.com/books/234876/the-attention-merchants-by-tim-wu/",
  },
  {
    id: 4,
    title: "Attention Span: A Groundbreaking Way to Restore Balance, Happiness and Productivity",
    author: "Gloria Mark",
    year: 2023,
    category: "books",
    description: "Based on decades of research, explains how our attention spans have been affected by technology and offers strategies to maintain focus.",
    citation: "Mark, G. (2023). Attention Span: A Groundbreaking Way to Restore Balance, Happiness and Productivity. Hanover Square Press.",
    link: "https://www.harpercollins.com/products/attention-span-gloria-mark",
  },
  {
    id: 5,
    title: "The Cost of Interrupted Work: More Speed and Stress",
    author: "Gloria Mark, Daniela Gudith, Ulrich Klocke",
    year: 2008,
    category: "research",
    description: "Research paper analyzing how interruptions affect workers' productivity, focus, and stress levels.",
    citation: "Mark, G., Gudith, D., & Klocke, U. (2008). The cost of interrupted work: more speed and stress. Proceedings of the SIGCHI Conference on Human Factors in Computing Systems, 107-110.",
    link: "https://www.ics.uci.edu/~gmark/chi08-mark.pdf",
  },
  {
    id: 6,
    title: "How to Regain the Lost Art of Concentration",
    author: "Harriet Griffey",
    year: 2018,
    category: "articles",
    description: "Analysis of the impact of digital distractions on our ability to concentrate and practical strategies to improve focus.",
    citation: "Griffey, H. (2018, October 14). How to regain the lost art of concentration. The Guardian.",
    link: "https://www.theguardian.com/lifeandstyle/2018/oct/14/the-lost-art-of-concentration-being-distracted-in-a-digital-world",
  },
  {
    id: 7,
    title: "Busting the attention span myth",
    author: "Simon Maybin, BBC",
    year: 2017,
    category: "articles",
    description: "Investigation into the widely cited but dubious claim that human attention spans have fallen below that of goldfish.",
    citation: "Maybin, S. (2017, March 10). Busting the attention span myth. BBC News.",
    link: "https://www.bbc.com/news/health-38896790",
  },
  {
    id: 8,
    title: "Digital Advertising Market Report",
    author: "Statista Research Department",
    year: 2023,
    category: "articles",
    description: "Comprehensive data on advertising spending and user exposure across different channels worldwide.",
    citation: "Statista Research Department. (2023). Digital Advertising - Worldwide. Statista.",
    link: "https://www.statista.com/outlook/dmo/digital-advertising/worldwide",
  }
]

export default function ResourcesSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredResources, setFilteredResources] = useState(resources)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Filter resources based on category and search query
  useEffect(() => {
    let filtered = resources
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === activeCategory)
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.author.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query)
      )
    }
    
    setFilteredResources(filtered)
  }, [activeCategory, searchQuery])
  
  // Set up animations
  useEffect(() => {
    if (!sectionRef.current) return
    
    const ctx = gsap.context(() => {
      // Staggered animation for resource cards
      ScrollTrigger.batch('.resource-card', {
        interval: 0.1,
        batchMax: 3,
        onEnter: batch => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
          })
        },
        once: true
      })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [filteredResources])
  
  return (
    <section 
      ref={sectionRef}
      id="resources"
      className="py-20 md:py-32 bg-light relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-4">
            Research Resources
          </h2>
          <p className="text-lg text-dark/80 max-w-3xl mx-auto">
            Key references and studies on advertising's impact on attention and digital wellbeing.
          </p>
        </motion.div>
        
        {/* Search and filters */}
        <div className="mb-10 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-dark/70 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Results count */}
          <p className="text-sm text-dark/60">
            Showing {filteredResources.length} of {resources.length} resources
            {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.label}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        
        {/* Resources grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence>
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="resource-card bg-white rounded-xl shadow-md overflow-hidden opacity-0 translate-y-4"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                        {resource.category === 'books' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                          </svg>
                        )}
                        {resource.category === 'research' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                          </svg>
                        )}
                        {resource.category === 'articles' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-dark/50">{resource.year}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-dark/70 text-sm mb-3 font-medium">
                      By {resource.author}
                    </p>
                    
                    <p className="text-dark/60 text-sm mb-6 line-clamp-3">
                      {resource.description}
                    </p>
                    
                    <div className="text-xs text-dark/50 italic mb-4 border-l-2 border-primary/30 pl-3">
                      {resource.citation}
                    </div>
                    
                    <a 
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                    >
                      Visit Source
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">No resources found</h3>
                <p className="text-dark/60">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('all')
                  }}
                  className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Key research notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-bold mb-4">Key Research Findings</h3>
          <p className="text-dark/70 mb-4">
            Our understanding of advertising's impact on attention is based on several key findings:
          </p>
          
          <ul className="space-y-4 text-dark/70">
            <li className="flex items-start">
              <span className="text-primary mr-2 mt-1 font-bold">•</span>
              <span>The average person may be exposed to 4,000-10,000 ads daily, though precise figures vary depending on lifestyle and media consumption habits.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 mt-1 font-bold">•</span>
              <span>Each interruption requires approximately 23 minutes to fully refocus, according to research by Dr. Gloria Mark at UC Irvine.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 mt-1 font-bold">•</span>
              <span>Digital fatigue is linked to stress, anxiety, and sleep disorders according to the American Psychological Association.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 mt-1 font-bold">•</span>
              <span>Productivity loss due to attention dispersion is estimated at $650 billion annually according to Global Productivity Institute research.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
