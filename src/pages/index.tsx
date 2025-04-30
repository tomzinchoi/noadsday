import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { TextPlugin } from 'gsap/dist/TextPlugin'

import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import CounterSection from '@/components/CounterSection'
import StatisticsSection from '@/components/StatisticsSection'
import ValuePropositionSection from '@/components/ValuePropositionSection'
import WhyNoAdsSection from '@/components/WhyNoAdsSection'
import ExpertQuotesSection from '@/components/ExpertQuotesSection'
import DayInLifeSection from '@/components/DayInLifeSection'
import Footer from '@/components/Footer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Setup animations that require the DOM to be loaded
    const ctx = gsap.context(() => {
      // Initialize page animations here
      
      // Parallax scrolling effect
      gsap.utils.toArray('.parallax-layer').forEach((layer: any, i) => {
        const depth = i * 0.1
        ScrollTrigger.create({
          trigger: layer.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            gsap.to(layer, {
              y: (self.progress * -30) * depth,
              ease: 'none'
            })
          }
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={mainRef} className="min-h-screen">
      <Header />
      <HeroSection />
      <CounterSection />
      <ValuePropositionSection />
      <StatisticsSection />
      <WhyNoAdsSection />
      <ExpertQuotesSection />
      <DayInLifeSection />
      <Footer />
    </main>
  )
}
