import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Daily activities with ad exposure data - updated with research-based information
const dailyActivities = [
  {
    time: '06:00',
    activity: 'Wake Up',
    description: 'Check phone notifications',
    adsWith: 35,
    adsWithout: 0,
    icon: '🛌'
  },
  {
    time: '07:00',
    activity: 'Morning Routine',
    description: 'Social media while eating breakfast',
    adsWith: 85,
    adsWithout: 0,
    icon: '🍳'
  },
  {
    time: '08:30',
    activity: 'Commute',
    description: 'Podcasts, billboards, radio ads',
    adsWith: 120,
    adsWithout: 15,
    icon: '🚗'
  },
  {
    time: '09:30',
    activity: 'Work - Morning',
    description: 'Checking email, work websites, news',
    adsWith: 250,
    adsWithout: 30,
    icon: '💻'
  },
  {
    time: '12:00',
    activity: 'Lunch Break',
    description: 'Social media, news apps',
    adsWith: 175,
    adsWithout: 0,
    icon: '🥪'
  },
  {
    time: '14:00',
    activity: 'Work - Afternoon',
    description: 'Online meetings, research, email',
    adsWith: 230,
    adsWithout: 25,
    icon: '📊'
  },
  {
    time: '17:30',
    activity: 'Commute Home',
    description: 'Streaming music, billboards',
    adsWith: 100,
    adsWithout: 10,
    icon: '🚇'
  },
  {
    time: '18:30',
    activity: 'Evening Relaxation',
    description: 'Streaming services, mobile games',
    adsWith: 350,
    adsWithout: 0,
    icon: '📺'
  },
  {
    time: '21:00',
    activity: 'Social Media Time',
    description: 'Scrolling through feeds before bed',
    adsWith: 220,
    adsWithout: 0,
    icon: '📱'
  },
  {
    time: '22:30',
    activity: 'Bedtime',
    description: 'Last check of phone',
    adsWith: 40,
    adsWithout: 0,
    icon: '😴'
  }
]

export default function DayInLifeSection() {
  const [viewMode, setViewMode] = useState('with-ads') // 'with-ads' or 'no-ads'
  const [totalAds, setTotalAds] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Calculate and update total ads count
    const total = dailyActivities.reduce((sum, activity) => 
      sum + (viewMode === 'with-ads' ? activity.adsWith : activity.adsWithout), 0)
    
    // Animate count
    const countTo = { value: 0 }
    gsap.to(countTo, {
      value: total,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: function() {
        setTotalAds(Math.round(countTo.value))
      }
    })
  }, [viewMode])
  
  useEffect(() => {
    if (!timelineRef.current) return
    
    // Create ScrollTrigger animations for timeline items
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item')
    
    const ctx = gsap.context(() => {
      timelineItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.1
          }
        )
      })
    }, timelineRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section 
      id="day-in-life"
      className="py-20 md:py-32 bg-white relative overflow-hidden"
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
            A Day in the Life: Your Attention vs. Ads
          </h2>
          <p className="text-lg text-dark/80 max-w-2xl mx-auto">
            Follow a typical day to see how advertising impacts your attention and time.
          </p>
        </motion.div>
        
        {/* Toggle between with/without ads view */}
        <div className="flex justify-center mb-12">
          <div className="bg-light p-1 rounded-full shadow-md inline-flex">
            <button
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                viewMode === 'with-ads'
                  ? 'bg-primary text-white'
                  : 'text-dark/70 hover:text-dark'
              }`}
              onClick={() => setViewMode('with-ads')}
            >
              Current Reality
            </button>
            <button
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                viewMode === 'no-ads'
                  ? 'bg-secondary text-white'
                  : 'text-dark/70 hover:text-dark'
              }`}
              onClick={() => setViewMode('no-ads')}
            >
              No-Ads Day
            </button>
          </div>
        </div>
        
        {/* Total Ad Counter */}
        <div className="mb-12 text-center">
          <div className="text-lg text-dark/70 mb-2">
            Total Ad Exposures:
          </div>
          <div className={`text-4xl md:text-5xl font-bold transition-colors ${
            viewMode === 'with-ads' ? 'text-primary' : 'text-secondary'
          }`}>
            {totalAds.toLocaleString()}
          </div>
        </div>
        
        {/* Timeline Infographic */}
        <div ref={timelineRef} className="max-w-4xl mx-auto">
          {dailyActivities.map((activity, index) => (
            <div 
              key={activity.time} 
              className="timeline-item grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-4 md:gap-8 mb-8 opacity-0"
            >
              {/* Time Column */}
              <div className="text-right">
                <div className="text-lg md:text-xl font-semibold text-primary">
                  {activity.time}
                </div>
                <div className="text-4xl mt-2">
                  {activity.icon}
                </div>
              </div>
              
              {/* Activity Column */}
              <div>
                <div 
                  className={`relative p-6 rounded-lg shadow-md ${
                    viewMode === 'with-ads' 
                      ? 'bg-white border-l-4 border-primary' 
                      : 'bg-secondary/10 border-l-4 border-secondary'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">
                    {activity.activity}
                  </h3>
                  <p className="text-dark/70 mb-4">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark/50">
                      {viewMode === 'with-ads' ? 'Ad Exposure:' : 'Interruptions:'}
                    </span>
                    <span className={`font-bold ${
                      viewMode === 'with-ads' ? 'text-primary' : 'text-secondary'
                    }`}>
                      {viewMode === 'with-ads' 
                        ? `${activity.adsWith} ads` 
                        : `${activity.adsWithout} ${activity.adsWithout === 1 ? 'interruption' : 'interruptions'}`}
                    </span>
                  </div>
                  
                  {/* Ad Visualization - dots representing ads in this timeframe */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {viewMode === 'with-ads' && activity.adsWith > 0 && (
                      Array.from({ length: Math.min(50, activity.adsWith) }).map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i % 5 === 0 ? 'bg-primary' : 'bg-primary/40'
                          }`}
                          title={`${activity.adsWith} ads during this activity`}
                        ></div>
                      ))
                    )}
                    
                    {viewMode === 'no-ads' && activity.adsWithout > 0 && (
                      Array.from({ length: activity.adsWithout }).map((_, i) => (
                        <div 
                          key={i}
                          className="w-2 h-2 rounded-full bg-secondary"
                          title={`${activity.adsWithout} essential interruptions`}
                        ></div>
                      ))
                    )}
                    
                    {/* "And more" indicator if too many to display */}
                    {viewMode === 'with-ads' && activity.adsWith > 50 && (
                      <span className="text-xs text-primary/70 ml-1 self-center">
                        +{activity.adsWith - 50} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Connector line to next item */}
                {index < dailyActivities.length - 1 && (
                  <div className="w-0.5 h-10 bg-primary/20 ml-6"></div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Final comparison - updated with research-backed information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto bg-light p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-heading font-bold mb-4 text-center">
            The Impact on Your Day
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
              <h4 className="font-bold text-lg mb-2 text-primary">Current Reality</h4>
              <ul className="space-y-3 text-dark/80">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Your attention is fragmented across thousands of ads</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Each interruption requires 23 minutes to fully refocus</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>86% of social media users report feeling fatigued by excessive ads</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Productivity loss estimated at $650 billion annually</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary">
              <h4 className="font-bold text-lg mb-2 text-secondary">National No-Ads Day</h4>
              <ul className="space-y-3 text-dark/80">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  <span>Experience sustained focus and mental clarity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  <span>Rediscover creative thinking and deep work</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  <span>Reduce digital fatigue linked to stress and anxiety</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  <span>Realize how much time and attention you can reclaim</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-dark/60 italic mb-4">
              Source: Attention switch data based on research by Gloria Mark, UC Irvine professor (Mark, G. (2023). Attention Span: A Groundbreaking Way to Restore Balance, Happiness and Productivity.)
            </p>
            
            <a href="#footer-join" className="btn btn-primary">
              Join National No-Ads Day
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
