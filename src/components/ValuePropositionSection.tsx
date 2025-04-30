import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ValuePropositionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    
    const ctx = gsap.context(() => {
      // Animate benefits cards on scroll
      gsap.utils.toArray('.benefit-card').forEach((card: any, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        )
      })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-light relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-4">
            Benefits of National No-Ads Day
          </h2>
          <p className="text-lg text-dark/80 max-w-2xl mx-auto">
            One day of rest from advertisements can bring a year's worth of perspective
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Individual Benefits Card */}
          <div className="benefit-card rounded-xl bg-white shadow-lg p-8 border-t-4 border-primary">
            <div className="text-4xl mb-5 text-primary">🧠</div>
            <h3 className="text-xl font-heading font-bold mb-4">For Individuals</h3>
            <ul className="space-y-3 text-dark/80">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Digital detox and attention recovery</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Develop conscious media consumption habits</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Strengthen personal relationships away from screens</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Reconnect with nature and physical activities</span>
              </li>
            </ul>
          </div>
          
          {/* Business Benefits Card */}
          <div className="benefit-card rounded-xl bg-white shadow-lg p-8 border-t-4 border-secondary">
            <div className="text-4xl mb-5 text-secondary">💼</div>
            <h3 className="text-xl font-heading font-bold mb-4">For Businesses</h3>
            <ul className="space-y-3 text-dark/80">
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Innovative marketing opportunity</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Showcase value of premium services</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Enhance consumer trust and brand loyalty</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Demonstrate corporate social responsibility</span>
              </li>
            </ul>
          </div>
          
          {/* Social Benefits Card */}
          <div className="benefit-card rounded-xl bg-white shadow-lg p-8 border-t-4 border-accent">
            <div className="text-4xl mb-5 text-accent">🌍</div>
            <h3 className="text-xl font-heading font-bold mb-4">For Society</h3>
            <ul className="space-y-3 text-dark/80">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Raise awareness about digital well-being</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Promote sustainable digital consumption</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Redefine business-consumer relationships</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Support mental health initiatives</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md border-l-4 border-primary">
            <h3 className="font-heading font-bold text-xl mb-3">Premium Experience Value</h3>
            <p className="text-dark/80">
              72% of consumers value ad-free premium experiences more highly according to Nielsen Consumer Survey. National No-Ads Day helps both users and businesses understand the real value of attention.
            </p>
          </div>
          
          <motion.a
            href="#footer-join"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary px-8 py-4"
          >
            Get Involved
          </motion.a>
        </div>
      </div>
    </section>
  )
}
