import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// SVG Brain Animation Component
function BrainAnimation() {
  const brainRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!brainRef.current) return
    
    const brain = brainRef.current
    const regions = brain.querySelectorAll('.brain-region')
    const connections = brain.querySelectorAll('.connection')
    
    // Initialize regions and connections
    gsap.set(regions, { opacity: 0.3, fill: '#cccccc' })
    gsap.set(connections, { opacity: 0, strokeDasharray: '5 5', strokeDashoffset: 10 })
    
    // Create animation context
    const ctx = gsap.context(() => {
      // Create brain activation animation
      ScrollTrigger.create({
        trigger: brain,
        start: "top 70%",
        onEnter: () => {
          // Animate brain regions
          gsap.to(regions, {
            opacity: 0.8,
            fill: '#1a73e8',
            duration: 1.5,
            stagger: 0.1,
            ease: "power2.out"
          })
          
          // Animate connections
          gsap.to(connections, {
            opacity: 0.7,
            strokeDashoffset: 0,
            duration: 2,
            stagger: 0.05,
            ease: "power1.inOut"
          })
          
          // Animate distraction effect
          const tlDistraction = gsap.timeline({ repeat: -1, repeatDelay: 1 })
          
          tlDistraction.to(regions, {
            opacity: gsap.utils.wrap([0.4, 0.8, 0.3, 0.9, 0.5]),
            fill: gsap.utils.wrap(['#1a73e8', '#34a853', '#fa7b17', '#4285f4', '#34a853']),
            duration: 0.8,
            stagger: 0.1,
            ease: "power1.inOut"
          })
          
          tlDistraction.to(regions, {
            opacity: 0.3,
            fill: '#cccccc',
            duration: 1.2,
            stagger: 0.1,
            ease: "power1.inOut"
          }, "+=1")
          
          // Create focused state after showing distraction
          tlDistraction.to(regions, {
            opacity: 0.8,
            fill: '#34a853',
            duration: 1,
            stagger: 0.05,
            ease: "power2.out"
          }, "+=0.5")
          
          tlDistraction.to(connections, {
            opacity: 0.9,
            stroke: '#34a853',
            duration: 1,
            stagger: 0.05,
            ease: "power2.out"
          }, "<")
          
          // Hold the focused state longer
          tlDistraction.to({}, { duration: 2 })
        },
        once: false
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  return (
    <svg
      ref={brainRef}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Brain outline */}
      <path
        d="M200,320 C120,320 60,260 60,180 C60,100 120,60 200,60 C280,60 340,100 340,180 C340,260 280,320 200,320 Z"
        stroke="#666"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Brain regions */}
      <circle cx="150" cy="140" r="30" className="brain-region" />
      <circle cx="250" cy="140" r="30" className="brain-region" />
      <circle cx="130" cy="200" r="25" className="brain-region" />
      <circle cx="270" cy="200" r="25" className="brain-region" />
      <circle cx="200" cy="170" r="35" className="brain-region" />
      <circle cx="180" cy="230" r="28" className="brain-region" />
      <circle cx="220" cy="230" r="28" className="brain-region" />
      
      {/* Neural connections */}
      <line x1="150" y1="140" x2="200" y2="170" className="connection" stroke="#1a73e8" strokeWidth="2" />
      <line x1="250" y1="140" x2="200" y2="170" className="connection" stroke="#1a73e8" strokeWidth="2" />
      <line x1="130" y1="200" x2="180" y2="230" className="connection" stroke="#1a73e8" strokeWidth="2" />
      <line x1="270" y1="200" x2="220" y2="230" className="connection" stroke="#1a73e8" strokeWidth="2" />
      <line x1="200" y1="170" x2="180" y2="230" className="connection" stroke="#1a73e8" strokeWidth="2" />
      <line x1="200" y1="170" x2="220" y2="230" className="connection" stroke="#1a73e8" strokeWidth="2" />
      <line x1="180" y1="230" x2="220" y2="230" className="connection" stroke="#1a73e8" strokeWidth="2" />
    </svg>
  )
}

export default function WhyNoAdsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null) // Changed to HTMLAnchorElement
  
  useEffect(() => {
    if (!buttonRef.current) return
    
    // Animate the Learn More button when scrolled into view
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "center bottom",
        onEnter: () => {
          gsap.fromTo(buttonRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
          )
        },
        once: true
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section 
      ref={sectionRef}
      id="why-no-ads"
      className="py-20 md:py-32 bg-gradient-to-b from-white to-light relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold gradient-text inline-block pb-2 border-b-2 border-primary/30"
          >
            Why No-Ads?
          </motion.h2>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 text-lg">
              <p className="text-xl font-medium leading-relaxed">
                In today's digital ecosystem, our attention has become the most valuable commodity. The average person's focus is interrupted by thousands of advertisements daily, leading to what experts call an <strong className="text-primary">attention crisis</strong>.
              </p>
              
              <p>
                This constant fragmentation of our attention doesn't just waste time—it fundamentally changes how our brains work, making deep focus and creative thinking increasingly difficult.
              </p>
              
              <div className="bg-white p-6 rounded-xl shadow-md my-6 border-l-4 border-secondary">
                <h3 className="text-xl font-bold mb-3 text-secondary">Ad-Free Premium Experience:</h3>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2 text-xl">✓</span>
                    <span>72% of consumers value ad-free premium experiences more highly <span className="text-dark/60 text-sm">(Nielsen Consumer Survey)</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2 text-xl">✓</span>
                    <span>The average consumer subscribes to more than 7 paid services <span className="text-dark/60 text-sm">(Deloitte Digital Media Trends)</span></span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <p className="text-dark/80 italic text-lg">
                  "Today, our attention has become a new economic resource. Protecting and managing it is essential for personal well-being."
                </p>
                <p className="text-right mt-3 font-semibold text-primary text-sm">
                  — Catherine Price, Author of "How to Break Up With Your Phone"
                </p>
              </div>
              
              <a 
                href="#footer-join"
                ref={buttonRef}
                className="btn btn-primary mt-8 opacity-0 inline-flex items-center group"
              >
                Join The Movement
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
                  className="inline-block ml-2 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </motion.div>
          
          {/* Right column: Brain visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full"></div>
            <BrainAnimation />
            
            <div className="absolute bottom-0.5 left-4 right-4 bg-white/20 backdrop-blur-sm text-dark/80 p-4 rounded-lg text-sm shadow-md">
              <div className="font-bold mb-1 text-primary">Brain Activity Visualization:</div>
              Watch how attention fragments during ad exposure (scattered activity) vs. focused state (unified activity).
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-20 h-20 bg-primary/5 rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/5 rounded-full -z-10"></div>
      <div className="absolute top-1/3 right-0 w-16 h-16 bg-accent/5 rounded-full -z-10"></div>
    </section>
  )
}
