import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { TextPlugin } from 'gsap/dist/TextPlugin'
import dynamic from 'next/dynamic'

// Import the server-safe components normally
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomePageNav from '@/components/HomePageNav'

// Dynamically import client-side components with { ssr: false }
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false })
const CounterSection = dynamic(() => import('@/components/CounterSection'), { ssr: false })
const ParticipationSection = dynamic(() => import('@/components/ParticipationSection'), { ssr: false })
const StatisticsSection = dynamic(() => import('@/components/StatisticsSection'), { ssr: false })
const ValuePropositionSection = dynamic(() => import('@/components/ValuePropositionSection'), { ssr: false })
const WhyNoAdsSection = dynamic(() => import('@/components/WhyNoAdsSection'), { ssr: false })
const ExpertQuotesSection = dynamic(() => import('@/components/ExpertQuotesSection'), { ssr: false })
const DayInLifeSection = dynamic(() => import('@/components/DayInLifeSection'), { ssr: false })

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Setup animations that require the DOM to be loaded
    if (typeof window === 'undefined') return

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
      <HomePageNav />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="counter">
        <CounterSection />
      </section>
      <section id="participation">
        <ParticipationSection />
      </section>
      <section id="value-proposition">
        <ValuePropositionSection />
      </section>
      <section id="statistics">
        <StatisticsSection />
      </section>
      <section id="why-no-ads">
        <WhyNoAdsSection />
      </section>
      <section id="expert-quotes">
        <ExpertQuotesSection />
      </section>
      <section id="day-in-life">
        <DayInLifeSection />
      </section>
      <Footer />
    </main>
  )
}
