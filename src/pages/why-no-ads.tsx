import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Head from 'next/head'

import Header from '@/components/Header'
import WhyNoAdsSection from '@/components/WhyNoAdsSection'
import ExpertQuotesSection from '@/components/ExpertQuotesSection'
import DayInLifeSection from '@/components/DayInLifeSection'
import Footer from '@/components/Footer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function WhyNoAdsPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set up page animations
    const ctx = gsap.context(() => {
      // Animation setup specific to this page
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Head>
        <title>Why No Ads? | National No-Ads Day</title>
        <meta name="description" content="Learn about the impact of advertising on attention and why we need a National No-Ads Day." />
      </Head>
      
      <div ref={pageRef} className="min-h-screen">
        <Header />
        
        {/* Hero Banner */}
        <section className="pt-32 pb-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Why No Ads?
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-white/90">
              The science behind our attention crisis and how a day without ads can help
            </p>
          </div>
        </section>
        
        {/* Main content sections */}
        <WhyNoAdsSection />
        <ExpertQuotesSection />
        <DayInLifeSection />
        
        {/* Call to Action */}
        <section className="py-20 bg-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Reclaim Your Attention?
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Join millions of people worldwide for National No-Ads Day on September 15th and experience a day of focus.
            </p>
            <button className="btn btn-primary text-lg px-8 py-4">
              Join the Movement
            </button>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  )
}
