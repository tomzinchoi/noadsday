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
    adsWith: 85,
    adsWithout: 0,
    icon: '🛌'
  },
  {
    time: '07:00',
    activity: 'Morning Routine',
    description: 'Social media while eating breakfast',
    adsWith: 120,
    adsWithout: 0,
    icon: '🍳'
  },
  {
    time: '08:30',
    activity: 'Commute',
    description: 'Podcasts, billboards, radio ads',
    adsWith: 250,
    adsWithout: 100,
    icon: '🚗'
  },
  {
    time: '09:30',
    activity: 'Work AM',
    description: 'Checking email, work websites, news',
    adsWith: 175,
    adsWithout: 30,
    icon: '💻'
  },
  {
    time: '12:00',
    activity: 'Lunch Break',
    description: 'Social media, news apps',
    adsWith: 230,
    adsWithout: 0,
    icon: '🥪'
  },
  {
    time: '14:00',
    activity: 'Work PM',
    description: 'Online meetings, research, email',
    adsWith: 100,
    adsWithout: 20,
    icon: '📊'
  },
  {
    time: '17:30',
    activity: 'Commute Home',
    description: 'Streaming music, billboards',
    adsWith: 250,
    adsWithout: 100,
    icon: '🚇'
  },
  {
    time: '18:30',
    activity: 'Relax Mode',
    description: 'Streaming services, mobile games',
    adsWith: 100,
    adsWithout: 0,
    icon: '📺'
  },
  {
    time: '21:00',
    activity: 'Scroll Time',
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
  const chartRef = useRef<HTMLDivElement>(null)
  
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
    if (!chartRef.current) return
    
    // Get max ad count for scaling
    const maxAds = Math.max(...dailyActivities.map(item => 
      viewMode === 'with-ads' ? item.adsWith : item.adsWithout
    ))
    
    // Create ScrollTrigger animations for chart bars
    const barContainers = chartRef.current.querySelectorAll('.bar-container')
    
    const ctx = gsap.context(() => {
      // Clear any existing animations
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.id === 'adBarsAnimation') {
          t.kill()
        }
      })
      
      // Animate bars from bottom to top
      barContainers.forEach((container, index) => {
        const bar = container.querySelector('.bar')
        const dots = container.querySelectorAll('.ad-dot')
        
        if (!bar) return
        
        // Reset bar height
        gsap.set(bar, { 
          height: 0,
          opacity: 0
        })
        
        // Reset dots
        gsap.set(dots, {
          opacity: 0,
          y: 20
        })
        
        // Animate bar growing from bottom
        gsap.to(bar, {
          height: '100%',
          opacity: 1,
          duration: 1,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            id: 'adBarsAnimation',
            trigger: container,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        })
        
        // Animate dots appearing
        gsap.to(dots, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.02,
          delay: index * 0.1 + 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            id: 'adDotsAnimation',
            trigger: container,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    }, chartRef)
    
    return () => ctx.revert()
  }, [viewMode])
  
  // Calculate the max height for normalization
  const maxAdCount = Math.max(...dailyActivities.map(item => item.adsWith))
  
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
            {totalAds.toLocaleString()}<span className='text-sm text-dark/60 font-thin'>approx.</span>
          </div>
        </div>
        
       
        
        {/* Horizontal Chart */}
        <div 
          ref={chartRef} 
          className="max-w-5xl mx-auto mb-16 overflow-x-hidden"
        >
          <div className="flex flex-col min-w-[768px]">
            
            
            {/* Chart body with grid */}
            <div className="relative border-l border-b border-dark/10 h-[400px]">
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <div 
                  key={ratio} 
                  className="absolute left-0 right-0 border-t border-dark/10"
                  style={{ bottom: `${ratio * 100}%` }}
                >
                  {ratio > 0 && 
                    <span className="absolute -left-14 -translate-y-1/2 text-xs text-dark/50">
                      {Math.round(ratio * maxAdCount)}
                    </span>
                  }
                </div>
              ))}
              
              {/* Bars chart */}
              <div className="flex h-full items-end">
                {dailyActivities.map((activity, index) => {
                  const adCount = viewMode === 'with-ads' ? activity.adsWith : activity.adsWithout
                  const barHeightPercent = (adCount / maxAdCount) * 100
                  
                  return (
                    <div 
                      key={activity.time} 
                      className="bar-container flex-1 flex flex-col items-center px-1 relative h-full group"
                    >
                      {/* Bar */}
                      <div 
                        className={`bar w-full relative ${
                          viewMode === 'with-ads' ? 'bg-primary/20' : 'bg-secondary/20'
                        } rounded-t-md`}
                        style={{ height: `${barHeightPercent}%` }}
                      >
                        {/* Ad count number */}
                        <div className={`absolute -top-7 left-1/2 -translate-x-1/2 font-bold text-sm ${
                          viewMode === 'with-ads' ? 'text-primary' : 'text-secondary'
                        }`}>
                          {adCount}
                        </div>
                        
                        {/* Ad dots visualization */}
                        <div className="absolute inset-0 p-2 overflow-hidden">
                          {viewMode === 'with-ads' && adCount > 0 && (
                            Array.from({ length: Math.min(50, adCount) }).map((_, i) => (
                              <div 
                                key={i}
                                className={`ad-dot w-1.5 h-1.5 rounded-full absolute ${
                                  i % 5 === 0 ? 'bg-primary' : 'bg-primary/40'
                                }`}
                                style={{
                                  left: `${Math.random() * 90 + 5}%`,
                                  top: `${Math.random() * 90 + 5}%`
                                }}
                              ></div>
                            ))
                          )}
                          
                          {viewMode === 'no-ads' && adCount > 0 && (
                            Array.from({ length: adCount }).map((_, i) => (
                              <div 
                                key={i}
                                className="ad-dot w-1.5 h-1.5 rounded-full absolute bg-secondary"
                                style={{
                                  left: `${Math.random() * 90 + 5}%`,
                                  top: `${Math.random() * 90 + 5}%`
                                }}
                              ></div>
                            ))
                          )}
                        </div>
                      </div>
                      
                      {/* X-axis labels (time) */}
                      <div className="absolute -bottom-20 left-0 right-0 text-center">
                        <div className="text-2xl mb-1">{activity.icon}</div>
                        <div className="text-primary font-semibold text-sm">{activity.time}</div>
                        <div className="text-xs font-medium text-dark/70 whitespace-nowrap mt-1">{activity.activity}</div>
                      </div>
                      
                      {/* Hover tooltip */}
                      <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        <div className={`p-3 rounded-lg shadow-lg max-w-[220px] text-sm ${
                          viewMode === 'with-ads' ? 'bg-primary text-white' : 'bg-secondary text-white'
                        }`}>
                          <div className="font-bold">{activity.activity} ({activity.time})</div>
                          <div className="mt-1">{activity.description}</div>
                          <div className="mt-2 font-bold border-t border-white/20 pt-1">
                            {viewMode === 'with-ads' 
                              ? `${activity.adsWith} ads` 
                              : `${activity.adsWithout} ${activity.adsWithout === 1 ? 'interruption' : 'interruptions'}`}
                          </div>
                          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-8 border-transparent" style={{
                            borderTopColor: viewMode === 'with-ads' ? '#1a73e8' : '#34a853'
                          }}></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* X-axis spacing for labels */}
            <div className="h-20"></div>
          </div>
        </div>
         {/* Ad Exposure Notes */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-dark/60 max-w-3xl mx-auto p-4 border-t border-gray-200">
          <ul>
            <li>Avg. Daily Ads: 4,000–10,000 (includes digital & traditional media)</li>
            <li>Activity-Based Estimate: Approx. 1,500 ads shown for illustration purposes only</li>
            <li>No-Ads Day Reduction: Based on ad blockers & media fasting (estimated 80–95% drop)</li>
            <li>Sources: Siteefy, B9 Solution, USC, ad blocker reports</li>
          </ul>
          </p>
        </motion.div>
        
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
                  <span>74% of social media users report feeling fatigued by excessive ads</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Productivity loss estimated at $468 billion annually</span>
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
